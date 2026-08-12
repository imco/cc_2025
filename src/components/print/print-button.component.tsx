"use client"
import PrinterIcon from "@/components/icons/printer.icon"

// Evento global que fuerza el estado final de la página antes de imprimir:
// monta las gráficas diferidas, completa los contadores y desactiva
// animaciones (lo escuchan useInView, CountUp y la página de carrera).
export const EVENTO_PREPARAR_IMPRESION = "preparar-impresion"

type Props = {
  etiqueta?: string
}

export default function PrintButton({ etiqueta = "Descargar PDF" }: Props) {
  const imprimir = () => {
    window.dispatchEvent(new Event(EVENTO_PREPARAR_IMPRESION))
    // margen para que React monte las gráficas y pinte los valores finales
    setTimeout(() => window.print(), 600)
  }

  return (
    <button type="button" className="print-button no-print" onClick={imprimir}>
      <PrinterIcon size={18} />
      {etiqueta}
    </button>
  )
}
