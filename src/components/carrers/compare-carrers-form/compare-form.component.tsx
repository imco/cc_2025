import React from 'react'

interface Props {
  isComparing: boolean,
  handleOnClickCompare: () => void
  carrersData: object[]
}

export default function CompareForm(props: Props) {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="input-group mb-3">
          {!props.isComparing &&
            <span className="input-group-text" id="basic-addon2">Carrera 1</span>
          }
          <input type="text" className="form-control" placeholder="Carrera 1" aria-label="Carrera 1" aria-describedby="basic-addon2" />
        </div>
        <div className="input-group mb-3">
          {!props.isComparing &&
            <span className="input-group-text" id="basic-addon2">Carrera 2</span>
          }
          <input type="text" className="form-control" placeholder="Carrera 2" aria-label="Carrera 2" aria-describedby="basic-addon2" />
        </div>
        <div className="flex justify-center">
          <button
            id="Compare"
            type="button"
            className="btn btn-primary"
            onClick={() => props.handleOnClickCompare()}
          >
            Comparar
          </button>
        </div>
      </div>
    </div>
  )
}
