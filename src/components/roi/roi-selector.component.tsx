"use client";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const carrersData = require("@/components/carrers/carrers-data/carrers.data.json");

type Career = {
  CARRERA: string;
  MATRICULA?: number | string;
  [key: string]: any;
};

export default function RoiSelector() {
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [matricula, setMatricula] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const orderedCareers = (carrersData as Career[])
    .slice()
    .sort((a, b) => a.CARRERA.localeCompare(b.CARRERA));

  const handleSearch = () => {
    if (!selectedCareer) {
      setError("Selecciona una carrera primero.");
      setMatricula(null);
      return;
    }

    const found = (carrersData as Career[]).find(
      (c) => c.CARRERA === selectedCareer
    );

    if (!found) {
      setError("No se encontró información para esa carrera.");
      setMatricula(null);
      return;
    }

    const raw = found.MATRICULA;
    const num =
      typeof raw === "string" ? Number(raw.replace(/,/g, "")) : Number(raw);

    if (Number.isNaN(num)) {
      setError("La carrera no tiene matrícula numérica.");
      setMatricula(null);
      return;
    }

    setError("");
    setMatricula(num);
  };

  return (
    // 🔵 fondo azul del sitio
    <main className="min-h-screen bg-[#024383] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* título */}
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          Calculadora de ROI
        </h1>

        {/* bloque 1: selector */}
        <div className="bg-none rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Selecciona una carrera
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Elige una carrera --</option>
              {orderedCareers.map((career) => (
                <option key={career.CARRERA} value={career.CARRERA}>
                  {career.CARRERA}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#024383] text-black rounded-md px-6 py-2 font-medium hover:bg-[#033d74] transition"
            >
              Buscar
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* bloque 2: resultado */}
        <div className="bg-none rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Matrícula de la carrera seleccionada
          </h2>

          {!selectedCareer && !matricula && !error && (
            <p className="text-gray-600">
              Selecciona una carrera y da clic en <strong>Buscar</strong>.
            </p>
          )}

          {matricula !== null && (
            <p className="text-2xl font-semibold text-gray-900">
              Matrícula:{" "}
              <span className="text-gray-900">
                {new Intl.NumberFormat("es-MX").format(matricula)}
              </span>
            </p>
          )}

          {selectedCareer && matricula === null && !error && (
            <p className="text-gray-600">
              No hay dato de matrícula para esta carrera.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
