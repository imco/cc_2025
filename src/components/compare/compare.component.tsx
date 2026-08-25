"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import SaberesBanner from '@/components/saberes/saberes-banner.component'
import PrintButton from '@/components/print/print-button.component'
import PrintSheetHeader from '@/components/print/print-sheet-header.component'
import ShareButtons from '@/components/share/share-buttons.component'
import CareerAutocomplete from '@/components/search/career-autocomplete.component'
import { CarrerAlias } from '@/components/search/carrer-alias.data'
import { UsersIcon, BriefcaseIcon, SitemapIcon, BanknoteIcon } from '@/components/icons'


export default function Compare() {
  const [isComparing, setIsComparing] = useState(false)

  const [career1ToCompare, setCareer1ToCompare] = useState('')
  const [career2ToCompare, setCareer2ToCompare] = useState('')

  const router = useRouter()
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
      // GA4: qué pares de carreras se comparan
      window.gtag?.("event", "compare_careers", {
        carrera_1: carrer1,
        carrera_2: carrer2,
      })
    }
  }, [carrer1, carrer2])

  const handleOnClickCompare = () => {
    if (careerNames.find(career => career == career1ToCompare) && careerNames.find(career => career == career2ToCompare)) {
      // redirect() de next/navigation no funciona en event handlers de cliente (lanza NEXT_REDIRECT sin manejar en el export estático)
      router.push(`/compara?carrer1=${encodeURIComponent(career1ToCompare)}&carrer2=${encodeURIComponent(career2ToCompare)}`)
    } else {
      alert('Carreras ingresadas incorrectamente')
    }
  }

  return (
    <section className={`compare-section mt-4${isComparing ? '' : ' compare-centrada'}`}>
      <h1 className="section-title">Comparar Carreras</h1>
      {/* anuncio para lectores de pantalla cuando carga una comparación */}
      <div role="status" className="sr-only">
        {isComparing && carrer1 && carrer2 ? `Comparando ${carrer1} con ${carrer2}` : ""}
      </div>
      <div className="compare-container">
        <div className="search-box">
          <label htmlFor="compare-search-1">Carrera 1</label>
          <CareerAutocomplete
            opciones={careerNames}
            alias={CarrerAlias}
            value={career1ToCompare}
            onChange={setCareer1ToCompare}
            onSelect={setCareer1ToCompare}
            inputId="compare-search-1"
            inputClassName="compare-search-input"
            placeholder="Buscar carrera"
          />
        </div>
        <div className="search-box">
          <label htmlFor="compare-search-2">Carrera 2</label>
          <CareerAutocomplete
            opciones={careerNames}
            alias={CarrerAlias}
            value={career2ToCompare}
            onChange={setCareer2ToCompare}
            onSelect={setCareer2ToCompare}
            inputId="compare-search-2"
            inputClassName="compare-search-input"
            placeholder="Buscar carrera"
          />
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
          <PrintSheetHeader />
          <div className="print-button-row con-compartir">
            <ShareButtons
              texto={`${carrer1} vs ${carrer2}: compara salarios y empleo en Compara Carreras del IMCO.`}
            />
            <PrintButton etiqueta="Descargar comparación en PDF" />
          </div>
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
                  <th colSpan={3} className="section-header">
                    <span className="section-title-icon"><UsersIcon size={20} /></span>
                    ¿Cuántos son?
                  </th>
                </tr>
                <tr>
                  <td>Total de personas que estudiaron esta carrera</td>
                  <td id="total-students-1">
                    {formatNumber(carrer1Data?.TOTAL)}
                  </td>
                  <td id="total-students-2">
                    {formatNumber(carrer2Data?.TOTAL)}
                  </td>
                </tr>
                <tr>
                  <td>Porcentaje de las personas que estudiaron esta carrera</td>
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
                    {conSigno(carrer1Data?.COSTO_TOTAL_PUBLICA, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.COSTO_TOTAL_PUBLICA, '$')}
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
                    {conSigno(carrer1Data?.COSTO_TOTAL_PRIVADA, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.COSTO_TOTAL_PRIVADA, '$')}
                  </td>
                </tr> */}
                <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    <span className="section-title-icon"><BriefcaseIcon size={20} /></span>
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
                  <td>
                    ¿Cuántos trabajan en lo que estudiaron?
                  </td>
                  <td >
                    {`${formatPercentage(carrer1Data?.TASA_APLICACION)}`}
                  </td>
                  <td >
                    {`${formatPercentage(carrer2Data?.TASA_APLICACION)}`}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="section-header"
                  >
                    <span className="section-title-icon"><SitemapIcon size={20} /></span>
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
                    <span className="section-title-icon"><BanknoteIcon size={20} /></span>
                    ¿Cuánto ganan?
                  </td>
                </tr>
                <tr>
                  <td>
                    Salario promedio
                  </td>
                  <td >
                    {conSigno(carrer1Data?.INGRESO, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.INGRESO, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Ranking de ingreso
                  </td>
                  <td >
                    {conSigno(carrer1Data?.RANK_INGRESO, '', '°')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.RANK_INGRESO, '', '°')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Mujeres
                  </td>
                  <td >
                    {conSigno(carrer1Data?.INGRESO_M, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.INGRESO_M, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Hombres
                  </td>
                  <td >
                    {conSigno(carrer1Data?.INGRESO_H, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.INGRESO_H, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Formales
                  </td>
                  <td >
                    {conSigno(carrer1Data?.INGRESO_FORMAL, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.INGRESO_FORMAL, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Informales
                  </td>
                  <td >
                    {conSigno(carrer1Data?.INGRESO_INFORMAL, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.INGRESO_INFORMAL, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Salario con posgrado
                  </td>
                  <td >
                    {conSigno(carrer1Data?.ING_POSG, '$')}
                  </td>
                  <td >
                    {conSigno(carrer2Data?.ING_POSG, '$')}
                  </td>
                </tr>
                <tr>
                  <td>
                    Incremento salarial con posgrado vs. licenciatura
                  </td>
                  <td >
                    {unDecimalPct(carrer1Data?.INCREMENTO_POSGRADO)}
                  </td>
                  <td >
                    {unDecimalPct(carrer2Data?.INCREMENTO_POSGRADO)}
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


// evita "$-" o "-%" cuando no hay dato
function conSigno(value: number | string | undefined, prefijo = '', sufijo = '') {
  const n = formatNumber(value);
  return n === '-' ? '-' : `${prefijo}${n}${sufijo}`;
}

// incremento con un decimal, como el resto de los porcentajes
function unDecimalPct(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const num = parseFloat(value.toString());
  return isNaN(num) ? '-' : `${num.toFixed(1)}%`;
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
