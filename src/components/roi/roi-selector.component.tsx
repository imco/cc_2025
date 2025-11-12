"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import carrersData from "@/components/carrers/carrers-data/carrers.data.json";

type Career = { CARRERA: string; INGRESO?: number; [k: string]: unknown };

const EDUCATION_LEVELS = ["Licenciatura", "Carrera_técnica"] as const;
type EducationLevel = (typeof EDUCATION_LEVELS)[number];

const PLAN_UNITS = ["Semestres", "Cuatrimestres", "Trimestres", "Años"] as const;
type PlanUnit = (typeof PLAN_UNITS)[number];

const PERIODS_PER_YEAR: Record<PlanUnit, number> = {
  Semestres: 2,
  Cuatrimestres: 3,
  Trimestres: 4,
  Años: 1,
};

const PREPA_MENSUAL = 12052;
const EDAD_INICIO = 18;
const EDAD_RETIRO = 65;

const isTSU = (c: Career) =>
  /^TSU[\s.\-]/.test(String(c.CARRERA ?? "").trim().toUpperCase());

/** Solo enteros positivos (sin puntos ni comas). Devuelve null si no es válido. */
function parsePositiveIntStrict(v: string): number | null {
  if (!v) return null;
  if (!/^\s*\d+\s*$/.test(v)) return null; // solo dígitos
  const n = Number(v.trim());
  if (!Number.isSafeInteger(n) || n <= 0) return null;
  return n;
}

/** Monto con punto decimal opcional. Rechaza comas. Devuelve null si no es válido. */
function parseMoneyNoComma(v: string): number | null {
  if (!v) return null;
  if (/,/.test(v)) return null; // NO comas
  if (!/^\s*\$?\s*\d+(\.\d+)?\s*$/.test(v)) return null; // dígitos y punto decimal opcional
  const num = Number(v.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(num) || num <= 0) return null;
  return num;
}

const fmtMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;

export default function RoiSelector() {
  const careers = useMemo(
    () =>
      (carrersData as Career[])
        .slice()
        .sort((a, b) => a.CARRERA.localeCompare(b.CARRERA)),
    []
  );

  // selects
  const [level, setLevel] = useState<EducationLevel>("Licenciatura");
  const [career, setCareer] = useState<string>("");
  const [planUnit, setPlanUnit] = useState<PlanUnit>("Cuatrimestres");

  // inputs
  const periodsRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);

  // errores
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [liveErrPeriods, setLiveErrPeriods] = useState(false);
  const [liveErrCost, setLiveErrCost] = useState(false);

  // resultados
  const [result, setResult] = useState<{
    totalCost: number | null;
    mesesRec: number | null;
    rsi: number | null;
  }>({ totalCost: null, mesesRec: null, rsi: null });

  // resalte
  const [highlightResults, setHighlightResults] = useState(false);

  const filteredCareers = useMemo(
    () => careers.filter((c) => (level === "Carrera_técnica" ? isTSU(c) : !isTSU(c))),
    [careers, level]
  );

  useEffect(() => {
    if (career && !filteredCareers.some((c) => c.CARRERA === career)) setCareer("");
    setHighlightResults(false);
  }, [filteredCareers, career, level, planUnit]);

  const readInputs = () => {
    const periodsText = periodsRef.current?.value ?? "";
    const costText = costRef.current?.value ?? "";
    const p = parsePositiveIntStrict(periodsText);
    const cpp = parseMoneyNoComma(costText);
    return { p: p ?? NaN, cpp: cpp ?? NaN };
  };

  const handleCalculate = () => {
    const { p, cpp } = readInputs();

    const newErrors: Record<string, boolean> = {
      level: !level,
      career: !career,
      planUnit: !planUnit,
      periods: !Number.isFinite(p) || p <= 0 || !Number.isInteger(p),
      costPerPeriod: !Number.isFinite(cpp) || cpp <= 0,
    };

    const hasError = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);

    if (hasError) {
      setHighlightResults(false);
      setResult({ totalCost: null, mesesRec: null, rsi: null });
      return;
    }

    const totalCost = Math.round(p * cpp);
    const years = p / PERIODS_PER_YEAR[planUnit];

    const ingresoMensualCarrera =
      (filteredCareers.find((c) => c.CARRERA === career)?.INGRESO as number) ?? null;

    if (ingresoMensualCarrera === null) {
      setErrors((prev) => ({ ...prev, career: true }));
      setHighlightResults(false);
      setResult({ totalCost, mesesRec: null, rsi: null });
      return;
    }

    const ingresoPrepaVida = PREPA_MENSUAL * 12 * (EDAD_RETIRO - EDAD_INICIO);
    const ingresoLicVida =
      ingresoMensualCarrera * 12 * (EDAD_RETIRO - (EDAD_INICIO + years));
    const difIngresoVida = ingresoLicVida - ingresoPrepaVida;
    const exponente = 1 / (EDAD_RETIRO - (EDAD_INICIO + years));

    const rsi =
      difIngresoVida > 0 && totalCost > 0
        ? Math.pow(difIngresoVida / totalCost, exponente) - 1
        : null;

    const mesesRec =
      totalCost > 0 && ingresoMensualCarrera > 0
        ? totalCost / ingresoMensualCarrera
        : null;

    setResult({ totalCost, mesesRec, rsi });
    setHighlightResults(true);

    if (typeof window !== "undefined") {
      const el = document.getElementById("results-card");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement | null)?.focus?.();
    }
  };

  const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
    <div className="roi-step">
      <div className="roi-badge">{n}</div>
      <div className="flex-1">{children}</div>
    </div>
  );

  const baseInput = "roi-input";
  const inputClass = (field: string, liveErr = false) =>
    errors[field] || liveErr ? `${baseInput} border-red-500 ring-2 ring-red-400` : baseInput;

  const selectClass = (field: string) =>
    errors[field] ? "roi-select border-red-500 ring-2 ring-red-400" : "roi-select";

  return (
    <main className="min-h-screen bg-[#024383] pt-32 pb-16">
      <div>&bnsp;</div>
      <div className="roi-container">
        {/* Hero / Encabezado */}
        <div className="roi-card mb-5">
          <div className="roi-hero text-center mb-8">
            <h1 className="roi-title text-white font-bold leading-tight text-4xl md:text-5xl lg:text-6xl">
              Calcula el <span className="text-[#9CC5FF]">retorno sobre la inversión</span>
              <br />
              de estudiar una carrera
            </h1>
          </div>

          {/* Texto + botón pequeño alineado a la izquierda */}
          <div className="flex flex-col gap-3">
            <p className="text-white/90 max-w-[54ch] leading-relaxed">
              La <strong>calculadora de retorno sobre la inversión (RSI)</strong> permite estimar el
              rendimiento de estudiar una licenciatura o carrera técnica con base en los costos de
              cada carrera.
            </p>

            {/* Botón pequeño a la izquierda */}
            <div className="flex justify-start">
              <Link
                href="/metodologia"
                className="roi-btn--small roi-btn--ghost inline-flex self-start"
              >
                Metodología
              </Link>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="roi-grid">
          {/* Columna izquierda */}
          <section className="roi-card">
            <p>Ingresa la información de tu carrera:</p>

            <Step n={1}>
              <label className="roi-label">Elige el nivel educativo:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as EducationLevel)}
                className={selectClass("level")}
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl.replace("_", " ")}
                  </option>
                ))}
              </select>
            </Step>

            <Step n={2}>
              <label className="roi-label">Elige la carrera:</label>
              <select
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className={selectClass("career")}
              >
                <option value="">
                  -- {level === "Carrera_técnica" ? "Carrera técnica (TSU)" : "Licenciatura"} --
                </option>
                {filteredCareers.map((c) => (
                  <option key={c.CARRERA} value={c.CARRERA}>
                    {c.CARRERA}
                  </option>
                ))}
              </select>
            </Step>

            <Step n={3}>
              <label className="roi-label">¿Cómo se divide el plan de estudios?</label>
              <select
                value={planUnit}
                onChange={(e) => setPlanUnit(e.target.value as PlanUnit)}
                className={selectClass("planUnit")}
              >
                {PLAN_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </Step>

            {/* Step 4: periodos (solo enteros) */}
            <Step n={4}>
              <label htmlFor="periods" className="roi-label">
                ¿Cuántos (periodos) dura la carrera?
              </label>
              <input
                id="periods"
                ref={periodsRef}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                pattern="^\d+$"
                placeholder="Ej. 9"
                className={inputClass("periods", liveErrPeriods)}
                aria-invalid={errors.periods || liveErrPeriods}
                onInput={() => {
                  const val = periodsRef.current?.value ?? "";
                  const ok = parsePositiveIntStrict(val) !== null;
                  setLiveErrPeriods(val.trim().length > 0 && !ok);
                  setHighlightResults(false);
                }}
              />
              {(errors.periods || liveErrPeriods) && (
                <p className="text-sm text-red-400 mt-1">
                  Ingresa un número entero positivo (sin puntos ni comas).
                </p>
              )}
            </Step>

            {/* Step 5: costo por periodo (sin comas, punto decimal opcional) */}
            <Step n={5}>
              <label htmlFor="cpp" className="roi-label">
                ¿Cuál es el costo por (periodo)?
              </label>
              <input
                id="cpp"
                ref={costRef}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                pattern="^\$?\d+(\.\d+)?$"
                placeholder="Ej. 120000.50 o $120000.50"
                className={inputClass("costPerPeriod", liveErrCost)}
                aria-invalid={errors.costPerPeriod || liveErrCost}
                onInput={() => {
                  const val = costRef.current?.value ?? "";
                  const ok = parseMoneyNoComma(val) !== null;
                  setLiveErrCost(val.trim().length > 0 && !ok);
                  setHighlightResults(false);
                }}
              />
              {(errors.costPerPeriod || liveErrCost) && (
                <p className="text-sm text-red-400 mt-1">
                  Ingresa un monto válido sin comas. Usa punto para decimales (ej. 120000.50).
                </p>
              )}
            </Step>

            <div className="pt-3">
              <button
                type="button"
                className="roi-btn w-full text-center justify-center"
                onClick={handleCalculate}
                disabled={liveErrPeriods || liveErrCost}
                aria-disabled={liveErrPeriods || liveErrCost}
              >
                Calcular
              </button>
            </div>
          </section>

          {/* Columna derecha */}
          <section id="roi-results" className="space-y-6">
            <div
              id="results-card"
              tabIndex={-1}
              aria-live="polite"
              className={`roi-card ${highlightResults ? "roi-card--highlight" : ""}`}
              style={{ marginBottom: "1rem" }}
            >
              <div>
                <p className="roi-label">El costo total de la carrera sería de:</p>
                <div className="roi-chip">
                  {result.totalCost !== null ? `$${fmtMXN(result.totalCost)}` : "—"}
                </div>
              </div>

              <div>
                <p className="roi-label">Recuperar la inversión económica te tomaría:</p>
                <div className="roi-chip">
                  {result.mesesRec !== null ? `${result.mesesRec.toFixed(1)} meses` : "—"}
                </div>
              </div>

              <div>
                <p className="roi-label">Retorno sobre la inversión (RSI):</p>
                <div className="roi-chip">{result.rsi !== null ? fmtPct(result.rsi) : "—"}</div>
              </div>
            </div>

            <div className="roi-card">
              <p className="roi-label">
                ¿Contra qué compararlo? <span className="font-normal">(Inversiones populares)</span>
              </p>
              <div className="roi-compare-grid">
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">💱</div>
                  <p>Cetes</p>
                  <p className="text-2xl font-bold">7.3%</p>
                </div>
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">🪙</div>
                  <p>Oro*</p>
                  <p className="text-2xl font-bold">12.4%</p>
                </div>
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">📈</div>
                  <p>S&amp;P 500*</p>
                  <p className="text-2xl font-bold">14%</p>
                </div>
              </div>
              <p className="roi-note mt-3">*Promedio de la última década. Se considera rendimiento anual.</p>
              <p className="roi-note mt-3">*Referencia a noviembre 2025.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
