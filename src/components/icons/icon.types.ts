import { SVGProps } from "react"

/**
 * Props compartidas por todos los íconos SVG del proyecto.
 *
 * - `size` fija ancho y alto (px). Por defecto 24.
 * - Heredan el color del texto vía `currentColor`, así que se pintan
 *   con la paleta del sitio usando `color` en CSS/estilos.
 * - Aceptan cualquier prop de <svg> (className, onClick, aria-label, etc.).
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}
