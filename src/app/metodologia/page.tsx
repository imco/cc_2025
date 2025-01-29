import Image from "next/image"

import sectoresPicture from "@/assets/images/metodology/picture-sectors.png"
import formulaPicture from "@/assets/images/metodology/picture-formula.png"
import returnRiskPicture from "@/assets/images/metodology/picture-return-risk.png"

import {
  HowMuchAre, HowMuchWon, HowMuchWonPhD, IdOfIds, MetodologyContent, PositionsInWork, WhatTheyWork
} from "./data.constants";

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
            className="accordion mb-8"
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
                        className="accordion mb-8"
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
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button text-xl font-semibold"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOneDotFour"
                              aria-expanded="false"
                              aria-controls="collapseOneDotFour"
                            >
                              ¿Cuánto ganan?
                            </button>
                          </h2>
                          <div
                            className="accordion-collapse collapse"
                            id="collapseOneDotFour"
                            data-bs-parent="#indicatorAccordion"
                          >
                            <div className="accordion-body">
                              <div className="py-4 px-2">
                                <span className="text-lg font-light">
                                  <strong className="font-medium">Salario mensual:</strong> Para los cálculos salariales se consideran los ingresos reportados por aquellas personas ocupadas, que trabajaron al menos 35 horas a la semana con una remuneración mayor a cero.
                                </span>

                                <div className="py-3">
                                  <span className="text-xl font-medium text-blue-900">
                                    Manejo de datos atípicos:
                                  </span>
                                </div>
                                <ol className="list-decimal pl-6 pr-4">
                                  <li className="mb-2 text-lg font-light">
                                    Se estima un estadístico para medir la dispersión de los salarios más altos de la distribución de ingresos por carrera.
                                  </li>
                                  <li className="mb-2 text-lg font-light">
                                    El estadístico es la razón entre los percentiles 80, 85, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 y máximo sobre el promedio del ingreso por carrera.
                                  </li>
                                  <li className="mb-2 text-lg font-light">
                                    Existe una observación atípica si este estadístico es mayor de la media de todas las carreras más dos desviaciones estándar.
                                  </li>
                                  <li className="text-lg font-light">
                                    En ese caso, el salario promedio se calcula sobre los valores menores al percentil que presenta observaciones atípicas de esa carrera.
                                  </li>
                                </ol>

                                <div className="py-3">
                                  <span className="text-lg font-light">
                                    <strong className="font-medium">
                                      Salario promedio mensual:</strong> Promedio aritmético sin datos atípicos del salario mensual de los profesionistas de la carrera, ajustado por el factor correspondiente a la estimación del <a href="https://comparacarreras.imco.org.mx/One-pager%20Subestimaci%C3%B3n%20de%20ingresos.pdf" className="text-blue-900">subreporte de ingresos</a> ENOE-ENIGH a partir de una proyección para 2023.
                                  </span>
                                </div>

                                <div className="py-1">
                                  <span className="text-lg font-light">
                                    Para los valores de salario promedio por nivel educativo se utilizó el ingreso por persona de la Encuesta Nacional de Ingreso y Gasto de los Hogares (ENIGH) 2022. Este valor al reportar ingresos trimestrales se divide entre tres para calcular una aproximación del ingreso mensual. Posteriormente se proyectó el dato estimado para 2023 a partir de la masa salarial de Cuentas Nacionales del INEGI.
                                  </span>
                                </div>
                                <ul className="list-disc pl-8 pr-6 pt-3">
                                  {HowMuchWon.map((option: MetodologyContent) => (
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
                              data-bs-target="#collapseOneDotFive"
                              aria-expanded="false"
                              aria-controls="collapseOneDotFive"
                            >
                              Salario con posgrado
                            </button>
                          </h2>
                          <div
                            className="accordion-collapse collapse"
                            id="collapseOneDotFive"
                            data-bs-parent="#indicatorAccordion"
                          >
                            <div className="accordion-body">
                              <div className="py-4 px-2">
                                <ul className="list-disc pl-8 pr-6 pt-3">
                                  {HowMuchWonPhD.map((option: MetodologyContent) => (
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
                      </section>
                    </div>
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
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  II. Indicadores de matrícula
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id="collapseTwo"
                data-bs-parent="#metodologyAccordion"
              >
                <div className="accordion-body">
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      Esta sección se basa en información del Formato 911 de educación superior por carrera, elaborado por la SEP, el cual cuenta con información sobre el total de personas matriculadas durante el ciclo escolar 2022-2023, por programa de estudio, institución de educación superior y entidad federativa.
                    </span>
                    <ul className="list-disc pl-6 pr-4 pt-4">
                      {IdOfIds.map((option: MetodologyContent) => (
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
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  III. Retorno sobre la inversión
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id="collapseThree"
                data-bs-parent="#metodologyAccordion"
              >
                <div className="accordion-body">
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      Esta sección parte de presentar el costo total promedio de estudiar una carrera, el cual se construyó a partir de diversas fuentes:
                    </span>
                    <br />
                    <br />
                    <ol className="list-decimal pl-8 pr-6">
                      <li className="mb-2 text-lg font-light">
                        Contacto directo con universidades a través de sitio web y llamadas telefónicas, entre enero y mayo de 2024. Se obtuvo información de costos y duración de 40% de las licenciaturas y programas de técnico superior universitario. El resto de la información se obtuvo a partir de un ajuste inflacionario de los datos obtenidos en el levantamiento 2023.
                      </li>
                      <li className="mb-2 text-lg font-light">
                        A los costos específicos de cada carrera y universidad se suma el gasto promedio en libros y materiales de las personas que asisten a instituciones de educación superior, con base en la ENIGH 2022 del INEGI.
                      </li>
                    </ol>
                    <span className="text-lg font-light">
                      Para los cálculos de tiempo en recuperar la inversión y tasa de retorno anualizada sobre la inversión se construyó un perfil de ingresos a lo largo de la vida laboral de la persona, basado en el salario promedio que proviene de la ENOE (ver definición de salario promedio), como se explicó anteriormente.
                    </span>
                    <ul className="list-disc pl-6 pr-4 pt-3">
                      <li className="mb-2">
                        <span
                          className="text-lg font-light"
                        >
                          <strong className="font-medium">
                            Costo total carrera:
                          </strong> Costo total de estudiar la carrera promediado para universidades públicas y privadas por separado. Incluye costos de inscripción, matrícula y examen de admisión, así como gastos en libros y materiales.
                        </span>
                      </li>
                      <li className="mb-2">
                        <span
                          className="text-lg font-light"
                        >
                          <strong className="font-medium">
                            Tiempo para recuperar la inversión:
                          </strong> Número de meses que debe trabajar un profesionista –que recibe el salario promedio de la carrera– para recuperar el costo total de su educación superior. Equivale al costo total de la carrera dividido entre el salario promedio.
                        </span>
                      </li>
                      <li className="mb-2">
                        <span
                          className="text-lg font-light"
                        >
                          <strong className="font-medium">
                            Retorno sobre la inversión anualizado:
                          </strong> Es una medida del rendimiento de la inversión en educación superior, expresada como una tasa de retorno anual. El retorno sobre la inversión anualizado permite comparar en términos financieros la decisión de estudiar una carrera contra otras alternativas de inversión como por ejemplo la bolsa, los bonos del Estado, pagarés, etc.
                        </span>
                      </li>
                    </ul>
                    <div className="py-4">
                      <span className="text-lg font-light">
                        Su cálculo se basa en la siguiente fórmula:
                      </span>
                    </div>
                    <div className="flex align-middle justify-center  text-center">
                      <Image
                        src={formulaPicture.src}
                        width={formulaPicture.width}
                        height={formulaPicture.height}
                        alt={"Fórmula en la que se basa el cálculo"}
                        className="img-fluid"
                      />
                    </div>
                    <div className="py-4">
                      <span className="text-lg font-light">
                        Y supone que:
                      </span>
                    </div>
                    <ul className="list-disc pl-8 pr-6">
                      <li className="mb-2 text-lg font-light">
                        La edad en la que una persona termina la preparatoria y decide si continuar o no con su educación universitaria es a los 18 años; y
                      </li>
                      <li className="mb-2 text-lg font-light">
                        La vida laboral de una persona termina a los 63 años de edad.
                      </li>
                    </ul>
                    <div className="py-4">
                      <span className="text-lg font-light">
                        Teniendo en cuenta las siguientes definiciones:
                      </span>
                    </div>
                    <ul className="list-disc pl-8 pr-6">
                      <li className="mb-2 text-lg font-light">
                        <strong className="font-medium">Diferencial de ingreso vs. preparatoria:</strong> Ingresos extra que recibe un profesional respecto a los ingresos que obtiene una persona que solo terminó la preparatoria. Dado que la persona que decide estudiar una carrera sacrifica de 3 a 5 años de ingresos laborales, el diferencial de ingresos se calcula como los ingresos de la vida laboral de un profesional menos los ingresos que desde los 18 hasta los 63 años de edad recibe la persona con preparatoria.
                      </li>
                      <li className="mb-2 text-lg font-light">
                        <strong className="font-medium">Duración de la carrera:</strong> Promedio de años que tarda una persona en terminar la carrera en condiciones normales.
                      </li>
                    </ul>
                    <div className="pt-4">
                      <span className="text-lg font-light">
                        <strong className="font-medium">*</strong> Es importante anotar que esta tasa puede estar subestimada pues el cálculo del retorno sobre la inversión no considera la existencia de becas (que disminuyen el costo total de estudiar la carrera), ni la posibilidad de que haya un premium en el mercado laboral para los egresados de ciertas universidades, posiblemente las más costosas, que podrían tener remuneraciones más altas (lo que implicaría mayores retornos para algunas universidades).
                      </span>
                    </div>
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
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  IV. Calidad de la inversión
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id="collapseFour"
                data-bs-parent="#metodologyAccordion"
              >
                <div className="accordion-body">
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      Esta sección se basa en el retorno de inversión anualizado calculado para cada carrera en universidad pública y privada, y en información de la ENOE del INEGI de los últimos cuatro trimestres disponibles. (Ver descripción de la sección I. Indicadores de mercado laboral)
                    </span>
                  </div>
                  <ul className="list-disc pl-8 pr-6">
                    <li className="mb-2 text-lg font-light">
                      <strong className="font-medium">Rendimiento sobre la inversión anualizado:</strong> Ver sección III.
                    </li>
                    <li className="text-lg font-light">
                      <strong className="font-medium">Probabilidad de acceder a un empleo de calidad (PAEC):</strong> Uno menos el porcentaje de todas las personas que estudiaron cada carrera que se encuentran desempleadas, trabajando en el sector informal o forman parte de la población desanimada. Esto nos indica el porcentaje de profesionistas que se encuentran en una situación laboral favorable.
                    </li>
                  </ul>
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      El siguiente gráfico muestra el retorno sobre la inversión anualizada de cada carrera (eje vertical) y la PAEC asociada a la misma carrera (eje horizontal). Se trazó una línea de PAEC/Rendimiento promedio (RRP) pasando por los puntos 0% RSI 0% PAEC y el RSI y PAEC promedio. Se calculó la distancia perpendicular de cada punto por encima y por debajo de esta línea. Este análisis se realizó independientemente para el RSI público y el RSI privado.
                    </span>
                  </div>
                  <div className="flex align-middle justify-center  text-center px-6">
                    <Image
                      src={returnRiskPicture.src}
                      width={returnRiskPicture.width}
                      height={returnRiskPicture.height}
                      alt={"Imagen del retorno vs riesgo"}
                      className="img-fluid"
                    />
                  </div>
                  <div className="py-4 px-2">
                    <span className="text-lg font-light">
                      A partir de las distancias de los puntos (carreras), se obtiene la siguiente clasificación sobre la calidad de inversión para cada una de las carreras analizadas:
                    </span>

                    <ul className="list-disc pl-8 pr-6 pt-3">
                      <li className="mb-2 text-lg font-light">
                        <strong className="font-medium">Excelentes (verde oscuro):</strong> Carreras con distancia por encima del promedio.
                      </li>
                      <li className="mb-2 text-lg font-light">
                        <strong className="font-medium">Buenas (verde claro):</strong> Carreras debajo del promedio pero por encima de la línea RRP.
                      </li>
                      <li className="mb-2 text-lg font-light">
                        <strong className="font-medium">Insegura (amarillo):</strong> Carreras por debajo de la línea RRP con distancia absoluta por debajo del promedio.
                      </li>
                      <li className="text-lg font-light">
                        <strong className="font-medium">Muy insegura (rojo):</strong> Carreras por encima del promedio pero debajo de la línea RRP.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  )
}
