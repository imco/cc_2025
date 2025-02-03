"use client"
import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

interface Props {
  isComparing: boolean,
  handleOnClickCompare: () => void
  carrersData: CarrersData[]
  seCarrersToCompare: Dispatch<SetStateAction<(string | null)[]>>
}

export default function CompareForm(props: Props) {
  const [carrer1, setCarrer1] = useState('')
  const [carrer2, setCarrer2] = useState('')

  const handleOnClickCompare = () => {
    props.seCarrersToCompare([carrer1, carrer2])
    props.seCarrersToCompare([carrer1, carrer2])
    console.log(carrer1, carrer2);
    props.handleOnClickCompare()
  }

  const handleOnChangeCarrer1 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCarrer1(newValue)
  }

  const handleOnChangeCarrer2 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCarrer2(newValue)
  }

  return (
    <>
      <datalist id="carrersList">
        {props.carrersData.map((carrer: CarrersData) => (
          <option value={carrer.CARRERA} key={carrer.CARRERA} />
        ))}
      </datalist>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="input-group mb-3">
            {!props.isComparing &&
              <span className="input-group-text" id="basic-addon2">Carrera 1</span>
            }
            <input type="text" className="form-control" placeholder="Carrera 1" aria-label="Carrera 1" aria-describedby="basic-addon2" list="carrersList" value={carrer1} onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeCarrer1(event)} />
          </div>
          <div className="input-group mb-3">
            {!props.isComparing &&
              <span className="input-group-text" id="basic-addon2">Carrera 2</span>
            }
            <input type="text" className="form-control" placeholder="Carrera 2" aria-label="Carrera 2" aria-describedby="basic-addon2" list="carrersList" value={carrer2} onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeCarrer2(event)} />
          </div>
          <div className="flex justify-center">
            <button
              id="Compare"
              type="button"
              className="btn btn-primary"
              onClick={() => handleOnClickCompare()}
            >
              Comparar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
