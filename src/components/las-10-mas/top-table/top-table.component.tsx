"use client"
import { TopDescription } from "@/app/las-10-mas/[slug]/data.constans";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topData: object | string | any,
  actualTop: TopDescription | undefined
}

export default function TopTable(props: Props) {
  const processTopValue = (value: string) => {
    const isPagadas = props.actualTop?.jsonName.includes('pagadas');
    const containsRetorno = props.actualTop?.jsonName.includes('rsi_');
    return formatValue(value, isPagadas, containsRetorno)
  }

  const formatValue = (
    value: string,
    isPagadas: boolean = false,
    containsRetorno: boolean = false
  ) => {
    if (value === null || value === undefined) return '-';

    if (typeof value === 'string') return value;

    const numValue = parseFloat(value);

    if (isNaN(numValue)) return '-';

    if (numValue < 1 && numValue > -1) {
      // Convert to percentage
      return (numValue * 100).toFixed(1) + '%';
    } else if (numValue >= 1) {
      // Fixed to 2 decimal places
      if (isPagadas) {
        return '$' + Math.round(numValue).toLocaleString();
      }

      else if (containsRetorno) {
        return numValue.toFixed(1) + '%';
      }

      else {
        return numValue.toLocaleString();
      }

    } else {
      // For numbers less than -1, just return the fixed value
      return numValue.toFixed(1);
    }
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
      <table className="table table-striped mt-4 table-borderless">
        <thead>
          <tr>
            <td className="text-principal font-medium">Rango</td>
            <td className="text-principal font-medium">Carrera</td>
            <td className="text-principal font-medium">Valor</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.topData).slice(0, 10).map((key: string) => {
            const thirdColumnValue: string = processTopValue(props.topData[key][1])

            return (
              <tr key={key}>
                <td>{props.topData[key][0]}</td>
                <td>{key}</td>
                <td>
                  {thirdColumnValue}
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      <div className="row">
        <div className="col-12 col-md-4 offset-md-8 col-lg-3 offset-lg-9">
          <div className="flex justify-center md:justify-end">
            <a
              className="btn btn-primary text-lg font-medium md:w-full w-1/2"
              href={encodedUri}
              download={props.actualTop?.jsonName.replace('.json', '.csv')}
            >
              Descarga CSV
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
