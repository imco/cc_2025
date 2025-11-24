"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import carrersData from "@/components/carrers/carrers-data/carrers.data.json";

// TypeScript declarations for Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

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

const UNIT_PLURAL: Record<PlanUnit, string> = {
  Semestres: "semestres",
  Cuatrimestres: "cuatrimestres",
  Trimestres: "trimestres",
  Años: "años",
};

const UNIT_SINGULAR: Record<PlanUnit, string> = {
  Semestres: "semestre",
  Cuatrimestres: "cuatrimestre",
  Trimestres: "trimestre",
  Años: "año",
};

const UNIVERSITY_TYPES = ["Pública", "Privada"] as const;
type UniversityType = (typeof UNIVERSITY_TYPES)[number];

const PREPA_MENSUAL = 12052;
const EDAD_INICIO = 18;
const EDAD_RETIRO = 65;

const isTSU = (c: Career) =>
  /^TSU[\s.\-]/.test(String(c.CARRERA ?? "").trim().toUpperCase());

/** Solo enteros positivos hasta un máximo de 15 */
function parsePositiveIntStrict(v: string): number | null {
  if (!v) return null;
  if (!/^\s*\d+\s*$/.test(v)) return null; // solo dígitos
  const n = Number(v.trim());
  if (!Number.isSafeInteger(n) || n <= 0 || n > 15) return null;
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

/**
 * Envía los datos del cálculo ROI a Google Analytics 4
 * para análisis posterior del comportamiento de usuarios
 */
const trackRoiCalculation = (data: {
  level: EducationLevel;
  universityType: UniversityType;
  career: string;
  customCareerName?: string;
  planUnit: PlanUnit;
  periods: number;
  costPerPeriod: number;
  totalCost: number;
  mesesRec: number | null;
  rsi: number | null;
}) => {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      // Determinar si es una carrera personalizada (Otro)
      const isCustomCareer = data.career === "__OTHER__";

      window.gtag("event", "roi_calculation", {
        // Información del formulario
        education_level: data.level,
        university_type: data.universityType,
        career_name: isCustomCareer ? "Otro (carrera no listada)" : data.career,
        custom_career_name: isCustomCareer ? (data.customCareerName || "No especificado") : null,
        is_custom_career: isCustomCareer,
        plan_unit: data.planUnit,
        periods: data.periods,

        // Costos ingresados
        cost_per_period: Math.round(data.costPerPeriod),
        total_cost: data.totalCost,

        // Resultados calculados
        months_to_recover: data.mesesRec ? Math.round(data.mesesRec * 10) / 10 : null,
        rsi_percentage: data.rsi ? Math.round(data.rsi * 1000) / 10 : null,

        // Metadata
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Silently fail - no afectar la UX si falla el tracking
    console.error("Error tracking ROI calculation:", error);
  }
};

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
  const [universityType, setUniversityType] = useState<UniversityType | "">("");

  // custom career name when "Otro" is selected
  const [customCareerName, setCustomCareerName] = useState<string>("");

  // inputs
  const periodsRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const customCareerRef = useRef<HTMLInputElement>(null);

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
    if (career && !filteredCareers.some((c) => c.CARRERA === career) && career !== "__OTHER__") {
      setCareer("");
    }
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
      universityType: !universityType,
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

    // ingreso mensual: carrera específica o promedio si es "Otro"
    let ingresoMensualCarrera: number | null;

    if (career === "__OTHER__") {
      const ingresos = filteredCareers
        .map((c) => c.INGRESO)
        .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
      if (ingresos.length === 0) {
        ingresoMensualCarrera = null;
      } else {
        const suma = ingresos.reduce((acc, v) => acc + v, 0);
        ingresoMensualCarrera = suma / ingresos.length;
      }
    } else {
      ingresoMensualCarrera =
        (filteredCareers.find((c) => c.CARRERA === career)?.INGRESO as number) ?? null;
    }

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

    // Enviar datos a Google Analytics 4 para análisis
    trackRoiCalculation({
      level,
      universityType: universityType as UniversityType,
      career,
      customCareerName: customCareerName.trim() || undefined,
      planUnit,
      periods: p,
      costPerPeriod: cpp,
      totalCost,
      mesesRec,
      rsi,
    });

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
      <div>&nbsp;</div>
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

            {/* STEP 1: nivel educativo */}
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

            {/* STEP 2: tipo de universidad */}
            <Step n={2}>
              <label className="roi-label">Tu universidad es:</label>
              <select
                value={universityType}
                onChange={(e) => setUniversityType(e.target.value as UniversityType | "")}
                className={selectClass("universityType")}
              >
                <option value="">-- Pública o privada --</option>
                {UNIVERSITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Step>

            {/* STEP 3: carrera */}
            <Step n={3}>
              <label className="roi-label">Elige la carrera:</label>
              <select
                value={career}
                onChange={(e) => {
                  setCareer(e.target.value);
                  // Limpiar el nombre personalizado si cambia de "Otro" a otra opción
                  if (e.target.value !== "__OTHER__") {
                    setCustomCareerName("");
                  }
                }}
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
                <option value="__OTHER__">Otro (mi carrera no está en la lista)</option>
              </select>

              {/* Campo condicional: aparece solo cuando se selecciona "Otro" */}
              {career === "__OTHER__" && (
                <div className="mt-3">
                  <label htmlFor="custom-career" className="roi-label text-sm">
                    ¿Cuál es el nombre de tu carrera?
                  </label>
                  <input
                    id="custom-career"
                    ref={customCareerRef}
                    type="text"
                    placeholder="Ej. Ingeniería en Robótica"
                    value={customCareerName}
                    onChange={(e) => setCustomCareerName(e.target.value)}
                    className="roi-input"
                    maxLength={100}
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Esto nos ayuda a mejorar nuestra lista de carreras
                  </p>
                </div>
              )}
            </Step>

            {/* STEP 4: plan de estudios */}
            <Step n={4}>
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

            {/* STEP 5: periodos (solo enteros, máximo 15, autoclimita) */}
            <Step n={5}>
              <label htmlFor="periods" className="roi-label">
                ¿Cuántos {UNIT_PLURAL[planUnit]} dura la carrera?
              </label>

              <input
                id="periods"
                ref={periodsRef}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                pattern="^\\d+$"
                placeholder="Ej. 9"
                className={inputClass("periods", liveErrPeriods)}
                aria-invalid={errors.periods || liveErrPeriods}
                onInput={() => {
                  const inputEl = periodsRef.current;
                  if (!inputEl) return;

                  // Solo dígitos
                  const raw = inputEl.value.replace(/\D/g, "");

                  if (raw === "") {
                    inputEl.value = "";
                    setLiveErrPeriods(false);
                    setHighlightResults(false);
                    return;
                  }

                  let num = Number(raw);

                  if (!Number.isFinite(num) || num <= 0) {
                    setLiveErrPeriods(true);
                  } else {
                    if (num > 15) num = 15; // límite automático
                    inputEl.value = String(num);
                    const ok = parsePositiveIntStrict(inputEl.value) !== null;
                    setLiveErrPeriods(!ok);
                  }

                  setHighlightResults(false);
                }}
              />

              {(errors.periods || liveErrPeriods) && (
                <p className="text-sm text-red-400 mt-1">
                  Ingresa un número entero positivo (máximo 15).
                </p>
              )}
            </Step>

            {/* STEP 6: costo por periodo (sin comas, punto decimal opcional) */}
            <Step n={6}>
              <label htmlFor="cpp" className="roi-label">
                ¿Cuál es el costo por {UNIT_SINGULAR[planUnit]}?
              </label>
              <input
                id="cpp"
                ref={costRef}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                pattern="^\\$?\\d+(\\.\\d+)?$"
                placeholder="Ej. 120000.50"
                className={inputClass("costPerPeriod", liveErrCost)}
                aria-invalid={errors.costPerPeriod || liveErrCost}
                onInput={() => {
                  const inputEl = costRef.current;
                  if (!inputEl) return;

                  const val = inputEl.value;

                  // Permitir vacío
                  if (val.trim() === "") {
                    setLiveErrCost(false);
                    setHighlightResults(false);
                    return;
                  }

                  // Permitir estados intermedios válidos mientras se escribe:
                  // - Solo dígitos: "120000"
                  // - Con punto al final: "120000."
                  // - Con decimales: "120000.50"
                  // - Con signo de pesos opcional: "$120000.50"
                  const isValidIntermediate = /^\s*\$?\s*\d+\.?\d*\s*$/.test(val);

                  if (!isValidIntermediate) {
                    // Si tiene caracteres inválidos (como comas), mostrar error
                    setLiveErrCost(true);
                  } else {
                    // Estado intermedio válido, no mostrar error
                    setLiveErrCost(false);
                  }

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
              <p className="roi-note mt-3">
                *Promedio de la última década. Se considera rendimiento anual.
              </p>
              <p className="roi-note mt-3">*Referencia a noviembre de 2025.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
