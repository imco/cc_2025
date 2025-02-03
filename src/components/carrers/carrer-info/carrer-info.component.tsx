"use client"
import Link from 'next/link';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

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
    <main className="container pt-6">
      <div className="row mb-3">
        <div className="col-s3">
          <Link href={"/"} className="text-principal text-sm">
            &larr; Volver a incio
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card rounded-2xl shadow-lg p-2 mb-4">
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
                <div className="col-12 col-md-3 flex items-center justify-center mb-4">
                  <div className="rounded-full bg-slate-100 h-full flex flex-col justify-center items-center px-4 py-3">
                    <span className="text-md font-light">
                      {formatNumber(carrerData.TOTAL)}
                    </span>
                    <span className="text-md font-light">
                      personas estudiaron la carrera
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-3 flex items-center justify-center mb-4">
                  <div className="rounded-full bg-slate-100 h-full flex flex-col justify-center items-center px-4 py-3">
                    <span className="text-md font-light">
                      {formatPercentage(carrerData.PCT_TOTAL)}
                    </span>
                    <span className="text-md font-light">
                      del total de personas con carrera
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-3 flex items-center justify-center mb-4">
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
                <div className="col-12 col-md-3 flex items-center justify-center mb-4">
                  <Doughnut data={{
                    labels: ['Menores de 30', 'Mayores de 30'],
                    datasets: [
                      {
                        label: 'Distribución por edad',
                        data: [carrerData.PCT_30MENOS, carrerData.PCT_30MAS],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(99, 255, 133, 0.2)',
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(99, 255, 133, 1)',
                        ],
                        borderWidth: 1,
                      }
                    ]
                  }}
                  />
                </div>
              </div>
              <div className="pt-12">
                <h2 className="text-principal text-xl font-semibold">
                  Nuevos egresados al mercado laboral
                </h2>
              </div>
              <div className="my-4">
                <span className="text-lg font-light">
                  {formatNumber(parseInt(carrerData.EGRESADOS_H) + parseInt(carrerData.EGRESADOS_M))}
                </span>
              </div>
              <div className="pt-6">
                <h2 className="text-principal text-xl font-semibold">
                  Calidad de inversión
                </h2>
              </div>
              <div className="my-4">
                <span className="text-lg font-light">
                  Calificación asociada a cada carrera tomando en cuenta el costo de educación y el riesgo.
                </span>
              </div>
              <div className="row">
                <div className="col-s12 col-md-6 mb-4">
                  <div className="card rounded-2xl">
                    <div className="card-body">
                      <span className="card-title text-principal font-semibold text-lg">
                        Universidad pública
                      </span>
                      <div className="mt-3">
                        <span className='font-light text-base"'>
                          <strong>Calidad de inversión:</strong> {carrerData.CI_PUB}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className='font-light text-base"'>
                          <strong>Costo de educación:</strong> {`$${formatNumber(carrerData.COSTO_TOTAL_PUBLICA)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-s12 col-md-6 mb-4">
                  <div className="card rounded-2xl">
                    <div className="card-body">
                      <span className="card-title text-principal font-semibold text-lg">
                        Universidad privada
                      </span>
                      <div className="mt-3">
                        <span className='font-light text-base"'>
                          <strong>Calidad de inversión:</strong> {carrerData.CI_PRI}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className='font-light text-base"'>
                          <strong>Costo de educación:</strong> {`$${formatNumber(carrerData.COSTO_TOTAL_PRIVADA)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <h2 className="text-principal text-xl font-semibold">
                  En qué trabajan
                </h2>
              </div>
              <div className="my-4">
                <span className="text-lg font-light">
                  Principales características laborales como participación laboral, desempleo, informalidad y sectores en los que se desempeñan.
                </span>
              </div>
              <div className="row">
                <div className="col-s12 col-md-4 flex flex-col justify-center items-center">
                  <div className="pt-6">
                    <h3 className="text-principal text-lg font-semibold">
                      Tasa de ocupación
                    </h3>
                  </div>
                  <div className="my-4">
                    <span className="text-lg font-light">
                      {`${formatPercentage(carrerData.TASA_OCUPACION)}`}
                    </span>
                  </div>
                </div>
                <div className="col-s12 col-md-4 flex flex-col justify-center items-center">
                  <div className="pt-6">
                    <h3 className="text-principal text-lg font-semibold">
                      Tasa de desempleo
                    </h3>
                  </div>
                  <div className="my-4">
                    <span className="text-lg font-light">
                      {`${formatPercentage(carrerData.TASA_DESOCUPACION)}`}
                    </span>
                  </div>
                </div>
                <div className="col-s12 col-md-4 flex flex-col justify-center items-center">
                  <div className="pt-6">
                    <h3 className="text-principal text-lg font-semibold">
                      Tasa de informalidad
                    </h3>
                  </div>
                  <div className="my-4">
                    <span className="text-lg font-light">
                      {`${formatPercentage(carrerData.TASA_INFORMALIDAD)}`}
                    </span>
                  </div>
                </div>
                <div className="col-12 flex flex-col justify-center items-center mt-4 h-96 mb-6">
                  <div className="py-6">
                    <h2 className="text-principal text-xl font-semibold">
                      Principales sectores en los que trabajan
                    </h2>
                  </div>
                  <Pie data={{
                    labels: ['Servicios profesionales, financieros y corporativos', 'Gobierno y organismos internacionales', 'Servicios sociales', 'Servicios diversos', 'Comercio', 'Agricultura y ganadería', 'Construcción', 'Industria extractiva', 'Industria manufacturera', 'Restaurantes y alojamientos', 'Transportes y comunicaciones'],
                    datasets: [
                      {
                        label: 'Principales sectores en los que trabajan',
                        data: [
                          carrerData.POR_SERVPROFESIONALES,
                          carrerData.POR_GOBIERNO_1,
                          carrerData.POR_SERVSOCIALES,
                          carrerData.POR_SERVDIVERSOS,
                          carrerData.POR_COMERCIO,
                          carrerData.POR_AGRICULTURA,
                          carrerData.POR_GOBIERNO,
                          carrerData.POR_EXTRACTIVA,
                          carrerData.POR_MANUFACTURA,
                          carrerData.POR_RESTAURANTES,
                          carrerData.POR_TRANSPORTES
                        ],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(157, 175, 64, 0.2)',
                          'rgba(255, 193, 99, 0.2)',
                          'rgba(255, 142, 204, 0.2)',
                          'rgba(223, 68, 254, 0.2)',
                          'rgba(16, 23, 247, 0.2)',
                          'rgba(16, 189, 247, 0.2)',
                          'rgba(7, 251, 182, 0.2)',
                          'rgba(7, 251, 23, 0.2)',
                          'rgba(161, 251, 7, 0.2)'
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(157, 175, 64, 1)',
                          'rgba(255, 193, 99, 1)',
                          'rgba(255, 142, 204, 1)',
                          'rgba(223, 68, 254, 1)',
                          'rgba(16, 23, 247, 1)',
                          'rgba(16, 189, 247, 1)',
                          'rgba(7, 251, 182, 1)',
                          'rgba(7, 251, 23, 1)',
                          'rgba(161, 251, 7, 1)'
                        ],
                        borderWidth: 1,
                      }
                    ]
                  }}
                  />
                </div>
              </div>
              <div className="py-12">
                <h2 className="text-principal text-xl font-semibold">
                  Posición que ocupan
                </h2>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 flex flex-col justify-center items-center">
                  <h3 className="text-principal text-lg font-semibold">
                    Probabilidad de obtener un empleo de calidad
                  </h3>
                  <br />
                  <span className='text-xl font-bold'>
                    {`${formatPercentage(carrerData.PROB_EMPL_CAL)}`}
                  </span>
                </div>
                <div className="col-12 col-md-6 flex flex-col justify-center items-center h-72">
                  <Doughnut data={{
                    labels: ['Subordinado', 'Empleador', 'Cuenta propia', 'Trabajo sin pago'],
                    datasets: [
                      {
                        label: 'Distribución por edad',
                        data: [
                          carrerData.POR_SUBORDINADO,
                          carrerData.POR_EMPLEADOR,
                          carrerData.POR_CUENTAPROPIA,
                          carrerData.POR_SIN_PAGO
                        ],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(99, 255, 133, 0.2)',
                          'rgba(255, 193, 99, 0.2)',
                          'rgba(223, 68, 254, 0.2)',
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(99, 255, 133, 1)',
                          'rgba(255, 193, 99, 1)',
                          'rgba(223, 68, 254, 1)',
                        ],
                        borderWidth: 1,
                      }
                    ]
                  }}
                  />
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
