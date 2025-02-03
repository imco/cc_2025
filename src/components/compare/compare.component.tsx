"use client"
import { useEffect, useState } from "react"
import { redirect, useSearchParams } from 'next/navigation'

import CompareForm from "@/components/compare/compare-carrers-form/compare-form.component"
import CompareTable from "@/components/compare/compare-carrers-table/compare-carrers-table.component"

export default function Compare() {
  const [isComparing, setIsComparing] = useState(false)
  const [carrersToCompare, setCarrersToCompare] = useState(Array<(string | null)>)

  const searchParams = useSearchParams()
  const carrer1 = searchParams.get('carrer1')
  const carrer2 = searchParams.get('carrer2')

  useEffect(() => {
    if (carrer1 && carrer2) {
      setIsComparing(true)
      setCarrersToCompare([carrer1, carrer2])
    }
  }, [carrer1, carrer2])

  const handleOnClickCompare = () => {
    if (carrersToCompare[0] && carrersToCompare[1]) {
      console.log(`/compara?carrer1=${carrersToCompare[0]}&carrer2=${carrersToCompare[1]}`);
      redirect(`/compara?carrer1=${carrersToCompare[0]}&carrer2=${carrersToCompare[1]}`)
    } else {
      alert('Selecciona dos carreras por favor')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")

  return (
    <main className="pt-8 container-fluid">
      <div className="row">
        <div className={isComparing ? "col-md-3 col-12 mb-3" : "col-8 offset-2"}>
          <div className="md:ml-2 card p-2">
            <div className="card-body">
              <div className="text-center">
                <span className="card-title text-3xl font-bold text-principal">
                  Compara Carreras
                </span>
              </div>
              <div className="card-text text-justify mt-3 mb-4 font-light">
                Compara Carreras es una herramienta que permite analizar indicadores del mercado laboral para que los jóvenes conozcan los beneficios y riesgos de una carrera. La herramienta te permite comparar las opciones de tu interés para tomar una decisión informada.
              </div>
              <CompareForm
                isComparing={isComparing}
                handleOnClickCompare={handleOnClickCompare}
                carrersData={carrersData}
                seCarrersToCompare={setCarrersToCompare}
              />
            </div>
          </div>
        </div>
        <div className={isComparing ? "col-md-9 md:pr-6" : "hidden"}>
          <div className="card mb-4">
            <div className="card-body">
              <div className="card-text">
                <CompareTable
                  carrersData={carrersData}
                  carrerToCompare={carrersToCompare}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
