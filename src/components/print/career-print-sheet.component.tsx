"use client"
import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import PrintSheetHeader from "./print-sheet-header.component"

// Hoja imprimible de una carrera: tabla simple con todos los indicadores.
// Solo visible al imprimir (reemplaza a la vista de pantalla en el PDF).

const num = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === "") return "-"
  const n = parseFloat(String(value))
  return isNaN(n) ? "-" : Math.round(n).toLocaleString()
}

const pct = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === "") return "-"
  const n = parseFloat(String(value))
  return isNaN(n) ? "-" : `${(n * 100).toFixed(1)}%`
}

const dinero = (value: number | string | undefined) => {
  const n = num(value)
  return n === "-" ? "-" : `$${n}`
}

type Props = {
  carrerData: CarrersData
  sectores: { name: string; value: number }[]
}

export default function CareerPrintSheet({ carrerData, sectores }: Props) {
  const c = carrerData
  const egresados = parseInt(String(c.EGRESADOS_H)) + parseInt(String(c.EGRESADOS_M))

  const secciones: [string, [string, string][]][] = [
    ["¿Cuántos son?", [
      ["Total de personas que estudiaron esta carrera", num(c.TOTAL)],
      ["Porcentaje del total de personas con carrera", pct(c.PCT_TOTAL)],
      ["Mujeres", pct(c.PCT_MUJER)],
      ["Hombres", pct(c.PCT_HOMBRE)],
      ["Menores de 30 años", pct(c.PCT_30MENOS)],
      ["Mayores de 30 años", pct(c.PCT_30MAS)],
      ["Nuevos egresados al mercado laboral", isNaN(egresados) ? "-" : egresados.toLocaleString()],
    ]],
    ["¿En qué trabajan?", [
      ["Tasa de ocupación", pct(c.TASA_OCUPACION)],
      ["Tasa de desempleo", pct(c.TASA_DESOCUPACION)],
      ["Tasa de informalidad", pct(c.TASA_INFORMALIDAD)],
      ...sectores.map(s => [`Sector: ${s.name}`, `${s.value.toFixed(1)}%`] as [string, string]),
    ]],
    ["Posición que ocupan", [
      ["Subordinado", pct(c.POR_SUBORDINADO)],
      ["Empleador", pct(c.POR_EMPLEADOR)],
      ["Cuenta propia", pct(c.POR_CUENTAPROPIA)],
      ["Trabajo sin pago", pct(c.POR_SIN_PAGO)],
      ["Probabilidad de obtener un empleo de calidad", pct(c.PROB_EMPL_CAL)],
    ]],
    ["¿Cuánto ganan?", [
      ["Salario promedio mensual", dinero(c.INGRESO)],
      ["Ranking de ingreso", c.RANK_INGRESO && c.RANK_INGRESO !== "NA" ? `${c.RANK_INGRESO}°` : "-"],
      ["25% de los profesionistas gana menos de", dinero(c.INGRESO_Q25)],
      ["Mediana salarial", dinero(c.INGRESO_Q50)],
      ["25% de los profesionistas gana más de", dinero(c.INGRESO_Q75)],
      ["Salario de mujeres", dinero(c.INGRESO_M)],
      ["Salario de hombres", dinero(c.INGRESO_H)],
      ["Salario de menores de 30 años", dinero(c.INGRESO_30MENOS)],
      ["Salario de mayores de 30 años", dinero(c.INGRESO_30MAS)],
      ["Salario en empleo formal", dinero(c.INGRESO_FORMAL)],
      ["Salario en empleo informal", dinero(c.INGRESO_INFORMAL)],
      ["Con posgrado", pct(c.POR_POSGRADO)],
      ["Salario promedio con posgrado", dinero(c.ING_POSG)],
      ["Incremento salarial con posgrado vs. licenciatura", c.INCREMENTO_POSGRADO && c.INCREMENTO_POSGRADO !== "NA" ? `${parseFloat(String(c.INCREMENTO_POSGRADO)).toFixed(1)}%` : "-"],
    ]],
  ]

  return (
    <div className="print-only print-sheet">
      <PrintSheetHeader />
      <h1 className="print-sheet-title">{c.CARRERA}</h1>
      <table className="print-table">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {secciones.map(([seccion, filas]) => (
            [
              <tr key={seccion} className="print-section-row">
                <th colSpan={2}>{seccion}</th>
              </tr>,
              ...filas.map(([etiqueta, valor]) => (
                <tr key={seccion + etiqueta}>
                  <td>{etiqueta}</td>
                  <td>{valor}</td>
                </tr>
              )),
            ]
          ))}
        </tbody>
      </table>
    </div>
  )
}
