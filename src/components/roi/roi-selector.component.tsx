// src/components/roi/roi-selector.component.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

// Si tu proyecto NO tiene resolveJsonModule, deja el require tipado.
// Si SÍ lo tiene, puedes cambiar por: import carrersData from ".../carrers.data.json";
const carrersData: Career[] = require("@/components/carrers/carrers-data/carrers.data.json");

type Career = {
  CARRERA: string;
  INGRESO?: number; // ingreso mensual promedio (MXN)
  [k: string]: unknown; // evitar 'any' para ESLint
};

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

// Supuestos fijos (como en tu hoja)
const PREPA_MENSUAL = 12052; // MXN
const EDAD_INICIO = 18;
const EDAD_RETIRO = 65;

/** TSU: detecta carreras técnicas si el nombre empieza con "TSU" (con o sin punto/guion/espacio). */
function esTSU(c: Career): boolean {
  const name = (c.CARRERA ?? "").toString().trim().toUpperCase();
  // ejemplos válidos: "TSU. Servicios...", "TSU Servicios...", "TSU-Servicios..."
  return /^TSU[\s.\-]/.test(name);
}

const toNumber = (v: string) => {
  const n = Number(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const fmtMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;

export default function RoiSelector() {
  // ===== datos base (carreras) =====
  const careers = useMemo(
    () =>
      (carrersData as Career[]).slice().sort((a, b) =>
        a.CARRERA.localeCompare(b.CARRERA)
      ),
    []
  );

  // ===== estado de selección =====
  const [level, setLevel] = useState<EducationLevel>("Licenciatura");
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [planUnit, setPlanUnit] = useState<PlanUnit>("Semestres");
  const [periods, setPeriods] = useState<string>(""); // número de periodos
  const [costPerPeriod, setCostPerPeriod] = useState<string>(""); // MXN

  // ===== lista filtrada de carreras por nivel =====
  const filteredCareers = useMemo(() => {
    if (!careers.length) return [];
    return careers.filter((c) => {
      const tec = esTSU(c);
      return level === "Carrera_técnica" ? tec : !tec;
    });
  }, [careers, level]);

  // Si cambias el nivel y la carrera ya no aplica, limpia selección
  useEffect(() => {
    if (selectedCareer) {
      const stillThere = filteredCareers.some((c) => c.CARRERA === selectedCareer);
      if (!stillThere) setSelectedCareer("");
    }
  }, [level, filteredCareers, selectedCareer]);

  // ===== valores derivados de inputs =====
  const periodsNum = toNumber(periods);
  const costNum = toNumber(costPerPeriod);
  const validPeriods = Number.isFinite(periodsNum) && periodsNum > 0;
  const validCost = Number.isFinite(costNum) && costNum >= 0;

  const totalCost =
    validPeriods && validCost ? Math.round(periodsNum * costNum) : null;

  const years =
    validPeriods && PERIODS_PER_YEAR[planUnit]
      ? periodsNum / PERIODS_PER_YEAR[planUnit]
      : null;

  // ingreso mensual de la carrera seleccionada (del JSON)
  const ingresoMensualCarrera =
    (filteredCareers.find((c) => c.CARRERA === selectedCareer)?.INGRESO as number) ??
    null;

  // ===== cálculos (1:1 con tu Excel) =====
  // Ingreso bachillerato y licenciatura de por vida
  const ingresoPrepaVida = PREPA_MENSUAL * 12 * (EDAD_RETIRO - EDAD_INICIO);

  const ingresoLicVida =
    ingresoMensualCarrera !== null && years !== null
      ? ingresoMensualCarrera * 12 * (EDAD_RETIRO - (EDAD_INICIO + years))
      : null;

  const difIngresoVida =
    ingresoLicVida !== null ? ingresoLicVida - ingresoPrepaVida : null;

  // Exponente = 1 / (65 - (18 + duración))
  const exponente =
    years !== null ? 1 / (EDAD_RETIRO - (EDAD_INICIO + years)) : null;

  // RSI = ((difIngresoVida / costoTotal) ^ exponente) - 1
  const rsiAnualizado =
    difIngresoVida !== null &&
    totalCost !== null &&
    totalCost > 0 &&
    exponente !== null &&
    isFinite(exponente) &&
    exponente > 0
      ? Math.pow(difIngresoVida / totalCost, exponente) - 1
      : null;

  // Recuperar inversión (meses) = costoTotal / ingreso mensual de carrera (como B17 en tu hoja)
  const mesesRecuperacion =
    totalCost !== null &&
    ingresoMensualCarrera !== null &&
    ingresoMensualCarrera > 0
      ? totalCost / ingresoMensualCarrera
      : null;

  // ===== UI =====
  return (
    <main className="min-h-screen bg-[#024383] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          Calculadora de ROI
        </h1>

        {/* Parámetros */}
        <section className="bg-transparent rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Selecciona los parámetros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nivel educativo */}
            <label className="flex flex-col">
              <span className="text-white/90 mb-1">Elige el nivel educativo</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as EducationLevel)}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl.replace("_", " ")}
                  </option>
                ))}
              </select>
            </label>

            {/* Carrera (filtrada por nivel) */}
            <label className="flex flex-col">
              <span className="text-white/90 mb-1">Elige la carrera</span>
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              >
                <option value="">
                  -- {level === "Carrera_técnica"
                    ? "Elige una carrera técnica (TSU)"
                    : "Elige una licenciatura"} --
                </option>
                {filteredCareers.map((c) => (
                  <option key={c.CARRERA} value={c.CARRERA}>
                    {c.CARRERA}
                  </option>
                ))}
              </select>
            </label>

            {/* Unidad del plan */}
            <label className="flex flex-col">
              <span className="text-white/90 mb-1">
                ¿Cómo se divide el plan de estudios?
              </span>
              <select
                value={planUnit}
                onChange={(e) => setPlanUnit(e.target.value as PlanUnit)}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              >
                {PLAN_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </label>

            {/* Periodos */}
            <label className="flex flex-col">
              <span className="text-white/90 mb-1">
                ¿Cuántos periodos dura la carrera?
              </span>
              <input
                inputMode="numeric"
                placeholder="Ej. 9"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              />
            </label>

            {/* Costo por periodo */}
            <label className="flex flex-col md:col-span-2">
              <span className="text-white/90 mb-1">
                ¿Cuál es el costo por periodo? (MXN)
              </span>
              <input
                inputMode="numeric"
                placeholder="Ingresa tu número sin comas. Ej. 120000"
                value={costPerPeriod}
                onChange={(e) => setCostPerPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              />
            </label>
          </div>
        </section>

        {/* Resultados */}
        <section className="bg-transparent rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-white text-lg font-semibold mb-1">
              El costo total de la carrera sería:
            </h3>
            <p className="text-white text-2xl font-bold">
              {totalCost !== null ? `$${fmtMXN(totalCost)}` : "—"}
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-1">
              Recuperar la inversión económica tomaría:
            </h3>
            <p className="text-white text-xl">
              {mesesRecuperacion !== null ? `${mesesRecuperacion.toFixed(1)} meses` : "—"}
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-1">RSI</h3>
            <p className="text-white text-xl">
              {rsiAnualizado !== null ? fmtPct(rsiAnualizado) : "—"}
            </p>
          </div>
        </section>

        <p className="text-white/80 text-sm mt-6">
          Nota: RSI anualizado ={" "}
          <em>
            ((Diferencial de ingreso de por vida / Costo total) ^
            [1 / (65 − (18 + duración de la carrera))]) − 1
          </em>. Los meses de recuperación usan el ingreso mensual promedio de la
          carrera seleccionada.
        </p>
      </div>
    </main>
  );
}
