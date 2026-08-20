"use client"
import Image from 'next/image'
import imcoLogo from '@/assets/images/logo_imco_blanco_transparente.png'

export default function ImcoBanner() {
  return (
    <a
      href="https://imco.org.mx/"
      target="_blank"
      rel="noopener noreferrer"
      className="saberes-banner imco-banner"
    >
      <div className="saberes-banner-content">
        <h3 className="saberes-banner-title">
          <span className="saberes-banner-title-desktop">Conoce el IMCO</span>
          <span className="saberes-banner-title-mobile">Conoce el IMCO</span>
        </h3>
        <p className="saberes-banner-description">
          Somos un centro de investigación en política pública que propone
          soluciones efectivas a los desafíos más importantes de México.
          Apartidistas y sin fines de lucro, proponemos política pública para
          transformar la vida de las personas y promover el libre ejercicio de
          sus derechos.
        </p>
      </div>
      <div className="saberes-banner-logo-container">
        <Image
          src={imcoLogo}
          alt="IMCO"
          width={imcoLogo.width}
          height={imcoLogo.height}
          className="saberes-banner-logo imco-banner-logo"
        />
      </div>
    </a>
  )
}
