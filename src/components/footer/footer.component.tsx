"use client"
export default function Footer() {
  return (
    <footer className="bg-principal text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Description Column */}
          <div className="md:col-span-8">
            <p className="text-sm font-light text-justify">
              Compara Carreras es una herramienta desarrollada por el Instituto Mexicano para la Competitividad, A.C. (IMCO). El IMCO es un centro de investigación apartidista y sin fines de lucro que investiga y actúa con base en evidencia para resolver los desafíos más importantes de México. Nuestra misión es proponer políticas públicas y acciones viables e influir en su ejecución para lograr un México próspero e incluyente.
            </p>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-sm font-light mb-2">
              Escríbenos a{' '}
              <a
                href="mailto:comparacarreras@imco.org.mx"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                comparacarreras@imco.org.mx
              </a>
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.facebook.com/IMCOmx"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook text-lg"></i>
              </a>
              <a
                href="https://twitter.com/imcomx"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter text-lg"></i>
              </a>
              <a
                href="https://www.instagram.com/imcomx/"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram text-lg"></i>
              </a>
            </div>

            {/* Additional Links */}
            <div className="text-sm font-light">
              <a
                href="https://imco.org.mx/"
                className="hover:text-accent transition-colors block mb-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sitio web del IMCO
              </a>
              <a
                href="https://imco.org.mx/aviso-de-privacidad/"
                className="hover:text-accent transition-colors block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aviso de privacidad
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p className="text-sm font-light">
            © {new Date().getFullYear()} ComparaCarreras. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
