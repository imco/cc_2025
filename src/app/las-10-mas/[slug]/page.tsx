import { TopInfo, TopsLists } from "../data.constans"
import { TopDescription, TopsTypes } from "./data.constans"

export async function generateStaticParams() {
  return TopsLists.map((top: TopInfo) => ({
    slug: top.titleUrl,
  }))
}

export default async function Page({ params }: {
  params: Promise<{ slug: string }>
}) {
  const title = (await params).slug

  const actualTop: TopDescription | undefined = TopsTypes.find(
    (top: TopDescription) => top.titleUrl === title
  )

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const topData = require(`@/components/las-10-mas/top/${actualTop?.jsonName}`)

  return (
    <main className="container-sm pt-10">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-md shadow-blue-500/50 py-4 px-3">
            <div className="card-body">
              <h1
                className="card-title text-principal text-2xl text-center font-bold"
              >
                {actualTop?.name}
              </h1>
              <div className="mt-3">
                <p className="card-text text-lg font-light">
                  {actualTop?.description}
                </p>
              </div>
              <table className="table table-striped mt-4 table-borderless">
                <thead>
                  <tr>
                    <td className="text-principal font-medium">Rango</td>
                    <td className="text-principal font-medium">Carrera</td>
                    <td className="text-principal font-medium">Valor</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(topData).slice(0, 10).map((key: string) => {
                    let thirdColumnValue: string | number = Number(topData[key][1])
                    if (thirdColumnValue) {
                      if (!Number.isInteger(thirdColumnValue))
                        thirdColumnValue = `${Math.round(topData[key][1] * 1000) / 10}%`
                    } else {
                      thirdColumnValue = topData[key][1]
                    }
                    return (
                      <tr key={key}>
                        <td>{topData[key][0]}</td>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
