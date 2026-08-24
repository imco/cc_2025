"use client"
import Image from 'next/image'

export default function SaberesBanner() {
  return (
    <a
      href="https://saberes.gob.mx/cms/index.php"
      target="_blank"
      rel="noopener noreferrer"
      className="saberes-banner"
    >
      <div className="saberes-banner-content">
        <h3 className="saberes-banner-title">
          <span className="saberes-banner-title-desktop">
            Un espacio para la democratización del conocimiento
          </span>
          <span className="saberes-banner-title-mobile">
            Un espacio para la democratización del conocimiento
          </span>
        </h3>
        <p className="saberes-banner-description">
          En <strong>SaberesMX</strong>, la plataforma de la Secretaría de Educación Pública, puedes seguir trayectorias formativas a través de cursos gratuitos que te permiten actualizar tus conocimientos de manera flexible, profundizar en áreas que sean de tu interés y fortalecer tu desarrollo académico y profesional.
        </p>
      </div>
      <div className="saberes-banner-logo-container">
        <Image
          src="/saberes/saberesmx-logo-limpio.png"
          alt="SaberesMX - Universidad para toda la vida"
          width={921}
          height={271}
          className="saberes-banner-logo saberes-home-logo"
        />
      </div>
    </a>
  )
}
