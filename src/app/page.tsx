"use client"
import Image from "next/image"
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { redirect } from "next/navigation"

import homeImage from "@/assets/images/CC_LogoHome_Editado.png"
import SaberesBanner from "@/components/saberes/saberes-banner.component"
import CarrersData from "@/interfaces/carrers/carrers-data.interface";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const carrersData = require("@/components/carrers/carrers-data/carrers.data.json")

  const [carrer, setCarrer] = useState('')
  const searchPhraseIndex = useRef(0);
  let searchCharIndex = 0;
  const searchPlaceholder = useRef(Object());
  const searchResults = useRef(Object())
  const carrersNames = useRef([])

  useEffect(() => {
    carrersNames.current = carrersData.map(
      (carrer: CarrersData) => carrer.CARRERA
    )
    const searchPhrases = ["Busca tu carrera...", "Explora oportunidades...", "Compara salarios..."];
    searchPlaceholder.current = document.getElementById('search-placeholder');
    //searchInput = document.getElementById('search-input');
    const typeSearchPlaceholder = () => {
      if (searchPlaceholder.current && searchCharIndex < searchPhrases[searchPhraseIndex.current].length) {
        searchPlaceholder.current.textContent += searchPhrases[searchPhraseIndex.current].charAt(searchCharIndex);
        searchCharIndex++;
        setTimeout(typeSearchPlaceholder, 100);
      } else {
        setTimeout(eraseSearchPlaceholder, 2000);
      }
    }

    const eraseSearchPlaceholder = () => {
      if (searchPlaceholder.current && searchCharIndex > 0) {
        searchPlaceholder.current.textContent = searchPhrases[searchPhraseIndex.current].substring(0, searchCharIndex - 1);
        searchCharIndex--;
        setTimeout(eraseSearchPlaceholder, 50);
      } else {
        searchPhraseIndex.current = (searchPhraseIndex.current + 1) % searchPhrases.length;
        setTimeout(typeSearchPlaceholder, 500);
      }
    }
    typeSearchPlaceholder()

    searchResults.current = document.getElementById('search-results');
  }, [searchCharIndex, carrersData])

  const displayResults = (results: CarrersData[]) => {
    searchPlaceholder.current.style.display = "none"
    searchResults.current.innerHTML = '';
    results.forEach(result => {
      const div = document.createElement('div');
      div.classList.add('search-result');
      div.textContent = result.CARRERA;
      div.addEventListener('click', () => redirect(`/${result.CARRERA.toLowerCase().replaceAll(" ", "_")}`));
      searchResults.current.appendChild(div);
    });
    searchResults.current.style.display = results.length > 0 ? 'block' : 'none';
  }

  const handleOnChangeInputCarrer = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCarrer(newValue)
    const searchTerm = carrer.toLowerCase();
    const filteredCareers = carrersData.filter((career: CarrersData) =>
      career.CARRERA.toLowerCase().includes(searchTerm)
    );
    displayResults(filteredCareers);
  }

  return (
    <>
      <datalist id="carrersList">
        {carrersData.map((carrer: CarrersData) => (
          <option value={carrer.CARRERA} key={carrer.CARRERA} />
        ))}
      </datalist>
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
          <input
            type="text"
            id="search-input"
            placeholder=""
            value={carrer}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => handleOnChangeInputCarrer(event)
            }
          />
          <div id="search-placeholder"></div>
          <div id="search-results"></div>
        </div>
      </section>
      <div className="home-saberes-banner">
        <SaberesBanner />
      </div>
    </>
  );
}
