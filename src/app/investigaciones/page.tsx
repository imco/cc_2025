import ResearchCard from "@/components/investigaciones/research-card.component";
import { RESEARCH_PUBLICATIONS } from "./data.constants";

export default function Investigaciones() {
  return (
    <section id="investigaciones" className="investigaciones-section">
      <div className="container">
        <h1 className="section-title">Investigaciones</h1>
        <p className="section-subtitle">
          Conoce las ediciones anteriores de Compara Carreras y nuestras investigaciones
          sobre el mercado laboral y la educación superior en México.
        </p>

        <div className="research-grid">
          {RESEARCH_PUBLICATIONS.map((research) => (
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>
      </div>
    </section>
  );
}
