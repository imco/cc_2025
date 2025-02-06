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
    <>
      <div id="top10-modal" className="">
        <div className="modal-conten">
          <div className="back-option mb-4">
            <Link href={"/las-10-mas"} className="text-white text-sm mb-5">
              &larr; Volver a las 10 más
            </Link>
          </div>
          <h3 id="modal-title">{actualTop?.name}</h3>
          <div id="modal-data">
            <div className="mt-3 text-justify">
              <p className="card-text text-lg font-light">
                {actualTop?.description}
              </p>
            </div>
            <TopTable topData={topData} actualTop={actualTop} />
          </div>
        </div>
      </div>
    </>
  )
}
