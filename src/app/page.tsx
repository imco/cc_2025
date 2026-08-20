"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"

import homeImage from "@/assets/images/CC_LogoHome_Editado.png"
import ImcoBanner from "@/components/imco/imco-banner.component"
import SaberesBanner from "@/components/saberes/saberes-banner.component"
import CareerAutocomplete from "@/components/search/career-autocomplete.component"
import { CarrerAlias } from "@/components/search/carrer-alias.data"
import ShareButtons from "@/components/share/share-buttons.component"
import CarrersData from "@/interfaces/carrers/carrers-data.interface";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")
  const carrersNames: string[] = carrersData.map((carrer: CarrersData) => carrer.CARRERA)

  const router = useRouter()
  const [carrer, setCarrer] = useState('')
  const searchPhraseIndex = useRef(0);
  const searchPlaceholder = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let searchCharIndex = 0;
    let timer: ReturnType<typeof setTimeout>;
    const searchPhrases = ["Busca tu carrera...", "Explora oportunidades...", "Compara salarios..."];
    searchPlaceholder.current = document.getElementById('search-placeholder');
    const typeSearchPlaceholder = () => {
      if (searchPlaceholder.current && searchCharIndex < searchPhrases[searchPhraseIndex.current].length) {
        searchPlaceholder.current.textContent += searchPhrases[searchPhraseIndex.current].charAt(searchCharIndex);
        searchCharIndex++;
        timer = setTimeout(typeSearchPlaceholder, 100);
      } else {
        timer = setTimeout(eraseSearchPlaceholder, 2000);
      }
    }

    const eraseSearchPlaceholder = () => {
      if (searchPlaceholder.current && searchCharIndex > 0) {
        searchPlaceholder.current.textContent = searchPhrases[searchPhraseIndex.current].substring(0, searchCharIndex - 1);
        searchCharIndex--;
        timer = setTimeout(eraseSearchPlaceholder, 50);
      } else {
        searchPhraseIndex.current = (searchPhraseIndex.current + 1) % searchPhrases.length;
        timer = setTimeout(typeSearchPlaceholder, 500);
      }
    }
    typeSearchPlaceholder()
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section className="main-section home-main-section">
        <div className="compara-carreras-logo">
          <Image
            src={homeImage.src}
            width={homeImage.width}
            height={homeImage.height}
            alt="ComparaCarreras"
          />
        </div>
        <p className="description">
          Descubre información relevante sobre más de 60 carreras universitarias.
          Compara salarios, oportunidades laborales y más para tomar la mejor decisión.
        </p>
        <div className="search-container">
          <CareerAutocomplete
            opciones={carrersNames}
            alias={CarrerAlias}
            value={carrer}
            onChange={setCarrer}
            onSelect={nombre => router.push(`/${nombre.toLowerCase().replaceAll(" ", "_")}`)}
            inputId="search-input"
          />
          <div id="search-placeholder" style={carrer ? { display: 'none' } : undefined}></div>
        </div>
        <div className="home-share">
          <ShareButtons texto="Encuentra tu carrera en Compara Carreras del IMCO: salarios, empleo y más de 60 carreras universitarias." />
        </div>
      </section>
      <div className="home-saberes-banner">
        <ImcoBanner />
        <SaberesBanner />
      </div>
    </>
  );
}
