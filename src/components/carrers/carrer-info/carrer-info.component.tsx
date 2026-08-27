"use client"
import Link from 'next/link';
import SaberesBanner from '@/components/saberes/saberes-banner.component';
import { Reveal, MountOnVisible, CountUp } from '@/components/animations/reveal.component';
import {
  UsersIcon,
  BriefcaseIcon,
  BriefcaseCheckIcon,
  UserXIcon,
  UserCheckIcon,
  FileXIcon,
  SitemapIcon,
  ShieldCheckIcon,
  BanknoteIcon,
  TrophyIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  TrendingUpIcon,
  FemaleIcon,
  MaleIcon,
} from '@/components/icons';


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
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/components/animations/reveal.component';
import PrintButton from '@/components/print/print-button.component';
import ParametrosGenerales from '@/parametros_generales.json';
import CareerPrintSheet from '@/components/print/career-print-sheet.component';
import ShareButtons from '@/components/share/share-buttons.component';
import { SearchIcon } from '@/components/icons';
import { legendSliceSync, sliceHoverRefresh, sliceHoverStyle, barLegendHover, activarBarra } from './chart-hover-sync';

// el primer color (sector mayoritario) debe contrastar con el fondo azul
// del contenedor (>= 3:1); #4e79a7 se perdía contra él
const SECTOR_COLORS = [
  '#7CC4EE', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
  '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab', '#d37295'
];

type Props = {
  title: string
}

export default function CarrerInfo(props: Props) {
  const salaryBarRef = useRef<ChartJS<'bar'> | null>(null)
  const sectorsPieRef = useRef<ChartJS<'pie'> | null>(null)
  const [sectorActivo, setSectorActivo] = useState<number | null>(null)
  const { ref: sectorsRef, visible: sectorsVisible } = useInView<HTMLDivElement>(0.3)

  const [esMovil, setEsMovil] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(max-width: 650px)')
    const actualizar = () => setEsMovil(mq.matches)
    actualizar()
    mq.addEventListener('change', actualizar)
    return () => mq.removeEventListener('change', actualizar)
  }, [])

  // respaldo por si el ResizeObserver de Chart.js no reacciona al cambiar
  // el tamaño de la ventana (p. ej. con zoom del navegador)
  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout>
    const alRedimensionar = () => {
      clearTimeout(temporizador)
      temporizador = setTimeout(() => salaryBarRef.current?.resize(), 150)
    }
    window.addEventListener('resize', alRedimensionar)
    return () => {
      clearTimeout(temporizador)
      window.removeEventListener('resize', alRedimensionar)
    }
  }, [])

  // al imprimir, las gráficas que se monten deben pintarse completas de inmediato;
  // igual si la persona prefiere movimiento reducido
  useEffect(() => {
    const desactivarAnimaciones = () => { ChartJS.defaults.animation = false }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) desactivarAnimaciones()
    window.addEventListener('preparar-impresion', desactivarAnimaciones)
    window.addEventListener('beforeprint', desactivarAnimaciones)
    return () => {
      window.removeEventListener('preparar-impresion', desactivarAnimaciones)
      window.removeEventListener('beforeprint', desactivarAnimaciones)
    }
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")
  const cleanTitle = () => {
    return props.title.toLocaleUpperCase().replaceAll("_", " ")
  }

  const carrerData: CarrersData = carrersData.find(
    (carrer: CarrersData) => carrer.CARRERA.toLowerCase().replaceAll(" ", "_") == props.title
  )

  const sectores = (carrerData ? [
    { field: carrerData.POR_SERVPROFESIONALES, name: 'Servicios profesionales, financieros y corporativos' },
    { field: carrerData.POR_GOBIERNO_1, name: 'Gobierno y organismos internacionales' },
    { field: carrerData.POR_SERVSOCIALES, name: 'Servicios sociales' },
    { field: carrerData.POR_SERVDIVERSOS, name: 'Servicios diversos' },
    { field: carrerData.POR_COMERCIO, name: 'Comercio' },
    { field: carrerData.POR_AGRICULTURA, name: 'Agricultura y ganadería' },
    { field: carrerData.POR_GOBIERNO, name: 'Construcción' },
    { field: carrerData.POR_EXTRACTIVA, name: 'Industria extractiva' },
    { field: carrerData.POR_MANUFACTURA, name: 'Industria manufacturera' },
    { field: carrerData.POR_RESTAURANTES, name: 'Restaurantes y alojamientos' },
    { field: carrerData.POR_TRANSPORTES, name: 'Transportes y comunicaciones' },
  ] : [])
    .map(sf => ({ name: sf.name, value: parseFloat(String(sf.field)) * 100 || 0 }))
    .filter(sector => sector.value > 0)
    .sort((a, b) => b.value - a.value)
    .map((sector, index) => ({ ...sector, color: SECTOR_COLORS[index % SECTOR_COLORS.length] }))

  // descripciones textuales de las gráficas: aria-label del canvas y
  // alternativa visible en el HTML estático (sin JS)
  const descGenero = `Distribución por género: ${formatPercentage(carrerData.PCT_MUJER)} mujeres y ${formatPercentage(carrerData.PCT_HOMBRE)} hombres`
  const descEdad = `Distribución por edad: ${formatPercentage(carrerData.PCT_30MENOS)} menores de 30 años y ${formatPercentage(carrerData.PCT_30MAS)} de 30 años y más`
  const descSectores = `Principales sectores en los que trabajan: ${sectores.slice(0, 3).map(s => `${s.name} ${s.value.toFixed(1)}%`).join(', ')}`
  const descPosicion = `Posición que ocupan: ${formatPercentage(carrerData.POR_SUBORDINADO)} subordinados, ${formatPercentage(carrerData.POR_EMPLEADOR)} empleadores, ${formatPercentage(carrerData.POR_CUENTAPROPIA)} por cuenta propia y ${formatPercentage(carrerData.POR_SIN_PAGO)} sin pago`
  const descSalario = `Distribución salarial: 25% gana menos de $${formatNumber(carrerData.INGRESO_Q25)}, mediana de $${formatNumber(carrerData.INGRESO_Q50)}, 25% gana más de $${formatNumber(carrerData.INGRESO_Q75)} y promedio de $${formatNumber(carrerData.INGRESO)}`

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

    updateQualityDots("public-quality-dots", carrerData.CI_PUB)
    updateQualityDots("private-quality-dots", carrerData.CI_PRI)

  }, [carrerData])

  return (
    <div className="container">

      <section className="graphs-section" id="graphs-section">
        <CareerPrintSheet carrerData={carrerData} sectores={sectores} />
        <h1 className="career-title">{cleanTitle()}</h1>
        <h2 className="section-title">
          <span className="section-title-icon"><UsersIcon size={28} /></span>
          ¿CUÁNTOS SON?
        </h2>
        <p className="section-subtitle">Total nacional de personas que estudiaron esta carrera, por género y edad.</p>
        <div className="stats-container">
          <div className="circular-stats">
            <Reveal>
              <div className="stat-circle" id="total-students">
                <h3><CountUp value={carrerData.TOTAL} format={formatNumber} /></h3>
                <p>personas estudiaron esta carrera</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="stat-circle" id="percentage-total">
                <h3><CountUp value={carrerData.PCT_TOTAL} format={formatPercentage} /></h3>
                <p>del total de personas con carrera</p>
              </div>
            </Reveal>
          </div>
          <div className="pie-charts">
            <div
              className="pie-chart-container"
              style={{
                width: 300 + "px",
                height: 300 + "px"
              }}
            >
              <MountOnVisible minHeight={300} fallback={descGenero}>
              <Pie
                role="img"
                aria-label={descGenero}
                data={{
                  labels: ['Hombres', 'Mujeres'],
                  datasets: [
                    {
                      label: 'Distribución por género',
                      data: [(parseFloat(carrerData.PCT_HOMBRE.toString()) * 100).toFixed(1), (parseFloat(carrerData.PCT_MUJER.toString()) * 100).toFixed(1)],
                      backgroundColor: [
                        '#45B7CE',
                        '#FFC300',
                      ],
                      borderColor: [
                        '#45B7CE',
                        '#FFC300',
                      ],
                      borderWidth: 1,
                      ...sliceHoverStyle,
                    },
                  ]

                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  onHover: sliceHoverRefresh,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      ...legendSliceSync('pie'),
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return context.dataset.label + ': ' + context.parsed.valueOf() + '%';
                        }
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
                  },
                }}
              />
              </MountOnVisible>
            </div>
            <div
              className="pie-chart-container"
              style={{
                width: 300 + "px",
                height: 300 + "px"
              }}
            >
              <MountOnVisible minHeight={300} fallback={descEdad}>
              <Pie
                role="img"
                aria-label={descEdad}
                data={{
                  labels: ['Menores de 30', 'Mayores de 30'],
                  datasets: [
                    {
                      label: 'Distribución por edad',
                      data: [(parseFloat(carrerData.PCT_30MENOS.toString()) * 100).toFixed(1), (parseFloat(carrerData.PCT_30MAS.toString()) * 100).toFixed(1)],
                      backgroundColor: [
                        '#4A90E2',
                        '#E57373'
                      ],
                      borderColor: [
                        '#4A90E2',
                        '#E57373'
                      ],
                      borderWidth: 1,
                      ...sliceHoverStyle,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  onHover: sliceHoverRefresh,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      ...legendSliceSync('pie'),
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return context.dataset.label + ': ' + context.parsed.valueOf() + '%';
                        }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Distribución por edad',
                      font: {
                        size: 16,
                      },
                      color: '#FFFFFF'
                    },
                  }
                }}
              />
              </MountOnVisible>
            </div>
          </div>
        </div>
        <div className="stat-cards-row">
          <Reveal>
            <div className="stat-line-card">
              <h3>
                <span className="stat-icon"><ClipboardListIcon size={22} /></span>
                Matrícula actual (estudiantes inscritos)
              </h3>
              <div className="new-graduates-number">
                <CountUp value={carrerData.MATRICULA} format={formatNumber} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="stat-line-card">
              <h3>
                <span className="stat-icon"><GraduationCapIcon size={22} /></span>
                Nuevos egresados al mercado laboral (último ciclo escolar)
              </h3>
              <div className="new-graduates-number" id="new-graduates-number">
                <CountUp
                  value={parseInt(carrerData.EGRESADOS_H) + parseInt(carrerData.EGRESADOS_M)}
                  format={formatNumber}
                />
              </div>
            </div>
          </Reveal>
        </div>
       {/*  <div className="investment-quality">
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
        </div> */}
        <div className="employment-info">
          <h3>
            <span className="section-title-icon"><BriefcaseIcon size={26} /></span>
            ¿EN QUÉ TRABAJAN?
          </h3>
          <p>Principales características laborales.</p>
          <div className="employment-stats">
            <Reveal>
              <div className="employment-stat">
                <span className="stat-icon"><BriefcaseCheckIcon size={22} /></span>
                <h4>Tasa de ocupación</h4>
                <div id="occupation-rate" className="employment-stat-value">
                  <CountUp value={carrerData.TASA_OCUPACION} format={formatPercentage} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="employment-stat">
                <span className="stat-icon"><UserXIcon size={22} /></span>
                <h4>Tasa de desempleo</h4>
                <div id="unemployment-rate" className="employment-stat-value">
                  <CountUp value={carrerData.TASA_DESOCUPACION} format={formatPercentage} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="employment-stat">
                <span className="stat-icon"><FileXIcon size={22} /></span>
                <h4>Tasa de informalidad</h4>
                <div id="informality-rate" className="employment-stat-value">
                  <CountUp value={carrerData.TASA_INFORMALIDAD} format={formatPercentage} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="employment-stat">
                <span className="stat-icon"><UserCheckIcon size={22} /></span>
                <h4>¿Cuántos trabajan en lo que estudiaron?</h4>
                <div id="application-rate" className="employment-stat-value">
                  <CountUp value={carrerData.TASA_APLICACION} format={formatPercentage} />
                </div>
              </div>
            </Reveal>
          </div>
          <div id="sectors" className="sectors" ref={sectorsRef}>
            <h4>PRINCIPALES SECTORES EN LOS QUE TRABAJAN</h4>
            <div className="stacked-bar">
              {sectores.map((sector, i) => (
                <div
                  key={sector.name}
                  className={`sector-segment${sectorActivo === i ? ' sector-hl' : ''}`}
                  style={{
                    width: sectorsVisible ? `${sector.value}%` : '0%',
                    backgroundColor: sector.color,
                    transitionDelay: `${i * 90}ms`,
                  }}
                  onMouseEnter={() => setSectorActivo(i)}
                  onMouseLeave={() => setSectorActivo(null)}
                />
              ))}
            </div>
            <div className="sectors-pie">
              <MountOnVisible minHeight={260} fallback={descSectores}>
                <Pie
                  ref={sectorsPieRef}
                  role="img"
                  aria-label={descSectores}
                  data={{
                    labels: sectores.map(s => s.name),
                    datasets: [
                      {
                        label: 'Sectores',
                        data: sectores.map(s => s.value),
                        backgroundColor: sectores.map(s => s.color),
                        borderColor: '#024383',
                        borderWidth: 1,
                        ...sliceHoverStyle,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    onHover: (_e, els) => setSectorActivo(els.length ? els[0].index : null),
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: context => ` ${context.parsed.toFixed(1)}%`,
                        },
                      },
                    },
                  }}
                />
              </MountOnVisible>
            </div>
            <div className="sector-legend">
              {sectores.map((sector, i) => (
                <div
                  key={sector.name}
                  className={`legend-item${sectorActivo === i ? ' sector-hl' : ''}`}
                  tabIndex={0}
                  onMouseEnter={() => {
                    setSectorActivo(i)
                    activarBarra(sectorsPieRef.current, i, true)
                  }}
                  onMouseLeave={() => {
                    setSectorActivo(null)
                    activarBarra(sectorsPieRef.current, i, false)
                  }}
                  onFocus={() => {
                    setSectorActivo(i)
                    activarBarra(sectorsPieRef.current, i, true)
                  }}
                  onBlur={() => {
                    setSectorActivo(null)
                    activarBarra(sectorsPieRef.current, i, false)
                  }}
                >
                  <span className="color-box" style={{ backgroundColor: sector.color }}></span>
                  <span className="sector-name">{sector.name}</span>
                  <span className="sector-value">{sector.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="position-info">
          <h3>
            <span className="section-title-icon"><SitemapIcon size={26} /></span>
            POSICIÓN QUE OCUPAN
          </h3>
          <div className="position-content">
            <Reveal>
              <div className="employment-quality-card">
                <span className="stat-icon"><ShieldCheckIcon size={22} /></span>
                <h4>Probabilidad de obtener un empleo de calidad</h4>
                <div id="quality-employment-probability" className="probability-value">
                  <CountUp value={carrerData.PROB_EMPL_CAL} format={formatPercentage} />
                </div>
              </div>
            </Reveal>
            <div className="row">
              <div className="col-12">
                <div className="doughnut-wrapper" style={{ height: (esMovil ? 400 : 300) + 'px' }}>
                  <MountOnVisible minHeight={esMovil ? 400 : 300} fallback={descPosicion}>
                  <Doughnut
                    role="img"
                    aria-label={descPosicion}
                    data={{
                      labels: ['Subordinado', 'Empleador', 'Cuenta propia', 'Trabajo sin pago'],
                      datasets: [
                        {
                          label: 'Distribución por posición ocupada',
                          data: [
                            (parseFloat(carrerData.POR_SUBORDINADO.toString()) * 100).toFixed(1),
                            (parseFloat(carrerData.POR_EMPLEADOR.toString()) * 100).toFixed(1),
                            (parseFloat(carrerData.POR_CUENTAPROPIA.toString()) * 100).toFixed(1),
                            (parseFloat(carrerData.POR_SIN_PAGO.toString()) * 100).toFixed(1)
                          ],
                          backgroundColor: [
                            '#4DB6AC', '#FF8A65', '#81C784', '#FFD54F'
                          ],
                          borderColor: [
                            '#FFF'
                          ],
                          borderWidth: 1,
                          ...sliceHoverStyle,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      onHover: sliceHoverRefresh,
                      plugins: {
                        legend: {
                          position: esMovil ? 'bottom' : 'right',
                          ...legendSliceSync('doughnut'),
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              return context.dataset.label + ': ' + context.parsed.valueOf() + '%';
                            }
                          }
                        },
                        title: {
                          display: true,
                          text: 'Distribución por posición ocupada',
                          font: {
                            size: 16,
                          },
                          color: '#FFFFFF'
                        },

                      }
                    }}
                  />
                  </MountOnVisible>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cuanto-ganan">
          <h3>
            <span className="section-title-icon"><BanknoteIcon size={26} /></span>
            ¿CUÁNTO GANAN?
          </h3>
          <p>Salario mensual promedio, niveles de salario de los que más y menos perciben, así como el salario promedio con posgrado.</p>

          <div className="salary-main-info">
            <Reveal>
              <div className="salary-circle">
                <span className="stat-icon"><BanknoteIcon size={22} /></span>
                <h4 id="average-salary">
                  <CountUp value={carrerData.INGRESO} format={formatNumber} prefix="$" />
                </h4>
                <p>salario promedio mensual</p>
                <small id="national-average">
                  {`Salario promedio mensual de la población ocupada en México es $${formatNumber(ParametrosGenerales.salario_promedio_poblacion_ocupada.valor)}`}
                </small>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="salary-circle">
                <span className="stat-icon"><TrophyIcon size={22} /></span>
                <h4 id="career-rank">
                  {`${(!carrerData.RANK_INGRESO || carrerData.RANK_INGRESO === 'NA') ? '-' : carrerData.RANK_INGRESO}°`}
                </h4>
                <p>carrera mejor pagada</p>
              </div>
            </Reveal>
          </div>

          <div className="salary-distribution">
            <h4>Distribución salarial</h4>
            <div className="salary-chart-box">
            <MountOnVisible minHeight={320} fallback={descSalario}>
            <Bar
              ref={salaryBarRef}
              role="img"
              aria-label={descSalario}
              data={{
                labels: ['25% menos', 'Mediana', '25% más', 'Promedio'],
                datasets: [
                  {
                    label: 'Distribución salarial',
                    data: [
                      carrerData.INGRESO_Q25,
                      carrerData.INGRESO_Q50,
                      carrerData.INGRESO_Q75,
                      carrerData.INGRESO
                    ].map(v => {
                      const n = parseFloat(String(v))
                      return isNaN(n) ? null : n
                    }),
                    // misma paleta que los cuadros de la leyenda (--color-chart-1..4)
                    backgroundColor: [
                      'rgba(255, 107, 107, 0.85)',
                      'rgba(255, 169, 77, 0.85)',
                      'rgba(105, 219, 124, 0.85)',
                      'rgba(77, 171, 247, 0.85)',
                    ],
                    borderColor: [
                      '#FF6B6B',
                      '#FFA94D',
                      '#69DB7C',
                      '#4DABF7',
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: [
                      '#FF6B6B',
                      '#FFA94D',
                      '#69DB7C',
                      '#4DABF7',
                    ],
                    hoverBorderColor: '#FFFFFF',
                    hoverBorderWidth: 2,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onHover: barLegendHover,
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Distribución salarial',
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
            </MountOnVisible>
            </div>
            <div className="salary-legend">
              {[
                '25% de los profesionistas gana menos de esta cantidad',
                'Ingreso de un profesional a la mitad de la escala salarial',
                '25% de los profesionistas gana más de esta cantidad',
                'Salario promedio',
              ].map((texto, i) => (
                <div
                  className="legend-item"
                  key={texto}
                  tabIndex={0}
                  onMouseEnter={() => activarBarra(salaryBarRef.current, i, true)}
                  onMouseLeave={() => activarBarra(salaryBarRef.current, i, false)}
                  onFocus={() => activarBarra(salaryBarRef.current, i, true)}
                  onBlur={() => activarBarra(salaryBarRef.current, i, false)}
                >
                  <span className="color-box"></span>
                  {texto}
                </div>
              ))}
            </div>
          </div>

          <div className="salary-breakdowns">
            <div className="breakdown-row">
              <div className="breakdown-item">
                <h5><span className="stat-icon-inline"><FemaleIcon size={18} /></span>Mujeres</h5>
                <p id="women-salary">
                  <CountUp value={carrerData.INGRESO_M} format={formatNumber} prefix="$" />
                </p>
              </div>
              <div className="breakdown-item">
                <h5><span className="stat-icon-inline"><MaleIcon size={18} /></span>Hombres</h5>
                <p id="men-salary">
                  <CountUp value={carrerData.INGRESO_H} format={formatNumber} prefix="$" />
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
            <Reveal>
              <div className="postgrad-circle">
                <span className="stat-icon"><GraduationCapIcon size={22} /></span>
                <h4 id="postgrad-percentage">
                  <CountUp value={carrerData.POR_POSGRADO} format={formatPercentage} />
                </h4>
                <p>del total de personas que estudian esta carrera tiene un posgrado</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="postgrad-circle">
                <span className="stat-icon"><BanknoteIcon size={22} /></span>
                <h4 id="postgrad-salary">
                  <CountUp value={carrerData.ING_POSG} format={formatNumber} prefix="$" />
                </h4>
                <p>salario promedio mensual con posgrado</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="postgrad-circle">
                <span className="stat-icon"><TrendingUpIcon size={22} /></span>
                <h4 id="salary-increase">
                  <CountUp value={carrerData.INCREMENTO_POSGRADO} format={formatUnDecimal} suffix="%" />
                </h4>
                <p>incremento salarial con posgrado vs. licenciatura</p>
              </div>
            </Reveal>
          </div>

        </div>
        <div className="compare-container carrer-actions">
          <PrintButton />
          <Link href="/" className="print-button">
            <SearchIcon size={18} />
            Buscar otra carrera
          </Link>
        </div>
        <div className="carrer-share no-print">
          <ShareButtons
            texto={`${carrerData?.CARRERA} en Compara Carreras del IMCO: salario promedio mensual de $${formatNumber(carrerData?.INGRESO)} y tasa de ocupación de ${formatPercentage(carrerData?.TASA_OCUPACION)}.`}
          />
        </div>
        <SaberesBanner />
      </section >
    </div>
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

function formatUnDecimal(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const num = parseFloat(value.toString());
  return isNaN(num) ? '-' : num.toFixed(1);
}

function formatPercentage(value: number | string | undefined) {
  if (value === undefined || value === null || value === '') return '-';
  const percentage = parseFloat(value.toString());
  return isNaN(percentage) ? '-' : `${(percentage * 100).toFixed(1)}%`;
}
