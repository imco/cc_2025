"use client"
import Image from "next/image"
import { ChangeEvent, useState } from "react";
import { redirect } from "next/navigation"

import homeImage from "@/assets/images/CC_LogoHome_Editado.png"
import CarrersData from "@/interfaces/carrers/carrers-data.interface";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")

  const [carrer, setCarrer] = useState('')

  const handleOnClickSearch = () => {
    if (carrersData.find((_carrer: CarrersData) => carrer == _carrer.CARRERA))
      redirect(`/${carrer.toLowerCase().replaceAll(" ", "_")}`)
    else
      alert('Carrera no encontrada')
  }

  const handleOnChangeInputCarrer = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCarrer(newValue)
  }

  return (
    <>
      <datalist id="carrersList">
        {carrersData.map((carrer: CarrersData) => (
          <option value={carrer.CARRERA} key={carrer.CARRERA} />
        ))}
      </datalist>
      <main className="container h-90-screen">
        <div className="flex flex-col justify-center items-center h-4/5">
          <div className="card shadow-lg p-2 w-4/5 rounded-2xl">
            <div className="card-body">
              <div className="flex flex-col justify-center items-center align-middle">
                <Image
                  src={homeImage.src}
                  width={homeImage.width}
                  height={homeImage.height * 0.9}
                  className="image-blue-filter img-fluid"
                  alt="Logo de Compara carreras"
                />
                <div className="text-center mt-8">
                  <span className="text-2xl font-semibold text-principal">
                    Descubre información relevante sobre más de 60 carreras universitarias. Compara salarios, oportunidades laborales y más para tomar la mejor decisión.
                  </span>
                </div>
                <div className="row w-full mt-8">
                  <div className="col-md-8 offset-md-2">
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Busca tu carrera"
                        aria-label="Busca tu carrera"
                        aria-describedby="input for search your dreamed carrer"
                        list="carrersList"
                        value={carrer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeInputCarrer(event)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        id="Search"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleOnClickSearch()}
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
