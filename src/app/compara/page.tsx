"use client"
import { useState } from "react"

import CompareForm from "@/components/carrers/compare-carrers-form/compare-form.component"
import CompareTable from "@/components/carrers/compare-carrers-table/compare-carrers-table.component"

import carrersDataCSV from "@/components/carrers/carrers-data/carrers.data.csv"

export default function Compara() {
  const [isComparing, setIsComparing] = useState(false)

  const handleOnClickCompare = () => {
    setIsComparing(!isComparing)
  }

  const parseCSV = () => {
    const lines = carrersDataCSV.split('\n')
    const headers = lines[0].split(',').map(
      (header: string) => header.trim().replace(/"/g, '')
    )

    console.log(headers);

    return lines.slice(1).map((line: string) => {
      const values = line.split(',');
      return headers.reduce((obj: unknown, header: string, index: number) => {
        obj[header] = values[index] ? values[index].replace(/"/g, '').trim() : '';
        return obj;
      }, {});
    });
  }

  const carrersData = parseCSV()

  return (
    <main className="pt-8">
      <div className="row">
        <div className={isComparing ? "col-md-3" : "col-8 offset-2"}>
          <div className="ml-2 card p-2">
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
              />
            </div>
          </div>
        </div>
        <div className={isComparing ? "col-md-9 pr-6" : "hidden"}>
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                <CompareTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
