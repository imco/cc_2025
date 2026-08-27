// Genera src/app/sitemap.xml y public/llms.txt a partir de los datos reales
// del sitio (carreras, tops y parámetros de la edición).
//
//   node scripts/generar_sitemap.mjs
//
// Correr después de actualizar datos o de agregar/quitar secciones y tops.

import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const SITIO = "https://comparacarreras.imco.org.mx"

const carreras = JSON.parse(readFileSync(path.join(raiz, "src/components/carrers/carrers-data/carrers.data.json"), "utf-8"))
const parametros = JSON.parse(readFileSync(path.join(raiz, "src/parametros_generales.json"), "utf-8"))

// tops activos: los del grid más sus contrapartes (mismo parseo que generar_og.mjs)
const sinComentarios = t => t.replace(/\/\*[\s\S]*?\*\//g, "")
const activos = new Set(
  [...sinComentarios(readFileSync(path.join(raiz, "src/app/las-10-mas/data.constans.ts"), "utf-8"))
    .matchAll(/titleUrl:\s*"([^"]+)"/g)].map(m => m[1])
)
const todosLosTops = [...sinComentarios(readFileSync(path.join(raiz, "src/app/las-10-mas/[slug]/data.constans.ts"), "utf-8"))
  .matchAll(/name:\s*"([^"]+)",\s*jsonName:\s*"([^"]+)",\s*titleUrl:\s*"([^"]+)",\s*description:\s*"([^"]+)"(?:,\s*lado:\s*"[^"]+",\s*pareja:\s*"([^"]+)")?/g)]
  .map(m => ({ name: m[1], titleUrl: m[3], description: m[4], pareja: m[5] }))
todosLosTops.forEach(t => { if (activos.has(t.titleUrl) && t.pareja) activos.add(t.pareja) })
const tops = todosLosTops.filter(t => activos.has(t.titleUrl))

const slugCarrera = c => "/" + encodeURI(c.CARRERA.toLowerCase().replaceAll(" ", "_"))

// --- sitemap.xml ---
const hoy = new Date().toISOString().slice(0, 10)
const url = (ruta, prioridad, frecuencia) => `   <url>
      <loc>${SITIO}${ruta === "/" ? "/" : ruta + "/"}</loc>
      <lastmod>${hoy}</lastmod>
      <changefreq>${frecuencia}</changefreq>
      <priority>${prioridad}</priority>
   </url>`

const secciones = [
  ["/", "1.0", "monthly"],
  ["/compara", "0.9", "monthly"],
  ["/las-10-mas", "0.8", "monthly"],
  ["/roi", "0.8", "monthly"],
  ["/metodologia", "0.5", "yearly"],
  ["/faq", "0.5", "yearly"],
  ["/investigaciones", "0.5", "yearly"],
  ["/accesibilidad", "0.3", "yearly"],
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...secciones.map(([ruta, p, f]) => url(ruta, p, f)),
  ...tops.map(t => url("/las-10-mas/" + t.titleUrl, "0.7", "monthly")),
  ...carreras.map(c => url(slugCarrera(c), "0.8", "monthly")),
].join("\n")}
</urlset>
`
writeFileSync(path.join(raiz, "src/app/sitemap.xml"), sitemap)
console.log(`sitemap.xml: ${secciones.length} secciones + ${tops.length} tops + ${carreras.length} carreras`)

// --- llms.txt (https://llmstxt.org) ---
const dinero = v => "$" + Math.round(parseFloat(v)).toLocaleString("en-US")
const fichas = [...carreras]
  .sort((a, b) => a.CARRERA.localeCompare(b.CARRERA))
  .map(c => `- [${c.CARRERA}](${SITIO}${slugCarrera(c)}): salario promedio mensual de ${dinero(c.INGRESO)}`)

const llms = `# Compara Carreras (IMCO)

> Herramienta gratuita del Instituto Mexicano para la Competitividad (IMCO) para comparar carreras universitarias y de Técnico Superior Universitario (TSU) en México. Edición ${parametros.anio.valor}, con datos de la Encuesta Nacional de Ocupación y Empleo (ENOE) del INEGI. Cubre ${carreras.length} carreras con información de salarios, empleo, informalidad, matrícula y retorno de inversión.

Cada ficha de carrera responde: ¿cuántos son? (total de profesionistas, género, edad), ¿en qué trabajan? (tasas de ocupación, desempleo e informalidad, cuántos trabajan en algo relacionado a lo que estudiaron, sectores), posición que ocupan (subordinados, empleadores, cuenta propia) y ¿cuánto ganan? (salario promedio y su distribución, brecha por género, edad, formalidad y posgrado). El salario promedio mensual de la población ocupada en México usado como referencia es ${dinero(parametros.salario_promedio_poblacion_ocupada.valor)}.

## Secciones principales

- [Inicio](${SITIO}/): buscador de carreras por nombre oficial o nombres comunes
- [Comparador](${SITIO}/compara): compara dos carreras frente a frente, indicador por indicador
- [Las 10 más](${SITIO}/las-10-mas): rankings de carreras; cada top con contraparte incluye el lado "Los 10 menos"
- [Calculadora de inversión](${SITIO}/roi): retorno sobre la inversión de estudiar una carrera
- [Metodología](${SITIO}/metodologia): cómo se calculan los indicadores con la ENOE (INEGI)
- [Preguntas frecuentes](${SITIO}/faq)
- [Investigaciones](${SITIO}/investigaciones): ediciones y estudios del IMCO

## Rankings

${tops.map(t => `- [${t.name}](${SITIO}/las-10-mas/${t.titleUrl})`).join("\n")}

## Carreras

${fichas.join("\n")}

## Optional

- [Sitio del IMCO](https://imco.org.mx): centro de investigación apartidista y sin fines de lucro
- [Contacto](mailto:comparacarreras@imco.org.mx)
`
writeFileSync(path.join(raiz, "public/llms.txt"), llms)
console.log(`llms.txt: ${tops.length} rankings + ${fichas.length} fichas de carrera`)
