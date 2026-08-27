"use client"
import { ReactNode, useEffect, useRef, useState } from "react"

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)

    // al imprimir, todo lo diferido debe estar presente aunque no se haya scrolleado
    const mostrar = () => setVisible(true)
    window.addEventListener("preparar-impresion", mostrar)
    window.addEventListener("beforeprint", mostrar)
    return () => {
      observer.disconnect()
      window.removeEventListener("preparar-impresion", mostrar)
      window.removeEventListener("beforeprint", mostrar)
    }
  }, [threshold])

  return { ref, visible }
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

// Aparece con fade-in + deslizamiento cuando entra al viewport
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

type MountOnVisibleProps = {
  children: ReactNode
  minHeight?: number
  // alternativa textual para el HTML estático (sin JS no hay canvas);
  // con JS se oculta vía CSS (.js .chart-fallback)
  fallback?: ReactNode
}

// Monta a sus hijos hasta que el contenedor es visible; útil para que las
// animaciones de entrada de Chart.js corran cuando el usuario las ve
export function MountOnVisible({ children, minHeight, fallback }: MountOnVisibleProps) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15)
  // el wrapper debe llenar a su contenedor: Chart.js (responsive) toma el
  // tamaño del padre directo y un div sin altura encoge las gráficas
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        ...(minHeight && !visible ? { minHeight } : {}),
      }}
    >
      {visible ? children : (fallback ? <p className="chart-fallback">{fallback}</p> : null)}
    </div>
  )
}

type CountUpProps = {
  value: number | string | undefined
  format: (value: number | string | undefined) => string
  prefix?: string
  suffix?: string
  duration?: number
}

// Cuenta de 0 al valor cuando entra al viewport, usando el formateador del sitio
export function CountUp({ value, format, prefix = "", suffix = "", duration = 1200 }: CountUpProps) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.5)
  // el estado inicial es el valor final: así el HTML estático (sin JS) muestra
  // la cifra real y no un 0; la cuenta desde 0 solo arranca al entrar al viewport
  const [display, setDisplay] = useState(`${prefix}${format(value)}${suffix}`)
  const target = parseFloat(String(value))

  // al imprimir, el contador salta directo a su valor final (y la bandera
  // evita que la animación normal lo vuelva a pisar)
  const imprimiendo = useRef(false)
  useEffect(() => {
    const finalizar = () => {
      imprimiendo.current = true
      setDisplay(`${prefix}${format(value)}${suffix}`)
    }
    window.addEventListener("preparar-impresion", finalizar)
    window.addEventListener("beforeprint", finalizar)
    return () => {
      window.removeEventListener("preparar-impresion", finalizar)
      window.removeEventListener("beforeprint", finalizar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, prefix, suffix])

  useEffect(() => {
    if (!visible) return
    if (isNaN(target) || imprimiendo.current) {
      setDisplay(`${prefix}${format(value)}${suffix}`)
      return
    }
    const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setDisplay(`${prefix}${format(value)}${suffix}`)
      return
    }
    let frame: number
    setDisplay(`${prefix}${format(0)}${suffix}`)
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(`${prefix}${format(target * eased)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
      else setDisplay(`${prefix}${format(value)}${suffix}`)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, target, duration])

  return <span ref={ref} style={{ display: "inline-block" }}>{display}</span>
}
