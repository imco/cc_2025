import ResearchCard from "@/components/investigaciones/research-card.component";
import { RESEARCH_CONFIG } from "./data.constants";
import { fetchResearchMetadata } from "@/utils/metadata-fetcher";
import { Research } from "@/interfaces/research/research.interface";

export default async function InvestigacionesPage() {
  // Fetch metadata for all configured researches
  const researches: Research[] = await Promise.all(
    RESEARCH_CONFIG.map(async (config) => {
      const metadata = await fetchResearchMetadata(config.url);
      return {
        id: config.id,
        year: config.year,
        url: config.url,
        title: metadata.title || `Compara Carreras ${config.year}`,
        description: metadata.description || "Información sobre Compara Carreras",
        imageUrl: metadata.imageUrl,
        publishDate: config.year.toString(),
      };
    })
  );

  return (
    <main className="investigaciones-section">
      <div className="container">
        <h1 className="section-title">Investigaciones</h1>
        <p className="section-subtitle">
          Conoce las ediciones anteriores de Compara Carreras y nuestras investigaciones sobre el mercado laboral y la educación superior en México.
        </p>

        <div className="research-grid">
          {researches.map((research) => (
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>
      </div>
    </main>
  );
}
