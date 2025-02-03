"use client"
import CarrersData from "@/interfaces/carrers/carrers-data.interface"

interface Props {
  carrersData: CarrersData[]
  carrerToCompare: string[]
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

export default function CompareTable(props: Props) {
  const carrer1: CarrersData | undefined = props.carrersData.find(
    (carrerData: CarrersData) => props.carrerToCompare[0] === carrerData.CARRERA
  )
  const carrer2: CarrersData | undefined = props.carrersData.find(
    (carrerData: CarrersData) => props.carrerToCompare[1] === carrerData.CARRERA
  )
  return (
    <main className="container">
      <table className="table table-striped table-borderless">
        <thead>
          <tr className="font-bold text-lg">
            <td colSpan={1}></td>
            <td>{carrer1?.CARRERA}</td>
            <td>{carrer2?.CARRERA}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-semibold text-center"
            >
              ¿Cuántos son?
            </td>
          </tr>
          <tr>
            <td>Total de estudiantes</td>
            <td>{formatNumber(carrer1?.TOTAL)}</td>
            <td>{formatNumber(carrer2?.TOTAL)}</td>
          </tr>
          <tr>
            <td>Porcentaje del total</td>
            <td>{formatPercentage(carrer1?.PCT_TOTAL)}</td>
            <td>{formatPercentage(carrer2?.PCT_TOTAL)}</td>
          </tr>
          <tr>
            <td>Mujeres</td>
            <td>{formatPercentage(carrer1?.PCT_MUJER)}</td>
            <td>{formatPercentage(carrer2?.PCT_MUJER)}</td>
          </tr>
          <tr>
            <td>Hombres</td>
            <td>{formatPercentage(carrer1?.PCT_HOMBRE)}</td>
            <td>{formatPercentage(carrer2?.PCT_HOMBRE)}</td>
          </tr>
          <tr>
            <td>Menos de 30 años</td>
            <td>{formatPercentage(carrer1?.PCT_30MENOS)}</td>
            <td>{formatPercentage(carrer2?.PCT_30MENOS)}</td>
          </tr>
          <tr>
            <td>30 o más años</td>
            <td>{formatPercentage(carrer1?.PCT_30MAS)}</td>
            <td>{formatPercentage(carrer2?.PCT_30MAS)}</td>
          </tr>
          <tr>
            <td>Nuevos egresados</td>
            <td>
              {formatNumber(
                parseInt(carrer1?.EGRESADOS_H) +
                parseInt(carrer1?.EGRESADOS_M)
              )}
            </td>
            <td>
              {formatNumber(
                parseInt(carrer2?.EGRESADOS_H) +
                parseInt(carrer2?.EGRESADOS_M)
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-semibold text-center"
            >
              Calidad de inversión
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-600 font-semibold italic text-center"
            >
              Universidad pública
            </td>
          </tr>
          <tr>
            <td>
              Calificación
            </td>
            <td>
              {carrer1?.CI_PUB || '-'}
            </td>
            <td>
              {carrer2?.CI_PUB || '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
