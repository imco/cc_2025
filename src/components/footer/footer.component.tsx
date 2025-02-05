"use client"
import Image from "next/image"

import logoFacebook from "@/assets/images/social-media/logoFB.png"
import logoInstragram from "@/assets/images/social-media/logoIG.png"
import logoX from "@/assets/images/social-media/logoX.png"

export default function Footer() {
  return (
    <footer style={{ margin: 20 + "px" }}>
      <div className="footer-content">
        <p>© 2025 ComparaCarreras. Todos los derechos reservados.</p>
        <p>
          Compara Carreras es una herramienta desarrollada por el Instituto Mexicano para la Competitividad, A.C. (IMCO). El IMCO es un centro de investigación apartidista y sin fines de lucro que investiga y actúa con base en evidencia para resolver los desafíos más importantes de México. Nuestra misión es proponer políticas públicas y acciones viables e influir en su ejecución para lograr un México próspero e incluyente.
        </p>
        <h4>Contacto</h4>
        <p>
          Escríbenos a <a href="mailto:comparacarreras@imco.org.mx" style={{ color: "inherit" }} target="_blank">comparacarreras@imco.org.mx</a>
        </p>
        <div className="social-media">
          <a href="https://www.facebook.com/imcomx/" className="social-media-link" target="_blank">
            <Image
              src={logoFacebook.src}
              alt="Facebook"
              width={40}
              height={40}
              style={{
                width: 40 + "px",
                height: 40 + "px",
                paddingRight: 5 + "px"
              }}
            />
          </a>
          <a href="https://x.com/imcomx" className="social-media-link" target="_blank">
            <Image
              src={logoX}
              alt="Twitter"
              width={40}
              height={40}
              style={{
                width: 40 + "px",
                height: 40 + "px",
                paddingRight: 5 + "px",
                paddingLeft: 5 + "px"
              }}
            />
          </a>
          <a href="https://www.instagram.com/imco_mx/?hl=en" className="social-media-link" target="_blank">
            <Image
              src={logoInstragram.src}
              alt="Instagram"
              width={40}
              height={40}
              style={{
                width: 40 + "px",
                height: 40 + "px",
                paddingRight: 5 + "px"
              }}
            />
          </a>
        </div>
      </div>
      <div className="footer-links">
        <a
          href="https://imco.org.mx"
          style={{ color: "inherit" }}
          target="_blank"
        >
          Sitio web del IMCO
        </a>
        <a
          href="Aviso de privacidad_  Compara Carreras 2024.pdf"
          style={{ color: "inherit" }}
          target="_blank">
          Aviso de privacidad
        </a>
      </div>
    </footer>
  )
}
