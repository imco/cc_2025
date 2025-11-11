"use client";

import { useEffect, useMemo, useState } from "react";
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

const toNumber = (v: string) => {
  const n = Number(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const fmtMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;

export default function RoiSelector() {
  const careers = useMemo(
    () =>
      (carrersData as Career[]).slice().sort((a, b) => a.CARRERA.localeCompare(b.CARRERA)),
    []
  );

  const [level, setLevel] = useState<EducationLevel>("Licenciatura");
  const [career, setCareer] = useState<string>("");
  const [planUnit, setPlanUnit] = useState<PlanUnit>("Cuatrimestres");
  const [periods, setPeriods] = useState<string>("");
  const [costPerPeriod, setCostPerPeriod] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [result, setResult] = useState<{
    totalCost: number | null;
    mesesRec: number | null;
    rsi: number | null;
  }>({ totalCost: null, mesesRec: null, rsi: null });

  const filteredCareers = useMemo(
    () => careers.filter((c) => (level === "Carrera_técnica" ? isTSU(c) : !isTSU(c))),
    [careers, level]
  );

  useEffect(() => {
    if (career && !filteredCareers.some((c) => c.CARRERA === career)) setCareer("");
  }, [filteredCareers, career]);

  const validateFields = (): boolean => {
    const newErrors: Record<string, boolean> = {
      level: !level,
      career: !career,
      planUnit: !planUnit,
      periods: !periods || toNumber(periods) <= 0,
      costPerPeriod: !costPerPeriod || toNumber(costPerPeriod) <= 0,
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    setErrorMsg(hasError ? "Por favor completa todos los campos correctamente." : "");
    return !hasError;
  };

  const handleCalculate = () => {
    if (!validateFields()) {
      setResult({ totalCost: null, mesesRec: null, rsi: null });
      return;
    }

    const p = toNumber(periods);
    const cpp = toNumber(costPerPeriod);
    const totalCost = Math.round(p * cpp);
    const years = p / PERIODS_PER_YEAR[planUnit];

    const ingresoMensualCarrera =
      (filteredCareers.find((c) => c.CARRERA === career)?.INGRESO as number) ?? null;

    if (ingresoMensualCarrera === null) {
      setErrorMsg("No se encontró información de ingreso para esta carrera.");
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
    setErrorMsg("");
    document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth" });
  };

  const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
    <div className="roi-step">
      <div className="roi-badge">{n}</div>
      <div className="flex-1">{children}</div>
    </div>
  );

  const inputClass = (field: string) =>
    errors[field]
      ? "roi-input border-red-500 ring-2 ring-red-400"
      : "roi-input";

  const selectClass = (field: string) =>
    errors[field]
      ? "roi-select border-red-500 ring-2 ring-red-400"
      : "roi-select";

  return (
    <main className="min-h-screen bg-[#024383] pt-24 pb-16">
      <div className="roi-container">
        {/* Hero con imagen */}
        <div className="roi-hero">
          <img src="/roi/encabezado.png" alt="Calculadora RSI" />
        </div>

        {/* Intro */}
        <div className="roi-card" style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "rgba(255,255,255,.92)", maxWidth: "54ch", lineHeight: 1.6 }}>
              La <strong>calculadora de retorno sobre la inversión (RSI)</strong> te permite estimar,
              con base en tus propios supuestos, el rendimiento que podrías obtener al estudiar una
              licenciatura o carrera técnica. Podrás ajustar las condiciones según tu situación
              personal para conocer el retorno que tendría tu inversión en educación.
            </p>
            <a href="/metodologia" className="roi-btn">
              Metodología
            </a>
          </div>
        </div>

        {/* Dos columnas */}
        <div className="roi-grid">
          {/* Izquierda */}
          <section className="roi-card">
            <Step n={1}>
              <label className="roi-label">Elige el nivel educativo:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as EducationLevel)}
                className={selectClass("level")}
                required
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
                required
              >
                <option value="">
                  --{" "}
                  {level === "Carrera_técnica"
                    ? "Elige una carrera técnica (TSU)"
                    : "Elige una licenciatura"}{" "}
                  --
                </option>
                {filteredCareers.map((c) => (
                  <option key={c.CARRERA} value={c.CARRERA}>
                    {c.CARRERA}
                  </option>
                ))}
              </select>
            </Step>

            <Step n={3}>
              <label className="roi-label">
                ¿Cómo se divide el plan de estudios? (Semestre, cuatrimestre, año, etc)
              </label>
              <select
                value={planUnit}
                onChange={(e) => setPlanUnit(e.target.value as PlanUnit)}
                className={selectClass("planUnit")}
                required
              >
                {PLAN_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </Step>

            <Step n={4}>
              <label className="roi-label">¿Cuántos (periodos) dura la carrera?</label>
              <input
                inputMode="numeric"
                placeholder="Ej. 9"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
                className={inputClass("periods")}
                required
              />
            </Step>

            <Step n={5}>
  <label className="roi-label">¿Cuál es el costo por (periodo)?</label>
  <input
    type="text"
    placeholder="Ingresa tu número sin comas"
    value={costPerPeriod}
    onChange={(e) => {
      // Solo permitir dígitos y opcionalmente un punto decimal
      const clean = e.target.value.replace(/[^\d.]/g, "");
      setCostPerPeriod(clean);
    }}
    className={inputClass("costPerPeriod")}
    required
  />
</Step>


            {errorMsg && (
              <p
                style={{
                  color: "#fca5a5",
                  fontWeight: 500,
                  marginTop: ".5rem",
                }}
              >
                ⚠️ {errorMsg}
              </p>
            )}

            <div style={{ paddingTop: ".75rem" }}>
              <button type="button" className="roi-btn" onClick={handleCalculate}>
                Calcular
              </button>
            </div>
          </section>

          {/* Derecha */}
          <section id="roi-results" className="space-y-6">
            <div className="roi-card" style={{ marginBottom: "1rem" }}>
              <div className="roi-results-row" style={{ marginBottom: ".75rem" }}>
                <p className="roi-label" style={{ marginBottom: 0 }}>
                  Recuperar la inversión económica te tomaría:
                </p>
                <div className="roi-chip">
                  {result.mesesRec !== null ? `${result.mesesRec.toFixed(1)} meses` : "—"}
                </div>
              </div>

              <div className="roi-results-row" style={{ marginBottom: ".75rem" }}>
                <p className="roi-label" style={{ marginBottom: 0 }}>
                  El costo total de la carrera sería de:
                </p>
                <div className="roi-chip">
                  {result.totalCost !== null ? `$${fmtMXN(result.totalCost)}` : "—"}
                </div>
              </div>

              <div className="roi-results-row">
                <p className="roi-label" style={{ marginBottom: 0 }}>
                  Retorno sobre la inversión (RSI):
                </p>
                <div className="roi-chip">
                  {result.rsi !== null ? fmtPct(result.rsi) : "—"}
                </div>
              </div>
            </div>

            <div className="roi-card">
              <p className="roi-label" style={{ marginBottom: ".75rem" }}>
                ¿Contra qué compararlo?{" "}
                <span style={{ fontWeight: 400 }}>(Inversiones populares)</span>
              </p>
              <div className="roi-compare-grid">
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">💱</div>
                  <p style={{ fontWeight: 800 }}>Cetes</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: ".25rem" }}>
                    7.3%
                  </p>
                </div>
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">🪙</div>
                  <p style={{ fontWeight: 800 }}>Oro*</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: ".25rem" }}>
                    12.4%
                  </p>
                </div>
                <div className="roi-compare-card">
                  <div className="roi-compare-icon">📈</div>
                  <p style={{ fontWeight: 800 }}>S&amp;P 500*</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: ".25rem" }}>
                    14%
                  </p>
                </div>
              </div>
              <p className="roi-note" style={{ marginTop: ".75rem" }}>
                *Promedio de la última década. Se considera rendimiento anual.
              </p>
            </div>

            <p className="roi-note">
              Fórmula RSI = ((Diferencial de ingreso de por vida / Costo total) ^ [1 / (65 − (18 + duración de la carrera))]) − 1.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
