"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import homeImage from "@/assets/images/CC_LogoHome_Editado.png"

// Banda de encabezado del formato de descarga: logotipo del sitio, fecha
// de descarga y liga de origen. Solo visible al imprimir.
export default function PrintSheetHeader() {
  const [fecha, setFecha] = useState("")
  const [liga, setLiga] = useState("")

  useEffect(() => {
    setFecha(new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }))
    setLiga(window.location.href)
  }, [])

  return (
    <div className="print-only print-sheet-band">
      <Image
        src={homeImage.src}
        width={homeImage.width}
        height={homeImage.height}
        alt="Compara Carreras"
        className="print-sheet-logo"
        priority
      />
      <div className="print-sheet-meta">
        <span>Descargado el {fecha}</span>
        <span>{liga}</span>
      </div>
    </div>
  )
}
