"use client"
import Link from "next/link";
import { TopDescription } from "@/app/las-10-mas/[slug]/data.constans";
import ShareButtons from "@/components/share/share-buttons.component";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topData: object | string | any,
  actualTop: TopDescription | undefined
}

export default function TopTable(props: Props) {
  const processTopValue = (value: string) => {
    const jsonName = props.actualTop?.jsonName ?? '';
    const isPagadas = jsonName.includes('pagadas');
    // tops de conteo (personas): sin signo de porcentaje; ojo: los de
    // mujeres/hombres en nuevo ingreso sí son porcentajes
    const isConteo = jsonName.includes('matricula')
      || jsonName.includes('numero')
      || jsonName.includes('mas_nuevo_ingresos')
      || jsonName.includes('menos_nuevo_ingresos');
    return formatValue(value, isPagadas, isConteo)
  }

  const formatValue = (
    value: string,
    isPagadas: boolean = false,
    isConteo: boolean = false
  ) => {
    if (value === null || value === undefined) return '-';

    if (typeof value === 'string') return value;

    const numValue = parseFloat(value);

    if (isNaN(numValue)) return '-';

    if (isPagadas) {
      return '$' + Math.round(numValue).toLocaleString();
    }

    if (isConteo) {
      return Math.round(numValue).toLocaleString();
    }

    // el resto de los tops son porcentajes; la base los entrega en escala 0-100
    return numValue.toFixed(1) + '%';
  }


  const csvContent = "data:text/csv;charset=utf-8,"
    + "Rank,Career,Value\n"
    + Object.keys(props.topData).slice(0, 10).map((key: string) => {
      const thirdColumnValue: string = processTopValue(props.topData[key][1])
      return `${props.topData[key][0]},"${key}","${thirdColumnValue}"`
    }
    ).join("\n")

  const encodedUri = encodeURI(csvContent);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Rango</th>
            <th>Carrera</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.topData).slice(0, 10).map((key: string) => {
            const thirdColumnValue: string = processTopValue(props.topData[key][1])

            return (
              <tr key={key}>
                <td>{props.topData[key][0]}</td>
                <td>
                  <Link
                    href={'/' + key.toLowerCase().replaceAll(' ', '_')}
                    className="top-career-link"
                  >
                    {key}
                  </Link>
                </td>
                <td>
                  {thirdColumnValue}
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      <div className="print-button-row con-compartir mt-4">
        <ShareButtons
          texto={`${props.actualTop?.name ?? 'Las 10 más'} en Compara Carreras del IMCO.`}
        />
        <a
          className="download-btn"
          href={encodedUri}
          download={props.actualTop?.jsonName.replace('.json', '.csv')}
          onClick={() => window.gtag?.("event", "file_download", {
            file_name: props.actualTop?.jsonName.replace('.json', '.csv'),
            file_extension: "csv",
            top: props.actualTop?.name,
          })}
        >
          Descarga CSV
        </a>
      </div>
    </>
  )
}
