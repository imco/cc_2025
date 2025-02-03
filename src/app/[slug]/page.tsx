import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import CarrerInfo from '@/components/carrers/carrer-info/carrer-info.component';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")

export async function generateStaticParams() {
  return carrersData.map((carrer: CarrersData) => ({
    slug: carrer.CARRERA.toLowerCase().replaceAll(" ", "_"),
  }))
}

export default async function Page({ params }: {
  params: Promise<{ slug: string }>
}) {
  const title = decodeURI((await params).slug)

  return (
    <>
      <CarrerInfo title={title} />
    </>
  )
}
