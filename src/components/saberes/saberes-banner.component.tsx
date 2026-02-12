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
            Certificaciones para seguir aprendiendo
          </span>
          <span className="saberes-banner-title-mobile">
            Aquí encontrarás certificaciones para seguir aprendiendo
          </span>
        </h3>
        <p className="saberes-banner-description">
          <span className="saberes-banner-description-intro">
            Las <strong>microcredenciales</strong> te permiten actualizar tus conocimientos y desarrollar habilidades clave de forma flexible.
          </span>{" "}
          <span>
            En <strong>SaberesMx</strong> la plataforma de la Secretaría de Educación Pública puedes obtener certificaciones gratuitas para profundizar en tu área de interés y fortalecer tu desarrollo profesional.
          </span>
        </p>
      </div>
      <div className="saberes-banner-logo-container">
        <Image
          src="/saberes/saberesmx-logo.png"
          alt="SaberesMX - Universidad para toda la vida"
          width={450}
          height={150}
          className="saberes-banner-logo"
        />
      </div>
    </a>
  )
}
