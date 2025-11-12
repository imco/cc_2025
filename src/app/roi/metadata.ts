import type { Metadata } from "next";

const title = "Calculadora de ROI | ComparaCarreras (IMCO)";
const description =
  "Calcula el retorno sobre la inversión (RSI) de estudiar una carrera en México. Ajusta costo por periodo, duración e ingresos esperados para estimar el rendimiento.";

const url = "https://comparacarreras.imco.org.mx/roi";
const ogImage = "https://comparacarreras.imco.org.mx/og/roi-og-1200x630.png";
const twitterImage = "https://comparacarreras.imco.org.mx/og/roi-twitter-1200x630.png";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://comparacarreras.imco.org.mx"),
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "website",
    url,
    siteName: "ComparaCarreras (IMCO)",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Calculadora de ROI - ComparaCarreras (IMCO)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [twitterImage],
    creator: "@imcomx",
    site: "@imcomx",
  },
};
