export default function CalculadoraRoiPage() {
  return (
    <section id="roi-section" className="metodologia-section mt-5">
      <h2 className="section-title-metodologia">Calculadora de ROI</h2>

      <div className="metodologia-content">
        <div className="metodologia-card">
          <p>
            Próximamente podrás estimar el retorno sobre la inversión de estudiar una carrera universitaria.
          </p>
          <p>
            Aquí podrás ingresar datos como el costo total de la carrera, el ingreso mensual esperado al egresar
            y el tiempo estimado para recuperar tu inversión.
          </p>
          <p>
            Esta herramienta está en construcción.
          </p>
        </div>

        <div className="metodologia-card">
          <h3>Zona interactiva</h3>
          <p>
            En este espacio aparecerá la calculadora con campos y resultados dinámicos (ROI estimado, punto de equilibrio, etc.).
          </p>
          <div
            style={{
              minHeight: "200px",
              border: "1px dashed rgba(255,255,255,0.4)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            Aquí irá la calculadora de ROI
          </div>
        </div>
      </div>
    </section>
  );
}
