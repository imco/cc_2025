"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import CarrersData from "@/interfaces/carrers/carrers-data.interface"

type Props = {
  title: string
}

export default function CarrerInfo(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")
  const cleanTitle = () => {
    return props.title.toLocaleUpperCase().replaceAll("_", " ")
  }

  const carrerData: CarrersData = carrersData.find(
    (carrer: CarrersData) => carrer.CARRERA.toLowerCase().replaceAll(" ", "_") == props.title
  )
  return (
    <main className="container pt-8">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-2xl shadow-lg p-2">
            <div className="card-body text-center">
              <h1 className="card-title text-principal text-2xl font-bold">{cleanTitle()}</h1>
              <div className="mt-4">
                <h2 className="text-principal text-xl font-semibold">
                  ¿Cuántos son?
                </h2>
              </div>
              <div className="my-4">
                <span className="text-lg font-light">
                  Total nacional de personas que estudiaron esta carrera, por género y edad.
                </span>
              </div>
              <div className="row mt-2">
                <div className="col-12 col-md-3">
                  <div className="rounded-full bg-slate-100 h-full flex flex-col justify-center items-center px-1">
                    <span className="text-md font-light">
                      {formatNumber(carrerData.TOTAL)}
                    </span>
                    <span className="text-md font-light">
                      personas estudiaron la carrera
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="rounded-full bg-slate-100 h-full flex flex-col justify-center items-center px-1">
                    <span className="text-md font-light">
                      {formatPercentage(carrerData.PCT_TOTAL)}
                    </span>
                    <span className="text-md font-light">
                      del total de personas con carrera
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <Doughnut data={{
                    labels: ['Hombres', 'Mujeres'],
                    datasets: [
                      {
                        label: 'Distribución por género',
                        data: [carrerData.PCT_HOMBRE, carrerData.PCT_MUJER],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                      }
                    ]
                  }}
                  />
                </div>
                <div className="col-12 col-md-3">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function formatNumber(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const num = parseFloat(value.toString());
  if (isNaN(num)) return '-';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {

    return Math.round(num).toLocaleString();

  }
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatPercentage(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const percentage = parseFloat(value.toString());
  return isNaN(percentage) ? '-' : `${(percentage * 100).toFixed(1)}%`;
}
