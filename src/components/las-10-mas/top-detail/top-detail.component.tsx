"use client"
import { useState } from "react"
import Link from "next/link"
import TopTable from "@/components/las-10-mas/top-table/top-table.component"
import { TopsLists } from "@/app/las-10-mas/data.constans"
import {
  UserMinusIcon,
  ShieldCheckIcon,
  TrendingDownIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/icons"

// Top serializable (viene del server component de la página)
export type TopPlano = {
  name: string
  titleUrl: string
  jsonName: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

type Props = {
  mas: TopPlano
  menos: TopPlano | null
  inicial: "mas" | "menos"
}

// iconos propios del lado "menos"; si no hay, se hereda el del lado "más"
const ICONOS_MENOS: Record<string, typeof UserMinusIcon> = {
  "peor-pagadas": TrendingDownIcon,
  "tsu-peor-pagadas": TrendingDownIcon,
  "menor-riesgo": ShieldCheckIcon,
  "menos-profesionistas": UserMinusIcon,
  "menos-nuevo-ingreso": UserMinusIcon,
  "menor-vinculacion-laboral": BriefcaseIcon,
}

export default function TopDetail({ mas, menos, inicial }: Props) {
  const [lado, setLado] = useState<"mas" | "menos">(menos ? inicial : "mas")
  const activo = lado === "menos" && menos ? menos : mas

  const cambiarLado = (nuevo: "mas" | "menos") => {
    if (nuevo === lado || !menos) return
    setLado(nuevo)
    // la URL sigue al lado visible para que se pueda compartir/recargar
    const destino = nuevo === "menos" ? menos.titleUrl : mas.titleUrl
    window.history.replaceState(null, "", "/las-10-mas/" + destino)
    // GA4: uso del switch entre "Los 10 más" y "Los 10 menos"
    window.gtag?.("event", "top_toggle", { top: destino, lado: nuevo })
  }

  const IconoMas = TopsLists.find(t => t.titleUrl === mas.titleUrl)?.icon
  const IconoMenos = ICONOS_MENOS[menos?.titleUrl ?? ""] ?? IconoMas
  const Icono = lado === "menos" ? IconoMenos : IconoMas

  // navegación entre tops siguiendo el orden del grid de la sección
  const indice = TopsLists.findIndex(t => t.titleUrl === mas.titleUrl)
  const topAnterior = indice > 0 ? TopsLists[indice - 1] : null
  const topSiguiente = indice >= 0 && indice < TopsLists.length - 1 ? TopsLists[indice + 1] : null

  return (
    <div id="top10-modal" className="">
      <div className="modal-conten">
        {/* anuncio para lectores de pantalla al alternar el switch */}
        <div role="status" className="sr-only">{`Mostrando: ${activo.name}`}</div>
        {menos && (
          <div className="top-toggle-row">
            <div className="top-toggle" role="tablist" aria-label="Los 10 más o los 10 menos">
              <span className={`top-toggle-thumb${lado === "menos" ? " en-menos" : ""}`} aria-hidden="true"></span>
              <button
                type="button"
                role="tab"
                aria-selected={lado === "mas"}
                className={lado === "mas" ? "activo" : ""}
                onClick={() => cambiarLado("mas")}
              >
                Los 10 más
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={lado === "menos"}
                className={lado === "menos" ? "activo" : ""}
                onClick={() => cambiarLado("menos")}
              >
                Los 10 menos
              </button>
            </div>
          </div>
        )}
        <div className="top-title-row">
          <Link href={"/las-10-mas"} className="top-back-link text-white text-sm">
            &larr; Volver a las 10 más
          </Link>
          <h1 id="modal-title" key={activo.titleUrl}>
            {Icono && (
              <span className="top10-detail-icon">
                <Icono size={30} />
              </span>
            )}
            {activo.name}
          </h1>
          {(topAnterior || topSiguiente) && (
            <div className="top-nav-arrows">
              {topAnterior && (
                <Link
                  href={"/las-10-mas/" + topAnterior.titleUrl}
                  className="top-nav-btn"
                  title={topAnterior.topName}
                  aria-label={`Top anterior: ${topAnterior.topName}`}
                >
                  <ArrowLeftIcon size={18} />
                </Link>
              )}
              {topSiguiente && (
                <Link
                  href={"/las-10-mas/" + topSiguiente.titleUrl}
                  className="top-nav-btn"
                  title={topSiguiente.topName}
                  aria-label={`Siguiente top: ${topSiguiente.topName}`}
                >
                  <ArrowRightIcon size={18} />
                </Link>
              )}
            </div>
          )}
        </div>
        <div id="modal-data">
          <div className="mt-3 text-justify">
            <p className="card-text text-lg font-light">
              {activo.description}
            </p>
          </div>
          <TopTable topData={activo.data} actualTop={activo} />
        </div>
      </div>
    </div>
  )
}
