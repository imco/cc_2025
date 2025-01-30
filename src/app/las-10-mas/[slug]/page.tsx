import TopTable from "@/components/las-10-mas/top-table/top-table.component"
import { TopInfo, TopsLists } from "../data.constans"
import { TopDescription, TopsTypes } from "./data.constans"
import Link from "next/link"

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
    <main className="container-sm pt-6">

      <div className="row mb-3">
        <div className="col-s3">
          <Link href={"/las-10-mas"} className="text-principal text-sm">
            &larr; Volver a las 10 más
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-md shadow-blue-500/50 py-4 px-3">
            <div className="card-body">
              <h1
                className="card-title text-principal text-2xl text-center font-bold"
              >
                {actualTop?.name}
              </h1>
              <div className="mt-3 text-justify">
                <p className="card-text text-lg font-light">
                  {actualTop?.description}
                </p>
              </div>
              <TopTable topData={topData} actualTop={actualTop} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
