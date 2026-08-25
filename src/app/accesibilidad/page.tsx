export default function Accesibilidad() {
  return (
    <section id="accesibilidad" className="metodologia-section">
      <h1 className="section-title-metodologia mt-5">Declaración de accesibilidad</h1>
      <div className="metodologia-content">
        <div className="metodologia-card">
          <p>El Instituto Mexicano para la Competitividad (IMCO) quiere que Compara Carreras sea una herramienta útil para todas las personas, incluidas quienes usan tecnologías de asistencia como lectores de pantalla, navegación por teclado o preferencias de movimiento reducido.</p>
          <p>Nuestro objetivo es cumplir con las <strong>Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA</strong>.</p>
        </div>

        <div className="metodologia-card">
          <h2>Medidas implementadas</h2>
          <ul>
            <li>Navegación completa por teclado, con indicador de foco visible y enlace para saltar al contenido.</li>
            <li>Estructura semántica con encabezados jerárquicos y regiones etiquetadas en todas las páginas.</li>
            <li>Las gráficas describen sus datos en texto para lectores de pantalla.</li>
            <li>Contrastes de color que cumplen la relación mínima de 4.5:1.</li>
            <li>Formularios y buscadores con etiquetas accesibles.</li>
            <li>Respeto a la preferencia de movimiento reducido del sistema.</li>
            <li>Los cambios dinámicos de contenido se anuncian a las tecnologías de asistencia.</li>
          </ul>
        </div>

        <div className="metodologia-card">
          <h2>¿Encontraste una barrera?</h2>
          <p>Si alguna parte del sitio te resulta difícil o imposible de usar, escríbenos a <a href="mailto:comparacarreras@imco.org.mx">comparacarreras@imco.org.mx</a> describiendo la página y el problema. Tu reporte nos ayuda a mejorar la herramienta para todas las personas.</p>
        </div>
      </div>
    </section>
  )
}
