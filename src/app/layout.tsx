"use client"
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

import BootstrapClient from "@/components/bootstrap/bootstrap-loader.component";
import { LinksList } from "@/interfaces/navbar/links-lists.interface";
import LinkOptions from "@/interfaces/navbar/navbar-options.interface";
import Navbar from "@/components/navbar/navbar.component";
import Footer from "@/components/footer/footer.component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname()
  const link: LinkOptions | undefined = LinksList.find((link: LinkOptions) => link.url == pathName)

  const defaultDescription: string = `Cuántos profesionistas tiene cada carrera, cuáles tienen más mujeres y hombres, cuáles ofrecen mejor salario, cuáles carreras tienen una mayor tasa de desempleo, entre otras.`

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Import Google Icon Font */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <title>{`Compara Carreras - ${link?.title || `Carreras`}`}</title>
        <link rel="apple-touch-icon" href="/favicon.ico" />

        <link rel="canonical" href={link?.urlCanonical || `https://comparacarreras.imco.org.mx/las-10-mas`} />
        {/* <!-- for Google --> */}
        <meta name="description" content={link?.content || defaultDescription} />
        <meta
          name="keywords"
          content="carreras, universidades, ¿que estudiar?, carreras universitarias, las 10 más, cuanto ganan, en que trabajan" />
        <meta name="author" content="IMCO" />

        <meta name="copyright" content="IMCO 2024" />
        <meta property="article:modified_time" content="time" />
        <meta name="application-name" content="Compara Carreras" />

        {/* <!-- for Facebook --> */}
        <meta property="og:title" content={`Compara Carreras - ${link?.title || `Carreras`}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={link?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta property="og:description" content={link?.content || defaultDescription} />

        {/* <!-- for Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@imcomx" />
        <meta name="twitter:creator" content="@imcomx" />
        <meta
          property="og:url"
          content="https://imco.org.mx/comparacarreras/"
        />
        <meta name="twitter:title" content={`Compara Carreras - ${link?.title || `Carreras`}`} />
        <meta name="twitter:description" content={link?.content || defaultDescription} />
        <meta property="og:image" content={link?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta name="twitter:image" content={link?.urlMiniatura || `https://comparacarreras.imco.org.mx/mini-10mas.png`} />
        <meta name="twitter:domain" content="comparacarreras.org" />
      </head>
      <body>
        <Navbar linksOptions={LinksList} />
        {children}
        <Footer />
        <BootstrapClient />
      </body>
      <GoogleTagManager gtmId="G-J7CL260VSJ" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js" />
    </html>
  );
}
