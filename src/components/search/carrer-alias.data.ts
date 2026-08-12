// Diccionario de nombres comunes de las carreras.
//
// La gente busca las carreras por su nombre coloquial ("abogado", "programación",
// "doctor") y no por el nombre oficial del catálogo; este diccionario conecta
// esas búsquedas con la carrera correcta en el buscador.
//
// Reglas:
//   - La llave debe ser EXACTAMENTE el valor de CARRERA en carrers.data.json
//     (sin comas, con acentos, prefijo "TSU. " si aplica).
//   - Los alias no necesitan acentos ni mayúsculas: la búsqueda los ignora.
//   - Ver COMO_AGREGAR_ALIAS.md para el proceso completo.

export const CarrerAlias: Record<string, string[]> = {
  "Derecho": ["Abogado", "Abogada", "Leyes", "Abogacía", "Jurisprudencia"],
  "Medicina general": ["Doctor", "Doctora", "Médico", "Medicina"],
  // un mismo alias puede repetirse en varias carreras cuando el término es
  // ambiguo: el buscador sugerirá todas las que lo tengan
  "Ciencias computacionales": ["Programación", "Programador", "Computación", "Informática", "Sistemas"],
  "Desarrollo de software (Innovación)": ["Programación", "Programador", "Software", "Ingeniero de software", "Ingeniería de software", "Desarrollo web"],
  "Desarrollo de software (Implementación)": ["Programación", "Programador", "Software", "Ingeniero de software", "Ingeniería de software", "Desarrollo web"],
  "Contabilidad y fiscalización": ["Contador", "Contadora", "Contaduría"],
  "Formación docente en educación básica nivel primaria": ["Maestro de primaria", "Profesor", "Normalista"],
  "Enfermería general y obstetricia": ["Enfermero", "Enfermera", "Enfermería"],
  "Construcción e ingeniería civil": ["Ingeniero civil", "Obra civil"],
  "Veterinaria": ["Veterinario", "Médico veterinario", "MVZ"],
  "Psicología": ["Psicólogo", "Psicóloga", "Terapia psicológica"],
}
