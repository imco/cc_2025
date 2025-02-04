import { CarrersList, Top10sList, TSUList } from "./carreras.constans";

export default function Faq() {
  return (
    <main className="container">
      <div className="row mb-16">
        <div className="col-12">
          <div className="flex align-middle justify-center h-16 text-center">
            <h1 className="text-principal text-4xl font-bold pt-12">
              Preguntas frecuentes
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-8 offset-md-2">
          <div className="w-full h-full">
            <div
              className="collapse show collapse-horizontal"
              id="collapseCarrers"
            >
              <section
                id="carrersAccordion"
                className="accordion"
              >
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      ¿Por qué siempre es más rentable (menor tiempo en recuperar la inversión y mayor retorno sobre la inversión) estudiar en una universidad pública que en una privada?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse show"
                    id="collapseOne"
                    data-bs-parent="#carrersAccordion"
                  >
                    <div className="accordion-body">
                      <div className="py-4 px-2 text-justify">
                        <span className="text-lg font-medium ">
                          La rentabilidad de la inversión en educación superior depende fundamentalmente de dos variables: el nivel de ingreso y el costo de estudiar la carrera. Debido a limitaciones de información, no es posible diferenciar los ingresos de profesionistas egresados de universidades públicas y universidades privadas, por lo que el análisis que presentamos asume que, en ambos casos, los ingresos corresponden al promedio nacional de la carrera. Dado que los ingresos son iguales, la rentabilidad está determinada por los costos de la carrera que son significativamente menores en las instituciones públicas.
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      ¿Cuáles son las carreras mejor pagadas en México?¿Qué carrera estudiar?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseTwo"
                    data-bs-parent="#carrersAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="text-lg font-medium">
                          Revisa nuestros tops en la sección Las 10 más en donde posiblemente encontrarás información que te ayudará a resolver esas dudas:
                        </span>
                        <ul className="list-disc pl-10 pt-4 text-lg">
                          {Top10sList.map((top10: string) => (
                            <li className="mb-2" key={top10}>
                              {top10}
                            </li>
                          ))}
                        </ul>
                        <strong>
                          (Poner Links)
                        </strong>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Lista de carreras
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseThree"
                    data-bs-parent="#carrersAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="font-medium text-lg">
                          ¿No encuentras la carrera que buscas? Prueba usando la misma nomenclatura que listamos a continuación.
                        </span>
                        <br />
                        <div className="py-3">
                          <span className="font-medium text-lg">
                            Licenciaturas:
                          </span>
                        </div>
                        <ul className="list-disc pl-10 pt-2 text-lg">
                          {CarrersList.map((carrer: string) => (
                            <li className="mb-2" key={carrer}>
                              {carrer}
                            </li>
                          ))}
                        </ul>
                        <div className="py-3">
                          <span className="font-medium text-lg">
                            TSU:
                          </span>
                        </div>
                        <ul className="list-disc pl-10 pt-2 text-lg">
                          {TSUList.map((tsu: string) => (
                            <li className="mb-2" key={tsu}>
                              {tsu}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            </div>
            <div
              className="collapse show collapse-horizontal"
              id="collapsePlatform"
            >
              <section id="plataformAccordion" className="accordion mt-4">
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwoDotOne"
                      aria-expanded="false"
                      aria-controls="collapseTwoDotOne"
                    >
                      ¿Compara Carreras te dice qué carrera es la mejor para estudiar?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseTwoDotOne"
                    data-bs-parent="#plataformAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="font-medium text-lg">
                          No, Compara Carreras es una herramienta que permite analizar indicadores del mercado laboral para que los jóvenes conozcan los beneficios y riesgos de una carrera. La herramienta te permite comparar las opciones de tu interés para tomar una decisión informada.
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwoDotTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwoDotTwo"
                    >
                      ¿Por qué no encuentro mi carrera?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseTwoDotTwo"
                    data-bs-parent="#plataformAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="font-medium text-lg">
                          Compara Carreras se basa en la Clasificación Mexicana de Programas de Estudio por Campos de Formación Académica en su versión 2016 para generar información sobre los programas. Esta clasificación contempla 118 campos detallados dentro de 10 áreas de estudio, según la similitud de sus objetivos, contenidos y métodos de estudio. Esta herramienta solo considera 65 campos detallados, esto se debe a que las carreras que quedaron fuera cuentan con muy pocas observaciones, lo que ocasiona que sus resultados sean poco confiables.
                        </span>
                        <br />
                        <br />
                        <span className="font-medium text-lg">
                          Es probable que la carrera que estás buscando se encuentre dentro de alguno de estos grupos. Para consultar lo anterior a detalle, te invitamos a buscar tu carrera en lista de clasificaciones para encontrar la carrera más similar dentro de Compara Carreras.
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwoDotThree"
                      aria-expanded="false"
                      aria-controls="collapseTwoDotThree"
                    >
                      ¿Qué es un TSU?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseTwoDotThree"
                    data-bs-parent="#plataformAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="font-medium text-lg">
                          Las carreras TSU son carreras Técnico Superior Universitario, popularmente conocidas como carreras técnicas. Estas carreras tienen una menor duración que una licenciatura, se enfocan en el conocimiento práctico con el fin de que sus egresados puedan ejercer lo más pronto posible. Estas carreras tienen ventajas como un menor desempleo y pueden llegar a tener mayores ingresos que ciertas licenciaturas.
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="accordion-item mb-4">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button text-xl font-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwoDotFour"
                      aria-expanded="false"
                      aria-controls="collapseTwoDotFour"
                    >
                      ¿Qué criterios se utilizan para la agrupación de carreras bajo un mismo campo?
                    </button>
                  </h3>
                  <div
                    className="accordion-collapse collapse"
                    id="collapseTwoDotFour"
                    data-bs-parent="#plataformAccordion"
                  >
                    <div className="accordion-body text-justify">
                      <div className="py-4 px-2">
                        <span className="font-medium text-lg">
                          De acuerdo con la clasificación oficial, las carreras se agrupan por su similitud en contenido teórico, propósitos de aprendizaje y objetos de estudio.
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
