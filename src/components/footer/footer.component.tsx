"use client"
import Link from "next/link"
import { FacebookIcon, XIcon, InstagramIcon } from "@/components/icons"
import ParametrosGenerales from "@/parametros_generales.json"

export default function Footer() {
  return (
    <footer style={{ margin: 20 + "px" }}>
      <div className="footer-content">
        <p>© {ParametrosGenerales.anio.valor} ComparaCarreras. Todos los derechos reservados.</p>
        <p>
          Compara Carreras es una herramienta desarrollada por el Instituto Mexicano para la Competitividad, A.C. (IMCO). El IMCO es un centro de investigación apartidista y sin fines de lucro que investiga y actúa con base en evidencia para resolver los desafíos más importantes de México. Nuestra misión es proponer políticas públicas y acciones viables e influir en su ejecución para lograr un México próspero e incluyente.
        </p>
        <h2 className="footer-contacto">Contacto</h2>
        <p>
          Escríbenos a <a href="mailto:comparacarreras@imco.org.mx" style={{ color: "inherit" }} target="_blank">comparacarreras@imco.org.mx</a>
        </p>
        <div className="social-media">
          <a href="https://www.facebook.com/imcomx/" className="social-media-link" target="_blank" aria-label="Facebook">
            <FacebookIcon size={30} />
          </a>
          <a href="https://x.com/imcomx" className="social-media-link" target="_blank" aria-label="X (Twitter)">
            <XIcon size={26} />
          </a>
          <a href="https://www.instagram.com/imco_mx/?hl=en" className="social-media-link" target="_blank" aria-label="Instagram">
            <InstagramIcon size={30} />
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
          href="https://imco.org.mx/aviso-de-privacidad/"
          style={{ color: "inherit" }}
          target="_blank">
          Aviso de privacidad
        </a>
        <Link
          href="/accesibilidad"
          style={{ color: "inherit" }}>
          Accesibilidad
        </Link>
      </div>
    </footer>
  )
}
