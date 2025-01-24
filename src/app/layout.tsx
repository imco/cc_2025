"use client"
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";

import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";

import BootstrapClient from "@/components/bootstrap/bootstrap-loader.component";
import { LinksList } from "@/interfaces/navbar/links-lists.interface";
import LinkOptions from "@/interfaces/navbar/navbar-options.interface";
import Navbar from "@/components/navbar/navbar.component";


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



  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Import Google Icon Font */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"
        />
        <title>{`Compara Carreras - ${link?.title}`}</title>
        <link rel="apple-touch-icon" href="/favicon.ico" />

        <link rel="canonical" href={link?.urlCanonical} />
        {/* <!-- for Google --> */}
        <meta name="description" content={link?.content} />
        <meta
          name="keywords"
          content="carreras, universidades, ¿que estudiar?, carreras universitarias, las 10 más, cuanto ganan, en que trabajan" />
        <meta name="author" content="IMCO" />

        <meta name="copyright" content="IMCO 2024" />
        <meta property="article:modified_time" content="time" />
        <meta name="application-name" content="Compara Carreras" />

        {/* <!-- for Facebook --> */}
        <meta property="og:title" content={`Compara Carreras - ${link?.title}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={link?.urlMiniatura} />
        <meta property="og:description" content={link?.content} />

        {/* <!-- for Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@imcomx" />
        <meta name="twitter:creator" content="@imcomx" />
        <meta
          property="og:url"
          content="https://imco.org.mx/comparacarreras/"
        />
        <meta name="twitter:title" content={`Compara Carreras - ${link?.title}`} />
        <meta name="twitter:description" content={link?.content} />
        <meta property="og:image" content={link?.urlMiniatura} />
        <meta name="twitter:image" content={link?.urlMiniatura} />
        <meta name="twitter:domain" content="comparacarreras.org" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar linksOptions={LinksList} />
        {children}
        <BootstrapClient />
      </body>
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="G-J7CL260VSJ" />
    </html>
  );
}
