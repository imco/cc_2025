import CarrersData from "@/interfaces/carrers/carrers-data.interface"

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")

  return carrersData.map((carrer: CarrersData) => ({
    slug: carrer.CARRERA.toLowerCase().replaceAll(" ", "_"),
  }))
}

export default async function Page({ params }: {
  params: Promise<{ slug: string }>
}) {
  const title = decodeURI((await params).slug)

  return (
    <div>{title}</div>
  )
}
