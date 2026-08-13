"use client"
import { useEffect, useState } from "react"
import { WhatsappIcon, FacebookIcon, XIcon, LinkIcon, ShareIcon } from "@/components/icons"

// Botones para compartir la página actual en redes sociales.
// El texto es personalizable por página; la liga se toma del navegador.

type Props = {
  texto: string
}

// window.gtag ya está declarado globalmente en roi-selector.component.tsx

export default function ShareButtons({ texto }: Props) {
  const [liga, setLiga] = useState("")
  const [copiada, setCopiada] = useState(false)
  const [hayNativo, setHayNativo] = useState(false)

  useEffect(() => {
    setLiga(window.location.href)
    setHayNativo(typeof navigator.share === "function")
  }, [])

  const registrar = (metodo: string) => {
    window.gtag?.("event", "share", { method: metodo, content_type: "page", item_id: liga })
  }

  const abrir = (metodo: string, url: string) => {
    registrar(metodo)
    window.open(url, "_blank", "noopener,noreferrer,width=650,height=550")
  }

  const copiar = async () => {
    registrar("copiar_liga")
    try {
      await navigator.clipboard.writeText(liga)
      setCopiada(true)
      setTimeout(() => setCopiada(false), 2000)
    } catch {
      // clipboard no disponible (http, permisos): selección manual
      prompt("Copia la liga:", liga)
    }
  }

  const nativo = async () => {
    registrar("nativo")
    try {
      await navigator.share({ title: "Compara Carreras", text: texto, url: liga })
    } catch {
      // usuario canceló: no hacer nada
    }
  }

  const textoYLiga = encodeURIComponent(`${texto} ${liga}`)

  return (
    <div className="share-buttons no-print" aria-label="Compartir esta página">
      <span className="share-label">Compartir:</span>
      <button
        type="button"
        className="share-btn"
        title="Compartir por WhatsApp"
        onClick={() => abrir("whatsapp", `https://wa.me/?text=${textoYLiga}`)}
      >
        <WhatsappIcon size={19} />
      </button>
      <button
        type="button"
        className="share-btn"
        title="Compartir en Facebook"
        onClick={() => abrir("facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(liga)}`)}
      >
        <FacebookIcon size={19} />
      </button>
      <button
        type="button"
        className="share-btn"
        title="Compartir en X"
        onClick={() => abrir("x", `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(liga)}`)}
      >
        <XIcon size={17} />
      </button>
      <button
        type="button"
        className="share-btn"
        title={copiada ? "¡Liga copiada!" : "Copiar liga"}
        onClick={copiar}
      >
        <LinkIcon size={19} />
      </button>
      {copiada && <span className="share-copiada">¡Liga copiada!</span>}
      {hayNativo && (
        <button type="button" className="share-btn" title="Más opciones" onClick={nativo}>
          <ShareIcon size={19} />
        </button>
      )}
    </div>
  )
}
