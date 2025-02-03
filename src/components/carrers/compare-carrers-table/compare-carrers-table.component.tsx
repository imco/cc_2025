interface Props {
  carrersData: object[]
}

export default function CompareTable(props: Props) {
  return (
    <main className="container">
      {props.carrersData.map((ele) => ele.CARRERA)}
    </main>
  )
}
