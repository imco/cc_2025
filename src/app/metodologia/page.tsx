import Image from "next/image"

import sectoresPicture from "@/assets/images/metodology/picture-sectors.png"

export default function Metodologia() {
  return (
    <section id="metodologia" className="metodologia-section">
      <h2 className="section-title-metodologia mt-5">Metodología</h2>
      <div className="metodologia-content">
        <div className="metodologia-card">
          <p>Compara Carreras es una herramienta del Instituto Mexicano para la Competitividad (IMCO). Reúne información sobre las condiciones laborales, los ingresos y la oferta educativa de las carreras que se estudian en México. Su propósito es que las personas jóvenes decidan con evidencia. La edición 2026 cubre 65 campos de estudio de licenciatura y 14 de Técnico Superior Universitario (TSU).</p>
          <p>Este documento describe cómo se construye cada indicador que publica la plataforma. Explica de dónde salen los datos, a qué población se refieren, qué filtros de calidad estadística se aplican y cómo deben leerse.</p>
        </div>

        <div className="metodologia-card">
          <h3>I. Indicadores del mercado laboral</h3>
          <p>Esta sección se elabora con los microdatos de la Encuesta Nacional de Ocupación y Empleo (ENOE) del INEGI. Se utilizan los cuatro trimestres más recientes disponibles al cierre de la edición. Para 2026 estos son el segundo, tercero y cuarto trimestre de 2025 y el primer trimestre de 2026.</p>
          <p>Cada trimestre se procesa por separado y después se promedian los resultados. Las tasas se recalculan sobre esos promedios. Todos los cálculos incorporan el diseño muestral complejo de la ENOE, es decir, sus unidades primarias de muestreo, sus estratos y su factor de expansión trimestral.</p>
          <p>Las carreras que se presentan provienen de la Clasificación Mexicana de Programas de Estudio por Campos de Formación Académica 2016 (CMPE 2016). La CMPE organiza los programas de estudio de lo general a lo específico en cuatro niveles: campo amplio, campo específico, campo detallado y campo unitario. Compara Carreras publica la información al nivel de campo detallado.</p>
          <h4>Universo de análisis y criterios de confiabilidad</h4>
          <p>El universo está formado por personas de 15 a 98 años, residentes habituales del hogar y con entrevista completa. Para los indicadores de licenciatura se considera a quienes concluyeron una carrera profesional o un posgrado. Para los indicadores de TSU se considera a quienes concluyeron una carrera técnica.</p>
          <p>Un campo detallado se publica solo si sus estimaciones cumplen criterios básicos de confiabilidad estadística en los cuatro trimestres considerados. El criterio es un coeficiente de variación menor o igual a 15%. Se aplica por separado a dos estimaciones:</p>
          <ul>
            <li>El total de personas del campo, para los indicadores de población.</li>
            <li>El salario promedio del campo, para los indicadores de ingreso.</li>
          </ul>
          <p>Por eso hay campos que aparecen en los indicadores de población y quedan fuera de los de salario. Los registros sin clave de carrera válida se excluyen del análisis. Con estos criterios, la edición 2026 publica 65 campos de licenciatura y 14 de TSU.</p>
        </div>

        <div className="metodologia-card">
          <h3>¿Cuántos son?</h3>
          <p>Total nacional de personas que estudiaron la carrera, con su distribución por género y por grupo de edad.</p>
          <ul>
            <li><strong>Total:</strong> Personas que concluyeron la carrera, a nivel nacional.</li>
            <li><strong>Porcentaje de profesionistas:</strong> Personas de la carrera como proporción del total nacional de personas con carrera.</li>
            <li><strong>Distribución por género:</strong> Mujeres y hombres como proporción del total de la carrera.</li>
            <li><strong>Distribución por edad:</strong> Personas menores de 30 años y de 30 años y más, como proporción del total de la carrera.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>¿En qué trabajan?</h3>
          <p>Principales características laborales de quienes estudiaron la carrera.</p>
          <ul>
            <li><strong>Tasa de ocupación:</strong> Personas ocupadas como proporción de la población económicamente activa (ocupados / PEA).</li>
            <li><strong>Tasa de desempleo:</strong> Personas desocupadas, es decir, sin empleo y en búsqueda de uno, como proporción de la población económicamente activa (desocupados / PEA).</li>
            <li><strong>Tasa de informalidad:</strong> Personas ocupadas en un empleo no amparado por el marco legal, por ejemplo sin acceso a seguridad social, como proporción del total de personas ocupadas (informales / ocupados).</li>
            <li><strong>¿Cuántos trabajan en lo que estudiaron?:</strong> Personas ocupadas cuya ocupación está directamente vinculada con la carrera que cursaron, como proporción del total de personas ocupadas de esa carrera.</li>
            <li><strong>Probabilidad de obtener un empleo de calidad:</strong> Complemento de la tasa de riesgo laboral. Es la probabilidad de que una persona de esa carrera tenga empleo, trabaje en la formalidad y siga participando en el mercado laboral.</li>
          </ul>

          <h4>Ejercicio profesional: ¿cuántos trabajan en lo que estudiaron?</h4>
          <p>Este indicador se incorpora por primera vez en la edición 2026. Mide la proporción de personas ocupadas cuya ocupación está directamente vinculada con la carrera que cursaron.</p>
          <p>El IMCO construyó una correspondencia entre los campos detallados de la CMPE 2016 y las ocupaciones del Sistema Nacional de Clasificación de Ocupaciones (SINCO) 2019. Cada combinación de carrera y ocupación se revisó de manera individual para determinar si existe una relación directa entre la formación recibida y el trabajo desempeñado. El catálogo resultante contiene 1,538 pares de carrera y ocupación, cada uno con su justificación. Cuando la ocupación que declara la persona aparece en el catálogo de su carrera, se considera que ejerce.</p>
          <p>El cálculo utiliza la variable de ocupación del cuestionario de ocupación y empleo de la ENOE. El universo incluye a las personas ocupadas que reportaron tanto su carrera como su ocupación. Se excluye a las personas desocupadas y a los casos en los que falta alguna de esas dos variables. El indicador se calcula para licenciatura, posgrado y TSU.</p>

          <h4>Probabilidad de obtener un empleo de calidad</h4>
          <p>Sustituye a la presentación directa de la tasa de riesgo laboral en la ficha de carrera. La tasa de riesgo laboral es la probabilidad de que una persona de la carrera esté desempleada, trabaje en la informalidad o haya dejado de buscar empleo por desánimo.</p>
          <p className="metodologia-formula">
            <em>Probabilidad de obtener un empleo de calidad</em>&nbsp;=&nbsp;1&nbsp;−&nbsp;<em>Tasa de riesgo laboral</em>
          </p>
          <p>La tasa de riesgo laboral se sigue publicando en el listado de las 10 carreras con mayor riesgo.</p>

          <h4>Principales sectores en los que trabajan</h4>
          <p>Distribución de las personas ocupadas de la carrera entre los sectores de actividad económica, ordenada de mayor a menor. Se utiliza la clasificación de la población ocupada por sector de actividad de la ENOE, que agrupa la actividad en once categorías. La ficha de carrera presenta las once. Algunos nombres se acortan para facilitar su lectura y conservan el contenido de la categoría original.</p>
          <Image
            src={sectoresPicture.src}
            width={sectoresPicture.width}
            height={sectoresPicture.height}
            alt="Tabla de sectores de actividad económica"
            className="metodologia-image"
          />

          <h4>Posición que ocupan</h4>
          <p>Distribución de las personas ocupadas de la carrera según su posición en la ocupación.</p>
          <ul>
            <li><strong>Subordinado:</strong> Persona que trabaja a cambio de un pago y depende laboralmente de un jefe o superior.</li>
            <li><strong>Empleador:</strong> Persona que da empleo a otras a cambio de una remuneración económica.</li>
            <li><strong>Cuenta propia:</strong> Persona que desempeña su profesión sola o asociada con otras. Dispone de sus propias herramientas o medios de producción y es dueña del bien o servicio que vende.</li>
            <li><strong>Trabajador sin pago:</strong> Persona ocupada que trabaja sin recibir a cambio una remuneración económica.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>¿Cuánto ganan?</h3>
          <p>Para los indicadores de ingreso se considera solo a las personas ocupadas que trabajan 30 horas o más a la semana y reportan un ingreso laboral mayor a cero.</p>
          <h4>Manejo de datos atípicos</h4>
          <p>Antes de calcular el promedio se identifican los valores extremos en la parte alta de la distribución de ingresos de cada carrera. El procedimiento tiene tres pasos:</p>
          <ol>
            <li>Se calcula la razón entre el valor de cada uno de los percentiles 80, 85, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 y el máximo, respecto del ingreso promedio de la carrera.</li>
            <li>Se considera que existe una observación atípica si esa razón supera el promedio de todas las carreras más dos desviaciones estándar.</li>
            <li>En ese caso, el salario promedio de la carrera se calcula solo sobre los valores menores al percentil donde se detectó el dato atípico.</li>
          </ol>
          <h4>Ajuste por subreporte de ingresos</h4>
          <p>Los ingresos de la ENOE se ajustan al alza para corregir el <a href="/One-pager Subestimación de ingresos.pdf">subreporte</a> que caracteriza a esta encuesta. El factor de ajuste se estima por nivel de escolaridad. Compara el ingreso laboral promedio que reporta la ENOE de 2024 con el que reporta la Encuesta Nacional de Ingresos y Gastos de los Hogares (ENIGH) 2024, la fuente más reciente disponible.</p>
          <h4>Indicadores publicados</h4>
          <ul>
            <li><strong>Salario promedio mensual:</strong> Promedio aritmético del salario mensual de las personas de la carrera, sin datos atípicos y ajustado por subreporte.</li>
            <li><strong>Comparación con la población ocupada:</strong> Salario mensual promedio de toda la población ocupada de México, en cualquier nivel de escolaridad. Se muestra como punto de referencia.</li>
            <li><strong>Lugar en el ranking salarial:</strong> Posición de la carrera en el ordenamiento de las 65 licenciaturas por salario promedio mensual, de mayor a menor.</li>
            <li><strong>25% de los profesionistas gana menos de esta cantidad (P25):</strong> Salario mensual por debajo del cual se ubica el 25% de las personas que menos ganan. Aproxima el ingreso de una persona en la parte baja de la escala salarial de la carrera.</li>
            <li><strong>Mediana:</strong> Salario mensual que divide a las personas de la carrera en dos mitades iguales. Aproxima el ingreso de una persona en la mitad de la escala salarial.</li>
            <li><strong>25% de los profesionistas gana más de esta cantidad (P75):</strong> Salario mensual por arriba del cual se ubica el 25% de las personas que más ganan. Aproxima el ingreso de una persona en la parte alta de la escala salarial.</li>
            <li><strong>Salario por género:</strong> Salario promedio mensual de las mujeres y de los hombres de la carrera.</li>
            <li><strong>Salario por grupo de edad:</strong> Salario promedio mensual de las personas menores de 30 años y de las de 30 años y más.</li>
            <li><strong>Salario por condición de formalidad:</strong> Salario promedio mensual de las personas ocupadas en el sector formal y en el informal.</li>
            <li><strong>Obtienen posgrado:</strong> Porcentaje de personas de la carrera con estudios de maestría o doctorado concluidos.</li>
            <li><strong>Salario promedio mensual con posgrado:</strong> Salario promedio de quienes tienen maestría o doctorado, ajustado con el factor de subreporte de posgrado.</li>
            <li><strong>Incremento salarial con posgrado:</strong> Cambio porcentual entre el salario promedio con posgrado y el salario promedio de quienes solo concluyeron la licenciatura.</li>
          </ul>
          <p className="metodologia-nota"><em>Las desagregaciones salariales por género y por edad a nivel de carrera individual son más ruidosas que el promedio. El filtro de coeficiente de variación se aplica al salario total de la carrera y cada subgrupo queda fuera de esa verificación.</em></p>
        </div>

        <div className="metodologia-card">
          <h3>II. Indicadores de matrícula y demanda</h3>
          <p>Esta sección se elabora con los Anuarios Estadísticos de Educación Superior de la ANUIES, correspondientes al ciclo escolar 2024-2025. La fuente reporta, por programa de estudio y por institución, la matrícula total, el nuevo ingreso, el egreso, los lugares ofertados y las solicitudes de nuevo ingreso. También distingue el sostenimiento público o privado de cada institución.</p>
          <p>Los programas de la ANUIES se agregan a los campos detallados de la CMPE 2016 para que sean comparables con los indicadores laborales.</p>
          <ul>
            <li><strong>Matrícula actual (estudiantes inscritos):</strong> Total de personas inscritas en la carrera durante el ciclo escolar 2024-2025.</li>
            <li><strong>Nuevos egresados al mercado laboral:</strong> Total de personas que concluyeron la carrera en el último ciclo escolar reportado.</li>
            <li><strong>Nuevo ingreso:</strong> Total de personas que ingresaron a la carrera en el ciclo escolar, con su desagregación por sexo.</li>
            <li><strong>Lugares ofertados:</strong> Lugares que las instituciones pusieron a disposición para nuevo ingreso.</li>
            <li><strong>Solicitudes de nuevo ingreso:</strong> Solicitudes recibidas para ingresar a la carrera.</li>
            <li><strong>Porcentaje de aceptación:</strong> Lugares ofertados entre solicitudes de nuevo ingreso, calculado solo para instituciones públicas. Cuanto menor es el porcentaje, más competida está la carrera.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h3>III. Calculadora del retorno sobre la inversión</h3>
          <p>La calculadora de retorno sobre la inversión (ROI) estima la tasa de retorno anualizada a partir de la información que proporciona la persona usuaria. Con base en los datos que ingresa, es decir, la carrera, los costos y la duración del plan de estudios, el sistema genera los valores correspondientes a tres indicadores.</p>
          <ul>
            <li><strong>Costo total de la carrera:</strong> Costo total de estudiar la carrera. Se obtiene al multiplicar el número de periodos que dura la carrera por el costo de cada periodo.</li>
            <li><strong>Tiempo para recuperar la inversión:</strong> Número de meses que debe trabajar un profesionista con el salario promedio de la carrera para recuperar el costo total de su educación superior. Equivale al costo total de la carrera dividido entre el salario promedio.</li>
            <li><strong>Retorno sobre la inversión anualizado:</strong> Medida del rendimiento de la inversión en educación superior, expresada como una tasa de retorno anual. Permite comparar en términos financieros la decisión de estudiar una carrera contra otras alternativas de inversión, como la bolsa, los bonos del Estado o los pagarés.</li>
          </ul>
          <p>Su cálculo se basa en la siguiente fórmula:</p>
          <p className="metodologia-formula formula-roi">
            <em>ROI</em><sub>anualizado</sub>&nbsp;=&nbsp;
            <span className="formula-corchete">[</span>
            <span className="formula-potencia">
              <span className="formula-parentesis">(</span>
              <span className="formula-fraccion">
                <span className="formula-numerador">Diferencial de ingreso vs. preparatoria</span>
                <span className="formula-denominador">Costo total de la carrera</span>
              </span>
              <span className="formula-parentesis">)</span>
              <sup className="formula-exponente">1&thinsp;/&thinsp;(65 − (18 + duración de la carrera))</sup>
            </span>
            <span className="formula-corchete">]</span>
            &nbsp;−&nbsp;1
          </p>
          <p>Y supone que:</p>
          <ul>
            <li>La edad en la que una persona termina la preparatoria y decide si continuar o no con su educación universitaria es a los 18 años.</li>
            <li>La vida laboral de una persona termina a los 65 años de edad.</li>
          </ul>
          <p>Teniendo en cuenta las siguientes definiciones:</p>
          <ul>
            <li><strong>Diferencial de ingreso vs. preparatoria:</strong> Ingresos extra que recibe un profesional respecto a los ingresos que obtiene una persona que solo terminó la preparatoria. La persona que decide estudiar una carrera sacrifica años de ingresos laborales. Por eso el diferencial se calcula como los ingresos de la vida laboral de un profesional menos los ingresos que recibe la persona con preparatoria desde los 18 hasta los 65 años de edad.</li>
            <li><strong>Duración de la carrera:</strong> Años que tarda una persona en terminar la carrera. Este dato se calcula según el tipo de periodo que ingresó la persona usuaria.</li>
          </ul>
          <p>El resultado se presenta junto con el rendimiento anual de tres alternativas de inversión de referencia, que son los Cetes, el oro y el S&amp;P 500. Sus valores y su fecha de corte se actualizan en cada edición.</p>
          <p className="metodologia-nota"><em>Es importante anotar que esta tasa puede estar subestimada. El cálculo del retorno sobre la inversión deja fuera la posibilidad de que exista una prima en el mercado laboral para las personas egresadas de ciertas universidades, posiblemente las más costosas, que podrían tener remuneraciones más altas. Eso implicaría mayores retornos para algunas universidades.</em></p>
          <p className="metodologia-nota"><em>Tampoco es posible distinguir los ingresos de quienes egresaron de universidades públicas y de universidades privadas. En ambos casos se utiliza el salario promedio nacional de la carrera. Como los ingresos son iguales, la rentabilidad queda determinada por el costo.</em></p>
        </div>
      </div>
    </section>
  )
}
