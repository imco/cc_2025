import CarrersData from "@/interfaces/carrers/carrers-data.interface"

interface Props {
  carrersData: CarrersData[]
}

export default function CompareTable(props: Props) {
  return (
    <main className="container">
      {props.carrersData.map((ele: CarrersData) => (
        <>
          {ele.CARRERA}
          <br />
        </>
      ))}
    </main>
  )
}
