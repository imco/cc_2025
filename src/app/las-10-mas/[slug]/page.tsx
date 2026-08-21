import TopDetail, { TopPlano } from "@/components/las-10-mas/top-detail/top-detail.component"
import { TopInfo, TopsLists } from "../data.constans"
import { TopDescription, TopsTypes } from "./data.constans"

// páginas: los tops del grid más sus contrapartes "Los 10 menos"
export async function generateStaticParams() {
  const slugs = new Set<string>()
  TopsLists.forEach((top: TopInfo) => {
    slugs.add(top.titleUrl)
    const pareja = TopsTypes.find(t => t.titleUrl === top.titleUrl)?.pareja
    if (pareja) slugs.add(pareja)
  })
  return [...slugs].map(slug => ({ slug }))
}

const aPlano = (top: TopDescription): TopPlano => ({
  name: top.name,
  titleUrl: top.titleUrl,
  jsonName: top.jsonName,
  description: top.description,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  data: require(`@/components/las-10-mas/top/${top.jsonName}`),
})

export default async function Page({ params }: {
  params: Promise<{ slug: string }>
}) {
  const title = (await params).slug

  const actualTop: TopDescription | undefined = TopsTypes.find(
    (top: TopDescription) => top.titleUrl === title
  )
  if (!actualTop) return null

  const pareja: TopDescription | undefined = actualTop.pareja
    ? TopsTypes.find((top: TopDescription) => top.titleUrl === actualTop.pareja)
    : undefined

  // el componente recibe siempre el lado "más" como base y el "menos" como contraparte
  const topMas = actualTop.lado === "menos" && pareja ? pareja : actualTop
  const topMenos = actualTop.lado === "menos" ? actualTop : pareja

  return (
    <TopDetail
      mas={aPlano(topMas)}
      menos={topMenos ? aPlano(topMenos) : null}
      inicial={actualTop.lado === "menos" ? "menos" : "mas"}
    />
  )
}
