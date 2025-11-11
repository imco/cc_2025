"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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

/** Parser laxo: acepta "120,000.50", "120.000,50", "$ 120 000,50", etc. */
function toNumberLoose(v: string): number {
  if (!v) return NaN;
  const raw = String(v).replace(/[^\d.,\-]/g, "");
  if (!raw) return NaN;
  const lastSepIndex = Math.max(raw.lastIndexOf(","), raw.lastIndexOf("."));
  if (lastSepIndex === -1) return Number(raw.replace(/[^\d\-]/g, ""));
  const intPart = raw.slice(0, lastSepIndex).replace(/[.,]/g, "").replace(/[^\d\-]/g, "");
  const decPart = raw.slice(lastSepIndex + 1).replace(/[^\d]/g, "");
  const sign = intPart.startsWith("-") ? "-" : "";
  const intClean = intPart.replace("-", "") || "0";
  return Number(`${sign}${intClean}.${decPart || "0"}`);
}

const fmtMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;

export default function RoiSelector() {
  const careers = useMemo(
    () => (carrersData as Career[]).slice().sort((a, b) => a.CARRERA.localeCompare(b.CARRERA)),
    []
  );

  // estado select
  const [level, setLevel] = useState<EducationLevel>("Licenciatura");
  const [career, setCareer] = useState<string>("");
  const [planUnit, setPlanUnit] = useState<PlanUnit>("Cuatrimestres");

  // inputs no controlados para permitir escribir/pegar libremente
  const periodsRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);

  // errores: post-click (completitud) + live (solo “es numérico” en 4 y 5)
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [liveErrPeriods, setLiveErrPeriods] = useState(false);
  const [liveErrCost, setLiveErrCost] = useState(false);

  const [result, setResult] = useState<{ totalCost: number | null; mesesRec: number | null; rsi: number | null }>({
    totalCost: null,
    mesesRec: null,
    rsi: null,
  });

  const filteredCareers = useMemo(
    () => careers.filter((c) => (level === "Carrera_técnica" ? isTSU(c) : !isTSU(c))),
    [careers, level]
  );

  useEffect(() => {
    if (career && !filteredCareers.some((c) => c.CARRERA === career)) setCareer("");
  }, [filteredCareers, career]);

  // lectura actual de inputs 4 y 5
  const readInputs = () => {
    const periodsText = periodsRef.current?.value ?? "";
    const costText = costRef.current?.value ?? "";
    const p = toNumberLoose(periodsText);
    const cpp = toNumberLoose(costText);
    return { p, cpp, periodsText, costText };
  };

  // validación completa solo al dar clic
  const handleCalculate = () => {
    const { p, cpp } = readInputs();

    const newErrors: Record<string, boolean> = {
      level: !level,
      career: !career,
      planUnit: !planUnit,
      periods: !Number.isFinite(p) || p <= 0,
      costPerPeriod: !Number.isFinite(cpp) || cpp <= 0,
    };

    const hasError = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);

    if (hasError) {
      setResult({ totalCost: null, mesesRec: null, rsi: null });
      return;
    }

    const totalCost = Math.round(p * cpp);
    const years = p / PERIODS_PER_YEAR[planUnit];

    const ingresoMensualCarrera =
      (filteredCareers.find((c) => c.CARRERA === career)?.INGRESO as number) ?? null;

    if (ingresoMensualCarrera === null) {
      setErrors((prev) => ({ ...prev, career: true }));
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

    const mesesRec = totalCost > 0 && ingresoMensualCarrera > 0 ? totalCost / ingresoMensualCarrera : null;

    setResult({ totalCost, mesesRec, rsi });
    if (typeof window !== "undefined") {
      document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth" });
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
    <main className="min-h-screen bg-[#024383] pt-24 pb-16">
      <div className="roi-container">
        {/* Hero */}
        <div className="roi-hero">
          <Image
            src="/roi/encabezado.png"
            alt="Calculadora RSI"
            width={980}
            height={160}
            priority
            sizes="(max-width: 1024px) 100vw, 980px"
            className="w-full max-w-[980px] rounded-xl"
          />
        </div>

        {/* Intro */}
        <div className="roi-card mb-5">
          <div className="flex flex-wrap justify-between gap-4">
            <p className="text-white/90 max-w-[54ch] leading-relaxed">
              La <strong>calculadora de retorno sobre la inversión (RSI)</strong> te permite estimar
              el rendimiento que podrías obtener al estudiar una licenciatura o carrera técnica.
            </p>
            <Link href="/metodologia" className="roi-btn">Metodología</Link>
          </div>
        </div>

        {/* Grid */}
        <div className="roi-grid">
          {/* Columna izquierda */}
          <section className="roi-card">
            <Step n={1}>
              <label className="roi-label">Elige el nivel educativo:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as EducationLevel)}
                className={selectClass("level")}
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl.replace("_", " ")}</option>
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
                  <option key={c.CARRERA} value={c.CARRERA}>{c.CARRERA}</option>
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
                {PLAN_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Step>

            {/* Step 4: validación en tiempo real SOLO de “es numérico” */}
            <Step n={4}>
              <label htmlFor="periods" className="roi-label">¿Cuántos (periodos) dura la carrera?</label>
              <input
                id="periods"
                ref={periodsRef}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ej. 9 o 9.5"
                className={inputClass("periods", liveErrPeriods)}
                aria-invalid={errors.periods || liveErrPeriods}
                onInput={() => {
                  const val = periodsRef.current?.value ?? "";
                  const n = toNumberLoose(val);
                  setLiveErrPeriods(val.trim().length > 0 && !Number.isFinite(n)); // sólo marca si hay texto y no es número
                }}
              />
              {(errors.periods || liveErrPeriods) && (
                <p className="text-sm text-red-400 mt-1">Ingresa un número válido (puede llevar decimales).</p>
              )}
            </Step>

            {/* Step 5: validación en tiempo real SOLO de “es numérico” */}
            <Step n={5}>
              <label htmlFor="cpp" className="roi-label">¿Cuál es el costo por (periodo)?</label>
              <input
                id="cpp"
                ref={costRef}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ej. 120000 o $120,000.50"
                className={inputClass("costPerPeriod", liveErrCost)}
                aria-invalid={errors.costPerPeriod || liveErrCost}
                onInput={() => {
                  const val = costRef.current?.value ?? "";
                  const n = toNumberLoose(val);
                  setLiveErrCost(val.trim().length > 0 && !Number.isFinite(n));
                }}
              />
              {(errors.costPerPeriod || liveErrCost) && (
                <p className="text-sm text-red-400 mt-1">Ingresa un monto numérico válido.</p>
              )}
            </Step>

            <div className="pt-3">
              <button type="button" className="roi-btn" onClick={handleCalculate}>
                Calcular
              </button>
            </div>
          </section>

          {/* Columna derecha */}
          <section id="roi-results" className="space-y-6">
            <div className="roi-card space-y-3">
              <div>
                <p className="roi-label">Recuperar la inversión económica te tomaría:</p>
                <div className="roi-chip">
                  {result.mesesRec !== null ? `${result.mesesRec.toFixed(1)} meses` : "—"}
                </div>
              </div>
              <div>
                <p className="roi-label">El costo total de la carrera sería de:</p>
                <div className="roi-chip">
                  {result.totalCost !== null ? `$${fmtMXN(result.totalCost)}` : "—"}
                </div>
              </div>
              <div>
                <p className="roi-label">Retorno sobre la inversión (RSI):</p>
                <div className="roi-chip">
                  {result.rsi !== null ? fmtPct(result.rsi) : "—"}
                </div>
              </div>
            </div>

            <div className="roi-card">
              <p className="roi-label">¿Contra qué compararlo? <span className="font-normal">(Inversiones populares)</span></p>
              <div className="roi-compare-grid">
                <div className="roi-compare-card"><div className="roi-compare-icon">💱</div><p>Cetes</p><p className="text-2xl font-bold">7.3%</p></div>
                <div className="roi-compare-card"><div className="roi-compare-icon">🪙</div><p>Oro*</p><p className="text-2xl font-bold">12.4%</p></div>
                <div className="roi-compare-card"><div className="roi-compare-icon">📈</div><p>S&amp;P 500*</p><p className="text-2xl font-bold">14%</p></div>
              </div>
              <p className="roi-note mt-3">*Promedio de la última década. Se considera rendimiento anual.</p>
            </div>

            <p className="roi-note">
              Fórmula RSI = ((Diferencial de ingreso de por vida / Costo total) ^
              [1 / (65 − (18 + duración de la carrera))]) − 1.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
