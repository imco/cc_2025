"use client"
import Link from 'next/link';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

import CarrersData from "@/interfaces/carrers/carrers-data.interface"
import { useEffect } from 'react';

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

  useEffect(() => {
    const updateQualityDots = (elementId: string, quality: string | number) => {
      const dotsContainer = document.getElementById(elementId);
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        const qualities = ['Muy Insegura', 'Insegura', 'Buena', 'Excelente'];
        const colors = ['#c03144', '#FFC107', '#2196F3', '#4CAF50'];
        const index = qualities.indexOf(quality.toString());

        for (let i = 0; i < 4; i++) {
          const dot = document.createElement('span');
          dot.className = 'dot';
          dot.style.backgroundColor = i === index ? colors[i] : '#FFFFFF';
          dot.style.display = 'inline-block';
          dot.style.width = '10px';
          dot.style.height = '10px';
          dot.style.borderRadius = '50%';
          dot.style.margin = '0 5px';
          dotsContainer.appendChild(dot);
        }
      }
    }

    function updateSectors(career: CarrersData) {
      const sectorFields = [
        { field: career.POR_SERVPROFESIONALES, name: 'Servicios profesionales, financieros y corporativos' },
        { field: career.POR_GOBIERNO_1, name: 'Gobierno y organismos internacionales' },
        { field: career.POR_SERVSOCIALES, name: 'Servicios sociales' },
        { field: career.POR_SERVDIVERSOS, name: 'Servicios diversos' },
        { field: career.POR_COMERCIO, name: 'Comercio' },
        { field: career.POR_AGRICULTURA, name: 'Agricultura y ganadería' },
        { field: career.POR_GOBIERNO, name: 'Construcción' },
        { field: career.POR_EXTRACTIVA, name: 'Industria extractiva' },
        { field: career.POR_MANUFACTURA, name: 'Industria manufacturera' },
        { field: career.POR_RESTAURANTES, name: 'Restaurantes y alojamientos' },
        { field: career.POR_TRANSPORTES, name: 'Transportes y comunicaciones' }
      ];

      const sectors = sectorFields
        .map(sf => ({
          name: sf.name,
          value: parseFloat(sf.field.toString()) * 100 || 0
        }))
        .filter(sector => sector.value > 0)
        .sort((a, b) => b.value - a.value);

      const sectorsContainer = document.getElementById('sectors');
      if (sectorsContainer) {

        sectorsContainer.innerHTML = '<h4>PRINCIPALES SECTORES EN LOS QUE TRABAJAN</h4>';

        const colors = [
          '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
          '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab', '#d37295'
        ];

        let stackedBarHTML = '<div class="stacked-bar">';
        let legendHTML = '<div class="sector-legend">';

        sectors.forEach((sector, index) => {
          stackedBarHTML += `
                <div class="sector-segment" style="width: ${sector.value}%; background-color: ${colors[index % colors.length]};">
                </div>
            `;
          legendHTML += `
                <div class="legend-item">
                    <span class="color-box" style="background-color: ${colors[index % colors.length]};"></span>
                    <span class="sector-name">${sector.name}</span>
                    <span class="sector-value">${sector.value.toFixed(1)}%</span>
                </div>
            `;
        });

        stackedBarHTML += '</div>';
        legendHTML += '</div>';

        sectorsContainer.innerHTML += stackedBarHTML + legendHTML;
      }
    }

    updateQualityDots("public-quality-dots", carrerData.CI_PUB)
    updateQualityDots("private-quality-dots", carrerData.CI_PRI)

    updateSectors(carrerData)

  }, [carrerData])

  return (
    <section className="graphs-section" id="graphs-section">
      <h1 className="career-title">{cleanTitle()}</h1>
      <h2 className="section-title">CUÁNTOS SON</h2>
      <p className="section-subtitle">Total nacional de personas que estudiaron esta carrera, por género y edad.</p>
      <div className="stats-container">
        <div className="circular-stats">
          <div className="stat-circle" id="total-students">
            <h3>{formatNumber(carrerData.TOTAL)}</h3>
            <p>personas estudiaron esta carrera</p>
          </div>
          <div className="stat-circle" id="percentage-total">
            <h3>{formatPercentage(carrerData.PCT_TOTAL)}</h3>
            <p>del total de personas con carrera</p>
          </div>
        </div>
        <div className="pie-charts">
          <div
            className="pie-chart-container"
            style={{
              width: 300 + "px",
              height: 300 + "px"
            }}
          >
            <Pie
              data={{
                labels: ['Hombres', 'Mujeres'],
                datasets: [
                  {
                    label: 'Distribución por género',
                    data: [carrerData.PCT_HOMBRE, carrerData.PCT_MUJER],
                    backgroundColor: [
                      '#45B7CE',
                      '#FFC300',
                    ],
                    borderColor: [
                      '#45B7CE',
                      '#FFC300',
                    ],
                    borderWidth: 1,
                  },
                ]

              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#FFFFFF'
                    }
                  },
                  title: {
                    display: true,
                    text: 'Distribución por género',
                    font: {
                      size: 16,
                    },
                    color: '#FFFFFF'
                  },
                }
              }}
            />
          </div>
          <div
            className="pie-chart-container"
            style={{
              width: 300 + "px",
              height: 300 + "px"
            }}
          >
            <Pie
              data={{
                labels: ['Menores de 30', 'Mayores de 30'],
                datasets: [
                  {
                    label: 'Distribución por edad',
                    data: [carrerData.PCT_30MENOS, carrerData.PCT_30MAS],
                    backgroundColor: [
                      '#4A90E2',
                      '#E57373'
                    ],
                    borderColor: [
                      '#4A90E2',
                      '#E57373'
                    ],
                    borderWidth: 1,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#FFFFFF'
                    }
                  },
                  title: {
                    display: true,
                    text: 'Distribución por género',
                    font: {
                      size: 16,
                    },
                    color: '#FFFFFF'
                  },
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="new-graduates">
        <h3>Nuevos egresados al mercado laboral</h3>
        <div id="new-graduates-number">
          {formatNumber(parseInt(carrerData.EGRESADOS_H) + parseInt(carrerData.EGRESADOS_M))}
        </div>
      </div>
      <div className="investment-quality">
        <h3>CALIDAD DE INVERSIÓN</h3>
        <p>Calificación asociada a cada carrera tomando en cuenta el costo de educación y el riesgo.</p>
        <div className="university-types">
          <div className="university-type">
            <h4>UNIVERSIDAD PÚBLICA</h4>
            <div id="public-quality-rating" className="quality-rating">
              {(!carrerData.CI_PUB || carrerData.CI_PUB === 'NA') ? '-' : carrerData.CI_PUB}
            </div>
            <div id="public-quality-dots" className="rating-dots">
            </div>
            <div className="investment-stats">
              <div className="stat">
                <p>Costo de educación</p>
                <div id="public-cost" className="stat-value">
                  {
                    (!carrerData.COSTO_TOTAL_PUBLICA || carrerData.COSTO_TOTAL_PUBLICA === 'NA') ?
                      '-' :
                      '$' + formatNumber(carrerData.COSTO_TOTAL_PUBLICA)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="university-type">
            <h4>UNIVERSIDAD PRIVADA</h4>
            <div id="private-quality-rating" className="quality-rating">
              {(!carrerData.CI_PRI || carrerData.CI_PRI === 'NA') ? '-' : carrerData.CI_PRI}
            </div>
            <div id="private-quality-dots" className="rating-dots"></div>
            <div className="investment-stats">
              <div className="stat">
                <p>Costo de educación</p>
                <div id="private-cost" className="stat-value">
                  {
                    (!carrerData.COSTO_TOTAL_PRIVADA || carrerData.COSTO_TOTAL_PRIVADA === 'NA') ?
                      '-' :
                      '$' + formatNumber(carrerData.COSTO_TOTAL_PRIVADA)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employment-info">
        <h3>EN QUÉ TRABAJAN</h3>
        <p>Principales características laborales como participación laboral, desempleo, informalidad y sectores en los que se desempeñan.</p>
        <div className="employment-stats">
          <div className="employment-stat">
            <h4>Tasa de ocupación</h4>
            <div id="occupation-rate" className="employment-stat-value">
              {formatPercentage(carrerData.TASA_OCUPACION)}
            </div>
          </div>
          <div className="employment-stat">
            <h4>Tasa de desempleo</h4>
            <div id="unemployment-rate" className="employment-stat-value">
              {formatPercentage(carrerData.TASA_DESOCUPACION)}
            </div>
          </div>
          <div className="employment-stat">
            <h4>Tasa de informalidad</h4>
            <div id="informality-rate" className="employment-stat-value">
              {formatPercentage(carrerData.TASA_INFORMALIDAD)}
            </div>
          </div>
        </div>
        <div id="sectors" className="sectors">
          <h4>PRINCIPALES SECTORES EN LOS QUE TRABAJAN</h4>
        </div>
      </div>
      <div className="position-info">
        <h3>POSICIÓN QUE OCUPAN</h3>
        <div className="position-content">
          <div className="employment-quality-card">
            <h4>Probabilidad de obtener un empleo de calidad</h4>
            <div id="quality-employment-probability" className="probability-value">
              {formatPercentage(carrerData.PROB_EMPL_CAL)}
            </div>
          </div>
          <div className="position-chart-container">
            <div style={{ width: 600 + "px", height: 300 + "px" }}>
              <Doughnut
                data={{
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
                        '#4DB6AC', '#FF8A65', '#81C784', '#FFD54F'
                      ],
                      borderColor: [
                        '#FFF'
                      ],
                      borderWidth: 1,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: '#FFFFFF'
                      }
                    },
                    title: {
                      display: true,
                      text: 'Distribución por género',
                      font: {
                        size: 16,
                      },
                      color: '#FFFFFF'
                    },
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cuanto-ganan">
        <h3>CUÁNTO GANAN</h3>
        <p>Salario mensual promedio, niveles de salario de los que más y menos perciben, así como el salario promedio con posgrado.</p>

        <div className="salary-main-info">
          <div className="salary-circle">
            <h4 id="average-salary">
              {`$${formatNumber(carrerData.INGRESO)}`}
            </h4>
            <p>salario mensual promedio</p>
            <small id="national-average">
              {`Salario promedio mensual de la población ocupada en México es $10,920`}
            </small>
          </div>
          <div className="salary-circle">
            <h4 id="career-rank">
              {`${(!carrerData.RANK_INGRESO || carrerData.RANK_INGRESO === 'NA') ? '-' : carrerData.RANK_INGRESO}°`}
            </h4>
            <p>carrera mejor pagada</p>
          </div>
        </div>

        <div className="salary-distribution">
          <h4>Distribución del salario mensual</h4>
          <Bar
            data={{
              labels: ['25% menos', 'Mediana', '25% más', 'Promedio'],
              datasets: [
                {
                  label: 'Distribución del salario mensual',
                  data: [
                    carrerData.POR_SUBORDINADO,
                    carrerData.POR_EMPLEADOR,
                    carrerData.POR_CUENTAPROPIA,
                    carrerData.POR_SIN_PAGO
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Distribución del salario mensual',
                  font: {
                    size: 18,
                  },
                  color: '#FFFFFF'
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(context.parsed.y);
                      }
                      return label;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => {
                      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(value.toString()));
                    },
                    color: '#FFFFFF'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: '#FFFFFF'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                }
              }

            }}
          />
          <div className="salary-legend">
            <div className="legend-item"><span className="color-box red"></span>25% de los profesionistas gana menos de esta cantidad</div>
            <div className="legend-item"><span className="color-box yellow"></span>Ingreso de un profesional a la mitad de la escala salarial</div>
            <div className="legend-item"><span className="color-box green"></span>25% de los profesionistas gana más de esta cantidad</div>
            <div className="legend-item"><span className="color-box black"></span>Salario promedio</div>
          </div>
        </div>

        <div className="salary-breakdowns">
          <div className="breakdown-row">
            <div className="breakdown-item">
              <h5>Mujeres</h5>
              <p id="women-salary">
                {`$${formatNumber(carrerData.INGRESO_M)}`}
              </p>
            </div>
            <div className="breakdown-item">
              <h5>Hombres</h5>
              <p id="men-salary">
                {`$${formatNumber(carrerData.INGRESO_H)}`}
              </p>
            </div>
          </div>
          <div className="breakdown-row">
            <div className="breakdown-item">
              <h5>Menos de 30 años</h5>
              <p id="under-30-salary">
                {`$${formatNumber(carrerData.INGRESO_30MENOS)}`}
              </p>
            </div>
            <div className="breakdown-item">
              <h5>Más de 30 años</h5>
              <p id="over-30-salary">
                {`$${formatNumber(carrerData.INGRESO_30MAS)}`}
              </p>
            </div>
          </div>
          <div className="breakdown-row">
            <div className="breakdown-item">
              <h5>Formales</h5>
              <p id="formal-salary">
                {`$${formatNumber(carrerData.INGRESO_FORMAL)}`}
              </p>
            </div>
            <div className="breakdown-item">
              <h5>Informales</h5>
              <p id="informal-salary">
                {`$${formatNumber(carrerData.INGRESO_INFORMAL)}`}
              </p>
            </div>
          </div>
        </div>

        <div className="postgrad-info">
          <div className="postgrad-circle">
            <h4 id="postgrad-percentage">
              {`${formatPercentage(carrerData.POR_POSGRADO)}`}
            </h4>
            <p>del total de personas que estudian esta carrera tienen un posgrado</p>
          </div>
          <div className="postgrad-circle">
            <h4 id="postgrad-salary">
              {`$${formatNumber(carrerData.ING_POSG)}`}
            </h4>
            <p>salario promedio mensual con posgrado</p>
          </div>
          <div className="postgrad-circle">
            <h4 id="salary-increase">
              {`${formatNumber(carrerData.INCREMENTO_POSGRADO)}%`}
            </h4>
            <p>incremento salarial con posgrado</p>
          </div>
        </div>

      </div>
      <div className="compare-container">
        <button id="compare-button">
          <Link href="/" id="return-link">Buscar otra carrera</Link>
        </button>
      </div>
    </section >
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
