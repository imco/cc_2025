"use client"
import CarrersData from "@/interfaces/carrers/carrers-data.interface"

interface Props {
  carrersData: CarrersData[]
  carrerToCompare: (string | null)[]
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
            <td className="text-center">{carrer1?.CARRERA}</td>
            <td className="text-center">{carrer2?.CARRERA}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-bold text-center"
            >
              ¿Cuántos son?
            </td>
          </tr>
          <tr>
            <td>Total de estudiantes</td>
            <td className="text-center">{formatNumber(carrer1?.TOTAL)}</td>
            <td className="text-center">{formatNumber(carrer2?.TOTAL)}</td>
          </tr>
          <tr>
            <td>Porcentaje del total</td>
            <td className="text-center">{formatPercentage(carrer1?.PCT_TOTAL)}</td>
            <td className="text-center">{formatPercentage(carrer2?.PCT_TOTAL)}</td>
          </tr>
          <tr>
            <td>Mujeres</td>
            <td className="text-center">{formatPercentage(carrer1?.PCT_MUJER)}</td>
            <td className="text-center">{formatPercentage(carrer2?.PCT_MUJER)}</td>
          </tr>
          <tr>
            <td>Hombres</td>
            <td className="text-center">{formatPercentage(carrer1?.PCT_HOMBRE)}</td>
            <td className="text-center">{formatPercentage(carrer2?.PCT_HOMBRE)}</td>
          </tr>
          <tr>
            <td>Menos de 30 años</td>
            <td className="text-center">{formatPercentage(carrer1?.PCT_30MENOS)}</td>
            <td className="text-center">{formatPercentage(carrer2?.PCT_30MENOS)}</td>
          </tr>
          <tr>
            <td>30 o más años</td>
            <td className="text-center">{formatPercentage(carrer1?.PCT_30MAS)}</td>
            <td className="text-center">{formatPercentage(carrer2?.PCT_30MAS)}</td>
          </tr>
          <tr>
            <td>Nuevos egresados</td>
            <td className="text-center">
              {formatNumber(
                parseInt(carrer1?.EGRESADOS_H || '-') +
                parseInt(carrer1?.EGRESADOS_M || '-')
              )}
            </td>
            <td className="text-center">
              {formatNumber(
                parseInt(carrer2?.EGRESADOS_H || '-') +
                parseInt(carrer2?.EGRESADOS_M || '-')
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-bold text-center"
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
            <td className="text-center">
              {carrer1?.CI_PUB || '-'}
            </td>
            <td className="text-center">
              {carrer2?.CI_PUB || '-'}
            </td>
          </tr>
          <tr>
            <td>
              Costo de educación
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.COSTO_TOTAL_PUBLICA)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.COSTO_TOTAL_PUBLICA)}`}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-600 font-semibold italic text-center"
            >
              Universidad privada
            </td>
          </tr>
          <tr>
            <td>
              Calificación
            </td>
            <td className="text-center">
              {carrer1?.CI_PRI || '-'}
            </td>
            <td className="text-center">
              {carrer2?.CI_PRI || '-'}
            </td>
          </tr>
          <tr>
            <td>
              Costo de educación
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.COSTO_TOTAL_PRIVADA)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.COSTO_TOTAL_PRIVADA)}`}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-bold text-center"
            >
              ¿En qué trabajan?
            </td>
          </tr>
          <tr>
            <td>
              Tasa de ocupación
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.TASA_OCUPACION)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.TASA_OCUPACION)}`}
            </td>
          </tr>
          <tr>
            <td>
              Tasa de desempleo
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.TASA_DESOCUPACION)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.TASA_DESOCUPACION)}`}
            </td>
          </tr>
          <tr>
            <td>
              Tasa de informalidad
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.TASA_INFORMALIDAD)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.TASA_INFORMALIDAD)}`}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-bold text-center"
            >
              Posición que ocupan
            </td>
          </tr>
          <tr>
            <td>
              Subordinado
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.POR_SUBORDINADO)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.POR_SUBORDINADO)}`}
            </td>
          </tr>
          <tr>
            <td>
              Empleador
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.POR_EMPLEADOR)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.POR_EMPLEADOR)}`}
            </td>
          </tr>
          <tr>
            <td>
              Cuenta propia
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.POR_CUENTAPROPIA)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.POR_CUENTAPROPIA)}`}
            </td>
          </tr>
          <tr>
            <td>
              Trabajo sin pago
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.POR_SIN_PAGO)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.POR_SIN_PAGO)}`}
            </td>
          </tr>
          <tr>
            <td>
              Probabilidad de obtener un empleo de calidad
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.PROB_EMPL_CAL)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.PROB_EMPL_CAL)}`}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="text-blue-800 font-bold text-center"
            >
              ¿Cuánto ganan?
            </td>
          </tr>
          <tr>
            <td>
              Salario promedio
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO)}`}
            </td>
          </tr>
          <tr>
            <td>
              Ranking de ingreso
            </td>
            <td className="text-center">
              {`${formatNumber(carrer1?.RANK_INGRESO)}°`}
            </td>
            <td className="text-center">
              {`${formatNumber(carrer2?.RANK_INGRESO)}°`}
            </td>
          </tr>
          <tr>
            <td>
              Mujeres
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_M)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_M)}`}
            </td>
          </tr>
          <tr>
            <td>
              Hombres
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_H)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_H)}`}
            </td>
          </tr>
          <tr>
            <td>
              Menos de 30 años
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_30MENOS)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_30MENOS)}`}
            </td>
          </tr>
          <tr>
            <td>
              Más de 30 años
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_30MAS)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_30MAS)}`}
            </td>
          </tr>
          <tr>
            <td>
              Formales
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_FORMAL)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_FORMAL)}`}
            </td>
          </tr>
          <tr>
            <td>
              Informales
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_INFORMAL)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_INFORMAL)}`}
            </td>
          </tr>
          <tr>
            <td>
              25% menos
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_Q25)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_Q25)}`}
            </td>
          </tr>
          <tr>
            <td>
              Mediana
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_Q50)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_Q50)}`}
            </td>
          </tr>
          <tr>
            <td>
              25% más
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.INGRESO_Q75)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.INGRESO_Q75)}`}
            </td>
          </tr>
          <tr>
            <td>
              Porcentaje con posgrado
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer1?.POR_POSGRADO)}`}
            </td>
            <td className="text-center">
              {`${formatPercentage(carrer2?.POR_POSGRADO)}`}
            </td>
          </tr>
          <tr>
            <td>
              Salario con posgrado
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer1?.ING_POSG)}`}
            </td>
            <td className="text-center">
              {`$${formatNumber(carrer2?.ING_POSG)}`}
            </td>
          </tr>
          <tr>
            <td>
              Incremento salarial con posgrado
            </td>
            <td className="text-center">
              {`${formatNumber(carrer1?.INCREMENTO_POSGRADO)}%`}
            </td>
            <td className="text-center">
              {`${formatNumber(carrer2?.INCREMENTO_POSGRADO)}%`}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
