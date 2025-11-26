import { Research } from "@/interfaces/research/research.interface";
import Image from "next/image";

interface ResearchCardProps {
  research: Research;
}

export default function ResearchCard({ research }: ResearchCardProps) {
  return (
    <div className="research-card">
      {research.imageUrl && (
        <div className="research-image-container">
          <Image
            src={research.imageUrl}
            alt={research.title}
            width={400}
            height={225}
            className="research-image"
            unoptimized
          />
        </div>
      )}
      <div className="research-card-header">
        <span className="research-year">{research.year}</span>
      </div>
      <div className="research-card-body">
        {!research.imageUrl && <h3 className="research-title">{research.title}</h3>}
        <p className="research-description">{research.description}</p>
      </div>
      <div className="research-card-footer">
        <a
          href={research.url}
          target="_blank"
          rel="noopener noreferrer"
          className="research-link"
        >
          Ver investigación
          <svg
            className="external-link-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
