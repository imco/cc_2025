// Diccionario de nombres comunes de las carreras.
//
// La gente busca las carreras por su nombre coloquial ("abogado", "programación",
// "doctor") y no por el nombre oficial del catálogo; este diccionario conecta
// esas búsquedas con la carrera correcta en el buscador.
//
// Dos fuentes que se combinan en el export CarrerAlias:
//   1. CarrerAliasInegi (generado desde el archivo oficial de INEGI con
//      scripts/generar_alias.py — no editar a mano)
//   2. CarrerAliasManual (este archivo): términos coloquiales que INEGI no
//      contempla ("doctor", "abogado", "programación")
//
// Reglas para los manuales:
//   - La llave debe ser EXACTAMENTE el valor de CARRERA en carrers.data.json
//     (sin comas, con acentos, prefijo "TSU. " si aplica).
//   - Los alias no necesitan acentos ni mayúsculas: la búsqueda los ignora.
//   - Ver COMO_AGREGAR_ALIAS.md para el proceso completo.

import { CarrerAliasInegi } from "./carrer-alias-inegi.data"

const CarrerAliasManual: Record<string, string[]> = {
  "Derecho": ["Abogado", "Abogada", "Leyes", "Abogacía", "Jurisprudencia"],
  "Medicina general": ["Doctor", "Doctora", "Médico", "Medicina"],
  // un mismo alias puede repetirse en varias carreras cuando el término es
  // ambiguo: el buscador sugerirá todas las que lo tengan
  "Ciencias computacionales": ["Programación", "Programador", "Computación", "Informática", "Sistemas"],
  "Desarrollo de software": ["Programación", "Programador", "Software", "Ingeniero de software", "Ingeniería de software", "Desarrollo web"],
  "Telecomunicaciones": ["Redes", "Telecom", "Redes y telecomunicaciones", "Conectividad"],
  "Contabilidad y fiscalización": ["Contador", "Contadora", "Contaduría"],
  "Formación docente en educación básica nivel primaria": ["Maestro de primaria", "Profesor", "Normalista"],
  "Enfermería general y obstetricia": ["Enfermero", "Enfermera", "Enfermería"],
  "Construcción e ingeniería civil": ["Ingeniero civil", "Obra civil"],
  "Veterinaria": ["Veterinario", "Médico veterinario", "MVZ"],
  "Psicología": ["Psicólogo", "Psicóloga", "Terapia psicológica"],
}

// combinación de ambas fuentes, sin duplicados
export const CarrerAlias: Record<string, string[]> = (() => {
  const combinado: Record<string, string[]> = {}
  for (const fuente of [CarrerAliasInegi, CarrerAliasManual]) {
    for (const [carrera, alias] of Object.entries(fuente)) {
      const lista = combinado[carrera] ?? (combinado[carrera] = [])
      for (const a of alias) {
        if (!lista.includes(a)) lista.push(a)
      }
    }
  }
  return combinado
})()
