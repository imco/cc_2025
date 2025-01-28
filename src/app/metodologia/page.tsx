import Image from "next/image"

import sectoresPicture from "@/assets/images/metodology/picture-sectors.png"

import { HowMuchAre, MetodologyContent, PositionsInWork, WhatTheyWork } from "./data.constants";

export default function Metodologia() {
  return (
    <main className="container">
      <div className="row mb-16">
        <div className="col-12">
          <div className="flex align-middle justify-center h-16 text-center">
            <h1 className="text-principal text-4xl font-bold pt-12">
              Metodología
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-8 offset-md-2">
          <section
            id="metodologyAccordion"
            className="accordion"
          >
            <article className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-xl font-semibold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  I. Indicadores del mercado laboral
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id="collapseOne"
                data-bs-parent="#metodologyAccordion"
              >
                <div className="accordion-body">
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      Esta sección se basa en información de la Encuesta Nacional de Ocupación y Empleo (ENOE) del Instituto Nacional de Estadística y Geografía (INEGI) con datos de los últimos cuatro trimestres disponibles. Para la edición 2024 de Compara Carreras, estos son el segundo, tercer y cuarto trimestre de 2023, así como el primer trimestre de 2024.
                    </span>
                    <br />
                    <br />
                    <span className="text-lg font-light">
                      Las carreras consideradas se derivan de la Clasificación Mexicana de Planes de Estudio (CMPE) por campos de formación académica 2016 elaborada por el INEGI, la Secretaría de Educación Pública (SEP), la Secretaría del Trabajo y Previsión Social (STPS), la Asociación Nacional de Universidades e Instituciones de Educación Superior (ANUIES) y el Consejo Nacional de Ciencia y Tecnología (Conacyt).
                    </span>
                    <br />
                    <br />
                    <span className="text-lg font-light">
                      La CMPE organiza los programas de estudio en una estructura jerárquica que va de lo general a lo específico: Campo amplio, Campo específico, Campo detallado y Campo unitario. La información de Compara Carreras se presenta al nivel de agregación de Campo detallado e incluye aquellos campos cuyos datos en la ENOE cumplen criterios básicos de confiabilidad estadística en los cuatro trimestres tomados.
                    </span>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <section
                        id="indicatorAccordion"
                        className="accordion"
                      >
                        <article className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button text-xl font-semibold"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOneDotOne"
                              aria-expanded="false"
                              aria-controls="collapseOneDotOne"
                            >
                              ¿Cuántos son?
                            </button>
                          </h2>
                          <div
                            className="accordion-collapse collapse"
                            id="collapseOneDotOne"
                            data-bs-parent="#indicatorAccordion"
                          >
                            <div className="accordion-body">
                              <div className="py-4 px-2">
                                <ul className="list-disc pl-6 pr-4">
                                  {HowMuchAre.map((option: MetodologyContent) => (
                                    <li className="mb-2" key={option.title}>
                                      <span
                                        className="text-lg font-light"
                                      >
                                        <strong className="font-medium">
                                          {option.title}
                                        </strong>
                                        {option.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </article>

                        <article className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button text-xl font-semibold"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOneDotTwo"
                              aria-expanded="false"
                              aria-controls="collapseOneDotTwo"
                            >
                              ¿En qué trabajan?
                            </button>
                          </h2>
                          <div
                            className="accordion-collapse collapse"
                            id="collapseOneDotTwo"
                            data-bs-parent="#indicatorAccordion"
                          >
                            <div className="accordion-body">
                              <div className="py-4 px-2">
                                <ul className="list-disc pl-6 pr-4">
                                  {WhatTheyWork.map((option: MetodologyContent) => (
                                    <li className="mb-2" key={option.title}>
                                      <span
                                        className="text-lg font-light"
                                      >
                                        <strong className="font-medium">
                                          {option.title}
                                        </strong>
                                        {option.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="py-3">
                                  <span className="text-xl font-medium text-blue-900">
                                    Posición que ocupan:
                                  </span>
                                </div>
                                <div className="pb-3">
                                  <span className="text-lg font-light">
                                    Distribución de los profesionistas de la carrera que tienen un empleo, por tipo de posición en la ocupación:
                                  </span>
                                </div>
                                <ul className="list-disc pl-6 pr-4">
                                  {PositionsInWork.map((option: MetodologyContent) => (
                                    <li className="mb-2" key={option.title}>
                                      <span
                                        className="text-lg font-light"
                                      >
                                        <strong className="font-medium">
                                          {option.title}
                                        </strong>
                                        {option.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </article>

                        <article className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button text-xl font-semibold"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOneDotThree"
                              aria-expanded="false"
                              aria-controls="collapseOneDotThree"
                            >
                              Principales sectores de actividad económica
                            </button>
                          </h2>
                          <div
                            className="accordion-collapse collapse"
                            id="collapseOneDotThree"
                            data-bs-parent="#indicatorAccordion"
                          >
                            <div className="accordion-body">
                              <div className="py-4 px-2">
                                <span className="text-lg font-light">
                                  Los primeros cinco sectores con mayor proporción de ocupados egresados de esta carrera. Esta clasificación se lleva a cabo de acuerdo con la variable Clasificación de la población ocupada según sector de actividad Subtotales (RAMA_EST2) de la ENOE que clasifica a la población ocupada en 11 categorías de actividad. Algunos nombres de las categorías fueron modificados para facilitar su interpretación, en la tabla siguiente se puede comparar el nombre original con el nombre utilizado en Compara Carreras.
                                </span>
                              </div>
                              <div className="flex align-middle justify-center  text-center">
                                <Image
                                  src={sectoresPicture.src}
                                  width={sectoresPicture.width}
                                  height={sectoresPicture.height}
                                  alt={"Principales sectores de actividad económica"}
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </div>
                        </article>

                        <article className="accordion-item">
                          <h2>¿Cuánto ganan?</h2>
                          <p>
                            Salario mensual: Para los cálculos salariales se consideran los ingresos reportados por aquellas personas ocupadas, que trabajaron al menos 35 horas a la semana con una remuneración mayor a cero.

                            Manejo de datos atípicos:
                            Se estima un estadístico para medir la dispersión de los salarios más altos de la distribución de ingresos por carrera.
                            El estadístico es la razón entre los percentiles 80, 85, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 y máximo sobre el promedio del ingreso por carrera.
                            Existe una observación atípica si este estadístico es mayor de la media de todas las carreras más dos desviaciones estándar.
                            En ese caso, el salario promedio se calcula sobre los valores menores al percentil que presenta observaciones atípicas de esa carrera.
                            Salario promedio mensual: Promedio aritmético sin datos atípicos del salario mensual de los profesionistas de la carrera, ajustado por el factor correspondiente a la estimación del subreporte de ingresos ENOE-ENIGH a partir de una proyección para 2023.

                            Para los valores de salario promedio por nivel educativo se utilizó el ingreso por persona de la Encuesta Nacional de Ingreso y Gasto de los Hogares (ENIGH) 2022. Este valor al reportar ingresos trimestrales se divide entre tres para calcular una aproximación del ingreso mensual. Posteriormente se proyectó el dato estimado para 2023 a partir de la masa salarial de Cuentas Nacionales del INEGI.

                            25% de los profesionistas gana menos de esta cantidad (P25): Salario mensual por debajo del cual está 25% de los profesionistas que menos ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario superior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte baja de la escala salarial de esta carrera, o un profesional con un desempeño inferior a la mediana.
                            Ingreso mediano: Salario mensual que divide a los profesionistas de una carrera en dos grupos de igual proporción, dejando 50% por debajo de ese salario y el otro 50% por arriba. Es una medida de cuánto podría estar ganando un profesional que se encuentre a la mitad de la escala salarial de esta carrera.
                            25% de los profesionistas gana más de esta cantidad (P75): Salario mensual por arriba del cual está 25% de los profesionistas que más ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario inferior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte alta de la escala salarial de esta carrera, o un profesional con un desempeño superior a la mediana.
                          </p>
                        </article>

                        <article className="accordion-item">
                          <h2>Salario con posgrado</h2>
                          <p>
                            Obtienen posgrado: Porcentaje de profesionistas de cada carrera con estudios de maestría o doctorado.
                            Salario promedio mensual con posgrado: Promedio aritmético del salario de los profesionistas de esta carrera que tienen maestría o doctorado ajustado por el estimado del subreporte de ingresos para personas con posgrado del comparativo ENOE-ENIGH.
                            Incremento salarial con posgrado: Cambio porcentual en el salario promedio de los profesionistas con posgrado, respecto al promedio de los que sólo tienen licenciatura.
                          </p>
                        </article>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </article>


            <article>
              <h2>II. Indicadores de matrícula</h2>
              <p>
                Esta sección se basa en información del Formato 911 de educación superior por carrera, elaborado por la SEP, el cual cuenta con información sobre el total de personas matriculadas durante el ciclo escolar 2022-2023, por programa de estudio, institución de educación superior y entidad federativa.

                Universidades que imparten la carrera: Número total de universidades que ofrecen cada carrera.
                Actualmente la cursan: Número total de estudiantes matriculados en la carrera en el ciclo escolar 2022-2023.
                Top 5 en matrícula: Lista de las primeras cinco universidades con mayor número de estudiantes en la carrera y su distribución por sexo.
              </p>
            </article>

            <article>
              <h2>III. Retorno sobre la inversión</h2>
              <p>
                Esta sección parte de presentar el costo total promedio de estudiar una carrera, el cual se construyó a partir de diversas fuentes:

                Contacto directo con universidades a través de sitio web y llamadas telefónicas, entre enero y mayo de 2024. Se obtuvo información de costos y duración de 40% de las licenciaturas y programas de técnico superior universitario. El resto de la información se obtuvo a partir de un ajuste inflacionario de los datos obtenidos en el levantamiento 2023.
                A los costos específicos de cada carrera y universidad se suma el gasto promedio en libros y materiales de las personas que asisten a instituciones de educación superior, con base en la ENIGH 2022 del INEGI.
                Para los cálculos de tiempo en recuperar la inversión y tasa de retorno anualizada sobre la inversión se construyó un perfil de ingresos a lo largo de la vida laboral de la persona, basado en el salario promedio que proviene de la ENOE (ver definición de salario promedio), como se explicó anteriormente.

                Costo total carrera: Costo total de estudiar la carrera promediado para universidades públicas y privadas por separado. Incluye costos de inscripción, matrícula y examen de admisión, así como gastos en libros y materiales.
                Tiempo para recuperar la inversión: Número de meses que debe trabajar un profesionista –que recibe el salario promedio de la carrera– para recuperar el costo total de su educación superior. Equivale al costo total de la carrera dividido entre el salario promedio.
                Retorno sobre la inversión anualizado: Es una medida del rendimiento de la inversión en educación superior, expresada como una tasa de retorno anual. El retorno sobre la inversión anualizado permite comparar en términos financieros la decisión de estudiar una carrera contra otras alternativas de inversión como por ejemplo la bolsa, los bonos del Estado, pagarés, etc.
                Su cálculo se basa en la siguiente fórmula:

                <strong>Imagen de la formula</strong>

                Fórmula de retorno sobre la inversión
                Y supone que:

                La edad en la que una persona termina la preparatoria y decide si continuar o no con su educación universitaria es a los 18 años; y
                La vida laboral de una persona termina a los 63 años de edad.
                Teniendo en cuenta las siguientes definiciones:

                Diferencial de ingreso vs. preparatoria: Ingresos extra que recibe un profesional respecto a los ingresos que obtiene una persona que solo terminó la preparatoria. Dado que la persona que decide estudiar una carrera sacrifica de 3 a 5 años de ingresos laborales, el diferencial de ingresos se calcula como los ingresos de la vida laboral de un profesional menos los ingresos que desde los 18 hasta los 63 años de edad recibe la persona con preparatoria.
                Duración de la carrera: Promedio de años que tarda una persona en terminar la carrera en condiciones normales.
                * Es importante anotar que esta tasa puede estar subestimada pues el cálculo del retorno sobre la inversión no considera la existencia de becas (que disminuyen el costo total de estudiar la carrera), ni la posibilidad de que haya un premium en el mercado laboral para los egresados de ciertas universidades, posiblemente las más costosas, que podrían tener remuneraciones más altas (lo que implicaría mayores retornos para algunas universidades).
              </p>
            </article>

            <article>
              <h2>IV. Calidad de la inversión</h2>
              <p>
                Esta sección se basa en el retorno de inversión anualizado calculado para cada carrera en universidad pública y privada, y en información de la ENOE del INEGI de los últimos cuatro trimestres disponibles. (Ver descripción de la sección I. Indicadores de mercado laboral)

                Rendimiento sobre la inversión anualizado: Ver sección III.
                Probabilidad de acceder a un empleo de calidad (PAEC): Uno menos el porcentaje de todas las personas que estudiaron cada carrera que se encuentran desempleadas, trabajando en el sector informal o forman parte de la población desanimada. Esto nos indica el porcentaje de profesionistas que se encuentran en una situación laboral favorable.
                El siguiente gráfico muestra el retorno sobre la inversión anualizada de cada carrera (eje vertical) y la PAEC asociada a la misma carrera (eje horizontal). Se trazó una línea de PAEC/Rendimiento promedio (RRP) pasando por los puntos 0% RSI 0% PAEC y el RSI y PAEC promedio. Se calculó la distancia perpendicular de cada punto por encima y por debajo de esta línea. Este análisis se realizó independientemente para el RSI público y el RSI privado.

                <strong>Imagen del retorno vs riesgo</strong>

                Gráfico de Retorno vs Riesgo
                A partir de las distancias de los puntos (carreras), se obtiene la siguiente clasificación sobre la calidad de inversión para cada una de las carreras analizadas:

                Excelentes (verde oscuro): Carreras con distancia por encima del promedio.
                Buenas (verde claro): Carreras debajo del promedio pero por encima de la línea RRP.
                Insegura (amarillo): Carreras por debajo de la línea RRP con distancia absoluta por debajo del promedio.
                Muy insegura (rojo): Carreras por encima del promedio pero debajo de la línea RRP.
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  )
}
