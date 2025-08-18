import Image from "next/image"

import sectoresPicture from "@/assets/images/metodology/picture-sectors.png"
import formulaPicture from "@/assets/images/metodology/picture-formula.png"
import returnRiskPicture from "@/assets/images/metodology/picture-return-risk.png"

export default function Metodologia() {
  return (
    <section id="metodologia" className="metodologia-section">
      <h2 className="section-title-metodologia mt-5">Metodología</h2>
      <div className="metodologia-content">
        <div className="metodologia-card">
          <h3>I. Indicadores del mercado laboral</h3>
          <p>Esta sección se basa en información de la Encuesta Nacional de Ocupación y Empleo (ENOE) del Instituto Nacional de Estadística y Geografía (INEGI) con datos de los últimos cuatro trimestres disponibles. Para la edición 2024 de Compara Carreras, estos son el segundo, tercer y cuarto trimestre de 2023, así como el primer trimestre de 2024.</p>
          <p>Las carreras consideradas se derivan de la Clasificación Mexicana de Planes de Estudio (CMPE) por campos de formación académica 2016 elaborada por el INEGI, la Secretaría de Educación Pública (SEP), la Secretaría del Trabajo y Previsión Social (STPS), la Asociación Nacional de Universidades e Instituciones de Educación Superior (ANUIES) y el Consejo Nacional de Ciencia y Tecnología (Conacyt).</p>
          <p>La CMPE organiza los programas de estudio en una estructura jerárquica que va de lo general a lo específico: Campo amplio, Campo específico, Campo detallado y Campo unitario. La información de Compara Carreras se presenta al nivel de agregación de Campo detallado e incluye aquellos campos cuyos datos en la ENOE cumplen criterios básicos de confiabilidad estadística en los cuatro trimestres tomados.</p>
        </div>

        <div className="metodologia-card">
          <h3>¿Cuántos son?</h3>
          <ul>
            <li><strong>Total:</strong> Se refiere al total de profesionistas de la carrera a nivel nacional.</li>
            <li><strong>Porcentaje de profesionistas:</strong> profesionistas de la carrera como porcentaje del total de profesionistas a nivel nacional.</li>
            <li><strong>Mujeres/Hombres:</strong> Segmentación por sexo de los profesionistas de la carrera.</li>
            <li><strong>Población Económicamente Activa (PEA):</strong> Población que actualmente cuenta con un trabajo o que está activamente buscando uno.</li>
            <li><strong>Población No Económicamente Activa (PNEA):</strong> Población que no está buscando un trabajo activamente o no está interesado en tener uno.</li>
            <li><strong>Desocupados:</strong> PEA que no tiene un empleo pero está en búsqueda de uno.</li>
            <li><strong>Disponibles:</strong> PNEA que no se encuentra activamente buscando un trabajo pero aceptaría uno si se le presentara una oportunidad.</li>
            <li><strong>No disponible:</strong> PNEA que no busca un empleo y no aceptaría uno aunque se le presentara una oportunidad.</li>
            <li><strong>Menos de 30 años/30 años y más:</strong> Segmentación por grupo de edad de los profesionistas de la carrera.</li>
            <li><strong>Desanimado:</strong> PNEA no disponible que no se dedica a estudiar, ni hacer tareas domésticas, no es una persona pensionada o jubilada ni tiene una incapacidad. No existe una limitante que no le permita aceptar o buscar un empleo.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>¿En qué trabajan?</h3>
          <ul>
            <li><strong>Ocupación:</strong> Porcentaje de profesionistas que cuentan con un empleo como proporción de aquellos que están activos en el mercado laboral (ocupados/PEA).</li>
            <li><strong>Desempleo:</strong> porcentaje de profesionistas desocupados como proporción de aquellos que están activos en el mercado laboral (desocupados/PEA).</li>
            <li><strong>Informalidad:</strong> Porcentaje de profesionistas ocupados que tienen un trabajo en la informalidad, esto es, un empleo no amparado por el marco legal (ej. trabajos sin protección de la seguridad social), como proporción de aquellos profesionistas ocupados (informales/ocupados).</li>
          </ul>
          <h4>Posición que ocupan:</h4>
          <p>Distribución de los profesionistas de la carrera que tienen un empleo, por tipo de posición en la ocupación:</p>
          <ul>
            <li><strong>Subordinado:</strong> Empleados que trabajan a cambio de un pago y dependen laboralmente de un jefe o superior.</li>
            <li><strong>Empleador:</strong> Trabajador que da empleo a personas a cambio de una remuneración económica.</li>
            <li><strong>Cuenta propia:</strong> Trabajadores que desempeñan su profesión solos o asociados con otros. Estos trabajadores disponen de sus propias herramientas o medios de producción y son dueños del bien o servicio que venden.</li>
            <li><strong>Trabajador sin pago:</strong> Personas ocupadas que trabajan sin recibir a cambio una remuneración económica.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>Principales sectores de actividad económica</h3>
          <p>Los primeros cinco sectores con mayor proporción de ocupados egresados de esta carrera. Esta clasificación se lleva a cabo de acuerdo con la variable Clasificación de la población ocupada según sector de actividad Subtotales (RAMA_EST2) de la ENOE que clasifica a la población ocupada en 11 categorías de actividad. Algunos nombres de las categorías fueron modificados para facilitar su interpretación, en la tabla siguiente se puede comparar el nombre original con el nombre utilizado en Compara Carreras.</p>
          <Image
            src={sectoresPicture.src}
            width={sectoresPicture.width}
            height={sectoresPicture.height}
            alt="Tabla de sectores de actividad económica" className="metodologia-image"
          />
        </div>

        <div className="metodologia-card">
          <h3>¿Cuánto ganan?</h3>
          <p><strong>Salario mensual:</strong> Para los cálculos salariales se consideran los ingresos reportados por aquellas personas ocupadas, que trabajaron al menos 35 horas a la semana con una remuneración mayor a cero.</p>
          <h4>Manejo de datos atípicos:</h4>
          <ol>
            <li>Se estima un estadístico para medir la dispersión de los salarios más altos de la distribución de ingresos por carrera.</li>
            <li>El estadístico es la razón entre los percentiles 80, 85, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 y máximo sobre el promedio del ingreso por carrera.</li>
            <li>Existe una observación atípica si este estadístico es mayor de la media de todas las carreras más dos desviaciones estándar.</li>
            <li>En ese caso, el salario promedio se calcula sobre los valores menores al percentil que presenta observaciones atípicas de esa carrera.</li>
          </ol>
          <p><strong>Salario promedio mensual:</strong> Promedio aritmético sin datos atípicos del salario mensual de los profesionistas de la carrera, ajustado por el factor correspondiente a la estimación del <a href="/One-pager Subestimación de ingresos.pdf"> subreporte de ingresos</a> ENOE-ENIGH a partir de una proyección para 2023.</p>
          <p>Para los valores de salario promedio por nivel educativo se utilizó el ingreso por persona de la Encuesta Nacional de Ingreso y Gasto de los Hogares (ENIGH) 2022. Este valor al reportar ingresos trimestrales se divide entre tres para calcular una aproximación del ingreso mensual. Posteriormente se proyectó el dato estimado para 2023 a partir de la masa salarial de Cuentas Nacionales del INEGI.</p>
          <ul>
            <li><strong>25% de los profesionistas gana menos de esta cantidad (P25):</strong> Salario mensual por debajo del cual está 25% de los profesionistas que menos ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario superior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte baja de la escala salarial de esta carrera, o un profesional con un desempeño inferior a la mediana.</li>
            <li><strong>Ingreso mediano:</strong> Salario mensual que divide a los profesionistas de una carrera en dos grupos de igual proporción, dejando 50% por debajo de ese salario y el otro 50% por arriba. Es una medida de cuánto podría estar ganando un profesional que se encuentre a la mitad de la escala salarial de esta carrera.</li>
            <li><strong>25% de los profesionistas gana más de esta cantidad (P75):</strong> Salario mensual por arriba del cual está 25% de los profesionistas que más ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario inferior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte alta de la escala salarial de esta carrera, o un profesional con un desempeño superior a la mediana.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>Salario con posgrado</h3>
          <ul>
            <li><strong>Obtienen posgrado:</strong> Porcentaje de profesionistas de cada carrera con estudios de maestría o doctorado.</li>
            <li><strong>Salario promedio mensual con posgrado:</strong> Promedio aritmético del salario de los profesionistas de esta carrera que tienen maestría o doctorado ajustado por el estimado del subreporte de ingresos para personas con posgrado del comparativo ENOE-ENIGH.</li>
            <li><strong>Incremento salarial con posgrado:</strong> Cambio porcentual en el salario promedio de los profesionistas con posgrado, respecto al promedio de los que sólo tienen licenciatura.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>II. Indicadores de matrícula</h3>
          <p>Esta sección se basa en información del Formato 911 de educación superior por carrera, elaborado por la SEP, el cual cuenta con información sobre el total de personas matriculadas durante el ciclo escolar 2022-2023, por programa de estudio, institución de educación superior y entidad federativa.</p>
          <ul>
            <li><strong>Universidades que imparten la carrera:</strong> Número total de universidades que ofrecen cada carrera.</li>
            <li><strong>Actualmente la cursan:</strong> Número total de estudiantes matriculados en la carrera en el ciclo escolar 2022-2023.</li>
            <li><strong>Top 5 en matrícula:</strong> Lista de las primeras cinco universidades con mayor número de estudiantes en la carrera y su distribución por sexo.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>III. Retorno sobre la inversión</h3>
          <p>Esta sección parte de presentar el costo total promedio de estudiar una carrera, el cual se construyó a partir de diversas fuentes:</p>
          <ol>
            <li>Contacto directo con universidades a través de sitio web y llamadas telefónicas, entre enero y mayo de 2024. Se obtuvo información de costos y duración de 40% de las licenciaturas y programas de técnico superior universitario. El resto de la información se obtuvo a partir de un ajuste inflacionario de los datos obtenidos en el levantamiento 2023.</li>
            <li>A los costos específicos de cada carrera y universidad se suma el gasto promedio en libros y materiales de las personas que asisten a instituciones de educación superior, con base en la ENIGH 2022 del INEGI.</li>
          </ol>
          <p>Para los cálculos de tiempo en recuperar la inversión y tasa de retorno anualizada sobre la inversión se construyó un perfil de ingresos a lo largo de la vida laboral de la persona, basado en el salario promedio que proviene de la ENOE (ver definición de salario promedio), como se explicó anteriormente.</p>
          <ul>
            <li><strong>Costo total carrera:</strong> Costo total de estudiar la carrera promediado para universidades públicas y privadas por separado. Incluye costos de inscripción, matrícula y examen de admisión, así como gastos en libros y materiales.</li>
            <li><strong>Tiempo para recuperar la inversión:</strong> Número de meses que debe trabajar un profesionista –que recibe el salario promedio de la carrera– para recuperar el costo total de su educación superior. Equivale al costo total de la carrera dividido entre el salario promedio.</li>
            <li><strong>Retorno sobre la inversión anualizado:</strong> Es una medida del rendimiento de la inversión en educación superior, expresada como una tasa de retorno anual. El retorno sobre la inversión anualizado permite comparar en términos financieros la decisión de estudiar una carrera contra otras alternativas de inversión como por ejemplo la bolsa, los bonos del Estado, pagarés, etc.</li>
          </ul>
          <p>Su cálculo se basa en la siguiente fórmula:</p>
          <Image
            src={formulaPicture.src}
            width={formulaPicture.width}
            height={formulaPicture.height}
            alt="Fórmula de retorno sobre la inversión" className="metodologia-image"
          />
          <p>Y supone que:</p>
          <ul>
            <li>La edad en la que una persona termina la preparatoria y decide si continuar o no con su educación universitaria es a los 18 años; y</li>
            <li>La vida laboral de una persona termina a los 63 años de edad.</li>
          </ul>
          <p>Teniendo en cuenta las siguientes definiciones:</p>
          <ul>
            <li><strong>Diferencial de ingreso vs. preparatoria:</strong> Ingresos extra que recibe un profesional respecto a los ingresos que obtiene una persona que solo terminó la preparatoria. Dado que la persona que decide estudiar una carrera sacrifica de 3 a 5 años de ingresos laborales, el diferencial de ingresos se calcula como los ingresos de la vida laboral de un profesional menos los ingresos que desde los 18 hasta los 63 años de edad recibe la persona con preparatoria.</li>
            <li><strong>Duración de la carrera:</strong> Promedio de años que tarda una persona en terminar la carrera en condiciones normales.</li>
          </ul>
          <p>* Es importante anotar que esta tasa puede estar subestimada pues el cálculo del retorno sobre la inversión no considera la existencia de becas (que disminuyen el costo total de estudiar la carrera), ni la posibilidad de que haya un premium en el mercado laboral para los egresados de ciertas universidades, posiblemente las más costosas, que podrían tener remuneraciones más altas (lo que implicaría mayores retornos para algunas universidades).</p>
        </div>

        <div className="metodologia-card">
          <h3>IV. Calidad de la inversión</h3>
          <p>Esta sección se basa en el retorno de inversión anualizado calculado para cada carrera en universidad pública y privada, y en información de la ENOE del INEGI de los últimos cuatro trimestres disponibles. (Ver descripción de la sección I. Indicadores de mercado laboral)</p>
          <ul>
            <li><strong>Rendimiento sobre la inversión anualizado:</strong> Ver sección III.</li>
            <li><strong>Probabilidad de acceder a un empleo de calidad (PAEC):</strong> Uno menos el porcentaje de todas las personas que estudiaron cada carrera que se encuentran desempleadas, trabajando en el sector informal o forman parte de la población desanimada. Esto nos indica el porcentaje de profesionistas que se encuentran en una situación laboral favorable.</li>
          </ul>
          <p>El siguiente gráfico muestra el retorno sobre la inversión anualizada de cada carrera (eje vertical) y la PAEC asociada a la misma carrera (eje horizontal). Se trazó una línea de PAEC/Rendimiento promedio (RRP) pasando por los puntos 0% RSI 0% PAEC y el RSI y PAEC promedio. Se calculó la distancia perpendicular de cada punto por encima y por debajo de esta línea. Este análisis se realizó independientemente para el RSI público y el RSI privado.</p>
          <Image
            src={returnRiskPicture.src}
            width={returnRiskPicture.width}
            height={returnRiskPicture.height}
            alt="Gráfico de Retorno vs Riesgo"
            className="metodologia-image"
          />
          <p>A partir de las distancias de los puntos (carreras), se obtiene la siguiente clasificación sobre la calidad de inversión para cada una de las carreras analizadas:</p>
          <ul>
            <li><strong>Excelentes (verde oscuro):</strong> Carreras con distancia por encima del promedio.</li>
            <li><strong>Buenas (verde claro):</strong> Carreras debajo del promedio pero por encima de la línea RRP.</li>
            <li><strong>Insegura (amarillo):</strong> Carreras por debajo de la línea RRP con distancia absoluta por debajo del promedio.</li>
            <li><strong>Muy insegura (rojo):</strong> Carreras por encima del promedio pero debajo de la línea RRP.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
