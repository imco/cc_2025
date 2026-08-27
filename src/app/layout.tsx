"use client"
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";

import { usePathname } from "next/navigation";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import BootstrapClient from "@/components/bootstrap/bootstrap-loader.component";
import { LinksList } from "@/interfaces/navbar/links-lists.interface";
import { CarrerCards } from "@/interfaces/navbar/carrer-cards.data";
import ParametrosGenerales from "@/parametros_generales.json";
import LinkOptions from "@/interfaces/navbar/navbar-options.interface";
import Navbar from "@/components/navbar/navbar.component";
import Footer from "@/components/footer/footer.component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // con trailingSlash el pathname llega como "/compara/": se normaliza para los lookups
  const pathName = (usePathname() || "/").replace(/\/+$/, "") || "/"
  const link: LinkOptions | undefined = LinksList.find((link: LinkOptions) => link.url == pathName)
  // páginas de carrera: metadatos y miniatura propios (lookup generado)
  const card = link ?? CarrerCards[decodeURI(pathName)] ?? CarrerCards[pathName]

  const defaultDescription: string = `Cuántos profesionistas tiene cada carrera, cuáles tienen más mujeres y hombres, cuáles ofrecen mejor salario, cuáles carreras tienen una mayor tasa de desempleo, entre otras.`

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* progressive enhancement: marca que hay JS antes del primer paint.
            El contenido es visible por defecto; solo con esta clase se
            aplican los estados ocultos de las animaciones de entrada. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/*eslint-disable-next-line @next/next/no-page-custom-font*/}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
        <title>{`Compara Carreras - ${card?.title || `Carreras`}`}</title>
        <link rel="apple-touch-icon" href="/favicon.ico" />

        <link rel="canonical" href={card?.urlCanonical || `https://comparacarreras.imco.org.mx/las-10-mas`} />
        {/* <!-- for Google --> */}
        <meta name="description" content={card?.content || defaultDescription} />
        <meta
          name="keywords"
          content="carreras, universidades, ¿que estudiar?, carreras universitarias, las 10 más, cuanto ganan, en que trabajan" />
        <meta name="author" content="IMCO" />

        <meta name="copyright" content={`IMCO ${ParametrosGenerales.anio.valor}`} />
        <meta property="article:modified_time" content="time" />
        <meta name="application-name" content="Compara Carreras" />

        {/* <!-- for Facebook --> */}
        <meta property="og:title" content={`Compara Carreras - ${card?.title || `Carreras`}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={card?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta property="og:description" content={card?.content || defaultDescription} />
        <meta property="fb:app_id" content="141448832714787" />

        {/* <!-- for Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@imcomx" />
        <meta name="twitter:creator" content="@imcomx" />
        <meta
          property="og:url"
          content={card?.urlCanonical || "https://comparacarreras.imco.org.mx"}
        />
        <meta name="twitter:title" content={`Compara Carreras - ${card?.title || `Carreras`}`} />
        <meta name="twitter:description" content={card?.content || defaultDescription} />
        <meta property="og:image" content={card?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta name="twitter:image" content={card?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta name="twitter:domain" content="comparacarreras.org" />
      </head>
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <Navbar linksOptions={LinksList} />
        <main id="contenido">
          {children}
        </main>
        <Footer />
        <BootstrapClient />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJM2GX3X"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden'
            }}
          >
          </iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
      </body>
      <GoogleAnalytics gaId='G-J7CL260VSJ' />
      <GoogleTagManager gtmId="GTM-TJM2GX3X" />
    </html >
  );
}

/* *
 ? ⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠀⠀⠀
 ?⠀⠀⠀⠀⠀⢾⣏⣙⠻⡶⣤⡀⢀⣠⡴⠶⠛⠛⠋⠉⠉⠛⠛⠛⠶⠦⣄⣀⣤⢶⢟⡫⣝⣿⠂⠀⠀⠀
 ?⠀⠀⠀⠀⠀⠈⢿⣏⣷⢱⣉⣿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⣷⡎⣎⣱⡿⠁⠀⠀⠀⠀
 ?⠀⣰⡶⠶⣦⣤⣀⠉⠛⢷⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⠟⣋⣤⡴⠶⣶⣄⠀
 ?⠀⢻⣟⡖⢶⢬⣙⠻⣶⡾⠁⠀⠀⠀⣠⣄⠀⠀⠀⠀⠀⠀⠀⠀⣴⣷⡄⠀⠀⢸⡿⣍⠶⣱⢫⣼⡿⠀
 ?⠀⠀⠉⠻⠿⣶⣭⣷⣽⡇⠀⠀⠀⠘⢿⠿⠀⠀⣆⠀⠀⣰⡆⠀⠙⠋⠁⠀⠀⠠⣿⣾⠿⢟⣋⠁⠀⠀
 ?⠀⠀⣀⣀⣀⣀⣀⣉⣹⡇⠀⠀⠠⠀⠀⠀⠀⠀⠙⠷⠾⠟⠀⠀⠀⠀⠀⠀⠀⢰⣿⣛⢛⣋⡙⢿⣻⣦
 ?⢰⣿⣋⡙⣍⡹⢭⣩⢛⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣳⣬⣳⣬⣽⡶⠟⠋
 ?⠘⠻⢶⣿⣬⣷⣧⣮⣷⣾⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠉⠉⠉⠉⠉⠁⠀⠀⠀
 ?⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠈⠛⢶⣤⣀⠀⠀⣀⢀⡀⣀⣀⣤⣴⡞⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 ?
 */
