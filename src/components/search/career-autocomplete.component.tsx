"use client"
import { ChangeEvent, KeyboardEvent, useId, useState } from "react"

// quita acentos y baja a minúsculas para comparar (búsqueda tolerante)
const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

type Sugerencia = {
  nombre: string
  // fragmentos del nombre oficial para resaltar la coincidencia
  antes: string
  coincidencia: string
  despues: string
  // si el match vino del diccionario de nombres comunes
  alias?: string
  prioridad: number
}

type Props = {
  opciones: string[]
  // diccionario nombre oficial -> nombres comunes con los que la gente la busca
  alias?: Record<string, string[]>
  value: string
  onChange: (valor: string) => void
  onSelect: (opcion: string) => void
  inputId?: string
  inputClassName?: string
  placeholder?: string
  maxResultados?: number
}

export default function CareerAutocomplete({
  opciones,
  alias = {},
  value,
  onChange,
  onSelect,
  inputId,
  inputClassName,
  placeholder,
  maxResultados = 8,
}: Props) {
  const [abierto, setAbierto] = useState(false)
  const [activa, setActiva] = useState(-1)
  const listId = useId()

  const termino = normalizar(value.trim())

  const buscar = (nombre: string): Sugerencia | null => {
    const inicio = normalizar(nombre).indexOf(termino)
    if (inicio !== -1) {
      return {
        nombre,
        antes: nombre.slice(0, inicio),
        coincidencia: nombre.slice(inicio, inicio + termino.length),
        despues: nombre.slice(inicio + termino.length),
        prioridad: inicio === 0 ? 0 : 1,
      }
    }
    const comun = (alias[nombre] ?? []).find(a => normalizar(a).includes(termino))
    if (comun) {
      return {
        nombre,
        antes: nombre,
        coincidencia: "",
        despues: "",
        alias: comun,
        prioridad: normalizar(comun).startsWith(termino) ? 2 : 3,
      }
    }
    return null
  }

  const sugerencias: Sugerencia[] = termino
    ? opciones
        .map(buscar)
        .filter((s): s is Sugerencia => s !== null)
        .sort((a, b) => a.prioridad - b.prioridad || a.nombre.localeCompare(b.nombre))
        .slice(0, maxResultados)
    : []

  const visible = abierto && sugerencias.length > 0

  const seleccionar = (nombre: string) => {
    onChange(nombre)
    setAbierto(false)
    setActiva(-1)
    onSelect(nombre)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    setAbierto(true)
    setActiva(-1)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!visible) {
      if (event.key === "ArrowDown") setAbierto(true)
      return
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setActiva((activa + 1) % sugerencias.length)
        break
      case "ArrowUp":
        event.preventDefault()
        setActiva((activa - 1 + sugerencias.length) % sugerencias.length)
        break
      case "Enter":
        event.preventDefault()
        seleccionar(sugerencias[Math.max(activa, 0)].nombre)
        break
      case "Escape":
        setAbierto(false)
        setActiva(-1)
        break
    }
  }

  return (
    <div className="autocomplete">
      <input
        type="text"
        id={inputId}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        role="combobox"
        aria-expanded={visible}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activa >= 0 ? `${listId}-${activa}` : undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setAbierto(true)}
        onBlur={() => setAbierto(false)}
      />
      {visible && (
        <div className="autocomplete-results" role="listbox" id={listId}>
          {sugerencias.map((s, i) => (
            <div
              key={s.nombre}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activa}
              className={`search-result${i === activa ? " is-active" : ""}`}
              // mousedown (no click) para ganarle al blur del input
              onMouseDown={event => {
                event.preventDefault()
                seleccionar(s.nombre)
              }}
              onMouseEnter={() => setActiva(i)}
            >
              {s.antes}
              {s.coincidencia && <mark>{s.coincidencia}</mark>}
              {s.despues}
              {s.alias && <span className="search-result-alias">la buscaste como “{s.alias}”</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
