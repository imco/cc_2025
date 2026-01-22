"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { redirect, useSearchParams } from 'next/navigation'
import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import SaberesBanner from '@/components/saberes/saberes-banner.component'


export default function Compare() {
  const [isComparing, setIsComparing] = useState(false)

  const [career1ToCompare, setCareer1ToCompare] = useState('')
  const [career2ToCompare, setCareer2ToCompare] = useState('')

  const searchParams = useSearchParams()
  const carrer1 = decodeURI(searchParams.get('carrer1') || '')
  const carrer2 = decodeURI(searchParams.get('carrer2') || '')

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const careersData = require("@/components/carrers/carrers-data/carrers.data.json")
  const careerNames: string[] = careersData.map((career: CarrersData) => career.CARRERA)

  const carrer1Data: CarrersData = careersData.find(
    (carrerData: CarrersData) => carrer1 === carrerData.CARRERA
  )
  const carrer2Data: CarrersData = careersData.find(
    (carrerData: CarrersData) => carrer2 === carrerData.CARRERA
  )

  useEffect(() => {
    if (carrer1 && carrer2) {
      setIsComparing(true)
    }
  }, [carrer1, carrer2])

  const handleOnClickCompare = () => {
    if (careerNames.find(career => career == career1ToCompare) && careerNames.find(career => career == career2ToCompare)) {
      console.log(`/compara?carrer1=${career1ToCompare}&carrer2=${career2ToCompare}`);
      redirect(`/compara?carrer1=${career1ToCompare}&carrer2=${career2ToCompare}`)
    } else {
      alert('Carreras ingresadas incorrectamente')
    }
  }

  const handleOnChangeCareer1 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCareer1ToCompare(newValue)
    let filteredCareers = careersData.filter((career: CarrersData) =>
      career.CARRERA.toLowerCase().includes(career1ToCompare)
    );
    const resultsContainer = document.getElementById(`compare-results-1`);
    if (resultsContainer) {
      resultsContainer.innerHTML = ''
      filteredCareers.forEach((element: CarrersData) => {
        const div = document.createElement('div');
        div.classList.add('search-result');
        div.textContent = element.CARRERA;
        div.addEventListener(
          'click',
          () => {
            setCareer1ToCompare(element.CARRERA)
            filteredCareers = []
            resultsContainer.style.display = filteredCareers.length > 0 ? 'block' : 'none'
          });
        resultsContainer.appendChild(div);
      });
      resultsContainer.style.display = filteredCareers.length > 0 ? 'block' : 'none';
    }
  }

  const handleOnChangeCareer2 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCareer2ToCompare(newValue)
    let filteredCareers = careersData.filter((career: CarrersData) =>
      career.CARRERA.toLowerCase().includes(career2ToCompare)
    );
    const resultsContainer = document.getElementById(`compare-results-2`);
    if (resultsContainer) {
      resultsContainer.innerHTML = ''
      filteredCareers.forEach((element: CarrersData) => {
        const div = document.createElement('div');
        div.classList.add('search-result');
        div.textContent = element.CARRERA;
        div.addEventListener(
          'click',
          () => {
            setCareer2ToCompare(element.CARRERA)
            filteredCareers = []
            resultsContainer.style.display = filteredCareers.length > 0 ? 'block' : 'none';
          });
        resultsContainer.appendChild(div);
      });
      resultsContainer.style.display = filteredCareers.length > 0 ? 'block' : 'none';
    }
  }

  return (
    <section className="compare-section mt-4">
      <h2 className="section-title">Comparar Carreras</h2>
      <div className="compare-container">
        <div className="search-box">
          <label htmlFor="compare-search-1">Carrera 1</label>
          <input
            type="text"
            className="compare-search-input"
            id="compare-search-1"
            placeholder="Buscar carrera"
            value={career1ToCompare}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeCareer1(event)}
          />
          <div
            id="compare-results-1"
            className="compare-search-results"
          >
          </div>
        </div>
        <div className="search-box">
          <label htmlFor="compare-search-2">Carrera 2</label>
          <input
            type="text"
            className="compare-search-input"
            id="compare-search-2"
            placeholder="Buscar carrera"
            value={career2ToCompare}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeCareer2(event)}
          />
          <div
            className="compare-search-results"
            id="compare-results-2"
          >
          </div>
        </div>
        <button
          id="compare-button"
          onClick={() => handleOnClickCompare()}
        >
          Comparar
        </button>
      </div>
      {isComparing &&
        <div className="container">

          <div className="comparison-results">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Valor</th>
                  <th id="career1-name">
                    {carrer1Data?.CARRERA}
                  </th>
                  <th id="career2-name">
                    {carrer2Data?.CARRERA}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={3} className="section-header">¿Cuántos son?</th>
                </tr>
                <tr>
                  <td>Total de estudiantes</td>
                  <td id="total-students-1">
                    {formatNumber(carrer1Data?.TOTAL)}
                  </td>
                  <td id="total-students-2">
                    {formatNumber(carrer2Data?.TOTAL)}
                  </td>
                </tr>
                <tr>
                  <td>Porcentaje del total</td>
                  <td >{formatPercentage(carrer1Data?.PCT_TOTAL)}</td>
                  <td >{formatPercentage(carrer2Data?.PCT_TOTAL)}</td>
                </tr>
                <tr>
                  <td>Mujeres</td>
                  <td >{formatPercentage(carrer1Data?.PCT_MUJER)}</td>
                  <td >{formatPercentage(carrer2Data?.PCT_MUJER)}</td>
                </tr>
                <tr>
                  <td>Hombres</td>
                  <td >{formatPercentage(carrer1Data?.PCT_HOMBRE)}</td>
                  <td >{formatPercentage(carrer2Data?.PCT_HOMBRE)}</td>
                </tr>
                <tr>
                  <td>Menos de 30 años</td>
                  <td >{formatPercentage(carrer1Data?.PCT_30MENOS)}</td>
                  <td >{formatPercentage(carrer2Data?.PCT_30MENOS)}</td>
                </tr>
                <tr>
                  <td>30 o más años</td>
                  <td >{formatPercentage(carrer1Data?.PCT_30MAS)}</td>
                  <td >{formatPercentage(carrer2Data?.PCT_30MAS)}</td>
                </tr>
                <tr>
                  <td>Nuevos egresados</td>
                  <td >
                    {formatNumber(
                      parseInt(carrer1Data?.EGRESADOS_H || '-') +
                      parseInt(carrer1Data?.EGRESADOS_M || '-')
                    )}
                  </td>
                  <td >
                    {formatNumber(
                      parseInt(carrer2Data?.EGRESADOS_H || '-') +
                      parseInt(carrer2Data?.EGRESADOS_M || '-')
                    )}
                  </td>
                </tr>
               {/*  <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    Calidad de inversión
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="subsection-header"
                  >
                    Universidad pública
                  </td>
                </tr>
                <tr>
                  <td>
                    Calificación
                  </td>
                  <td >
                    {carrer1Data?.CI_PUB || '-'}
                  </td>
                  <td >
                    {carrer2Data?.CI_PUB || '-'}
                  </td>
                </tr>
                <tr>
                  <td>
                    Costo de educación
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.COSTO_TOTAL_PUBLICA)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.COSTO_TOTAL_PUBLICA)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="subsection-header"
                  >
                    Universidad privada
                  </td>
                </tr>
                <tr>
                  <td>
                    Calificación
                  </td>
                  <td >
                    {carrer1Data?.CI_PRI || '-'}
                  </td>
                  <td >
                    {carrer2Data?.CI_PRI || '-'}
                  </td>
                </tr>
                <tr>
                  <td>
                    Costo de educación
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.COSTO_TOTAL_PRIVADA)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.COSTO_TOTAL_PRIVADA)}`}
                  </td>
                </tr> */}
                <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    ¿En qué trabajan?
                  </td>
                </tr>
                <tr>
                  <td>
                    Tasa de ocupación
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.TASA_OCUPACION)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.TASA_OCUPACION)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Tasa de desempleo
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.TASA_DESOCUPACION)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.TASA_DESOCUPACION)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Tasa de informalidad
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.TASA_INFORMALIDAD)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.TASA_INFORMALIDAD)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    Posición que ocupan
                  </td>
                </tr>
                <tr>
                  <td>
                    Subordinado
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.POR_SUBORDINADO)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.POR_SUBORDINADO)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Empleador
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.POR_EMPLEADOR)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.POR_EMPLEADOR)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Cuenta propia
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.POR_CUENTAPROPIA)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.POR_CUENTAPROPIA)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Trabajo sin pago
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.POR_SIN_PAGO)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.POR_SIN_PAGO)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Probabilidad de obtener un empleo de calidad
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.PROB_EMPL_CAL)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.PROB_EMPL_CAL)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    ¿Cuánto ganan?
                  </td>
                </tr>
                <tr>
                  <td>
                    Salario promedio
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Ranking de ingreso
                  </td>
                  <td >
                    {`${formatNumber(carrer1Data?.RANK_INGRESO)}°`}
                  </td>
                  <td >
                    {`${formatNumber(carrer2Data?.RANK_INGRESO)}°`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Mujeres
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_M)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_M)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Hombres
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_H)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_H)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Menos de 30 años
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_30MENOS)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_30MENOS)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Más de 30 años
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_30MAS)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_30MAS)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Formales
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_FORMAL)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_FORMAL)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Informales
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_INFORMAL)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_INFORMAL)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    25% menos
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_Q25)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_Q25)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Mediana
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_Q50)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_Q50)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    25% más
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.INGRESO_Q75)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.INGRESO_Q75)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Porcentaje con posgrado
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.POR_POSGRADO)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.POR_POSGRADO)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Salario con posgrado
                  </td>
                  <td >
                    {`$${formatNumber(carrer1Data?.ING_POSG)}`}
                  </td>
                  <td >
                    {`$${formatNumber(carrer2Data?.ING_POSG)}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Incremento salarial con posgrado
                  </td>
                  <td >
                    {`${formatNumber(carrer1Data?.INCREMENTO_POSGRADO)}%`}
                  </td>
                  <td >
                    {`${formatNumber(carrer2Data?.INCREMENTO_POSGRADO)}%`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <SaberesBanner />
        </div>
      }
    </section>
  )
}


function formatNumber(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const num = parseFloat(value.toString());
  if (isNaN(num)) return '-';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {

    return Math.round(num).toLocaleString();

  }
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatPercentage(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const percentage = parseFloat(value.toString());
  return isNaN(percentage) ? '-' : `${(percentage * 100).toFixed(1)}%`;
}
