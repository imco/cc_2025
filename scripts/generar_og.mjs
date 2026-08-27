// Genera las miniaturas para compartir en redes (Open Graph, 1200x630):
//   - una card por sección del sitio
//   - una card por carrera, con sus estadísticas clave
//
// Salidas:
//   public/og/*.jpg                                  (las imágenes)
//   src/interfaces/navbar/carrer-cards.data.ts       (lookup slug -> metadatos, usado por el layout)
//
// Uso:  node scripts/generar_og.mjs
// Requiere Chrome/Chromium (usa Playwright igual que las verificaciones del proyecto).

import { readFileSync, writeFileSync, mkdirSync } from "fs"
import { fileURLToPath } from "url"
import { createRequire } from "module"
import { execSync } from "child_process"
import path from "path"

// playwright vive en el node_modules global (no es dependencia del sitio)
const globalRoot = execSync("npm root -g").toString().trim()
const require = createRequire(path.join(globalRoot, "x.js"))
const { chromium } = require("playwright")

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const carreras = JSON.parse(readFileSync(path.join(raiz, "src/components/carrers/carrers-data/carrers.data.json"), "utf-8"))
const logoPath = path.join(raiz, "src/assets/images/CC_LogoHome_Editado.png")
const logoB64 = readFileSync(logoPath).toString("base64")
const salida = path.join(raiz, "public/og")
mkdirSync(salida, { recursive: true })

const SITIO = "https://comparacarreras.imco.org.mx"

// slug de página (como generateStaticParams) y nombre de archivo ascii
const slugPagina = n => n.toLowerCase().replaceAll(" ", "_")
const ascii = n => n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")

const fmtDinero = v => {
  const n = parseFloat(v)
  return isNaN(n) ? "—" : "$" + Math.round(n).toLocaleString("en-US")
}
const fmtPct = v => {
  const n = parseFloat(v)
  return isNaN(n) ? "—" : (n * 100).toFixed(1) + "%"
}

const plantilla = ({ superior, titulo, descripcion = '', chips, pie }) => `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  * { margin: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  body {
    width: 1200px; height: 630px; overflow: hidden; color: #fff;
    background: radial-gradient(1000px 700px at 85% -10%, #0a4fa1 0%, #024383 55%, #01315f 100%);
    display: flex; flex-direction: column; padding: 56px 64px;
  }
  .logo { height: 74px; width: auto; align-self: flex-start; }
  .superior { margin-top: 26px; font-size: 26px; font-weight: 600; letter-spacing: 2px;
    color: #4FC3F7; text-transform: uppercase; }
  .centro { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .titulo { font-weight: 700;
    font-size: ${titulo.length > 60 ? 52 : titulo.length > 34 ? 62 : 76}px; line-height: 1.12; }
  .descripcion { font-size: 28px; font-weight: 300; line-height: 1.45;
    color: rgba(255,255,255,0.92); max-width: 980px; }
  .chips { display: flex; gap: 18px; margin-bottom: 30px; }
  .chip { background: rgba(255,255,255,0.12); border: 1px solid rgba(79,195,247,0.45);
    border-radius: 18px; padding: 18px 26px; min-width: 210px; }
  .chip b { display: block; font-size: 40px; font-weight: 700; color: #ffffff; }
  .chip span { font-size: 19px; color: rgba(255,255,255,0.85); }
  .pie { display: flex; justify-content: space-between; align-items: center;
    border-top: 2px solid rgba(79,195,247,0.5); padding-top: 20px;
    font-size: 23px; color: rgba(255,255,255,0.9); }
  .pie b { color: #4FC3F7; font-weight: 600; }
</style></head>
<body>
  <img class="logo" src="data:image/png;base64,${logoB64}">
  <div class="superior">${superior}</div>
  <div class="centro">
    <div class="titulo">${titulo}</div>
    ${descripcion ? `<div class="descripcion">${descripcion}</div>` : ""}
  </div>
  ${chips.length ? `<div class="chips">${chips.map(c => `<div class="chip"><b>${c[1]}</b><span>${c[0]}</span></div>`).join("")}</div>` : ""}
  <div class="pie"><span>${pie}</span><b>comparacarreras.imco.org.mx</b></div>
</body></html>`

const secciones = [
  { url: "/", archivo: "seccion-inicio", superior: "Herramienta gratuita del IMCO", titulo: "Encuentra tu carrera", descripcion: "Descubre información relevante sobre más de 60 carreras universitarias. Compara salarios, oportunidades laborales y más para tomar la mejor decisión.", pie: "Datos de salario, empleo y más para decidir mejor" },
  { url: "/compara", archivo: "seccion-compara", superior: "Comparador", titulo: "Compara dos carreras frente a frente", pie: "Salarios, empleo, informalidad y más" },
  { url: "/las-10-mas", archivo: "seccion-las-10-mas", superior: "Rankings", titulo: "Las 10 carreras más…", pie: "Mejor pagadas, más demandadas, con mayor vinculación laboral" },
  { url: "/metodologia", archivo: "seccion-metodologia", superior: "Metodología", titulo: "Cómo medimos cada carrera", pie: "Con datos de la ENOE (INEGI)" },
  { url: "/faq", archivo: "seccion-faq", superior: "Preguntas frecuentes", titulo: "Resolvemos tus dudas", pie: "Todo sobre Compara Carreras" },
  { url: "/roi", archivo: "seccion-roi", superior: "Calculadora de inversión", titulo: "¿Cuánto retorna estudiar una carrera?", pie: "Calcula el ROI de tu educación" },
  { url: "/investigaciones", archivo: "seccion-investigaciones", superior: "Investigaciones", titulo: "Ediciones y estudios del IMCO", pie: "Mercado laboral y educación superior en México" },
  { url: "/accesibilidad", archivo: "seccion-accesibilidad", superior: "Accesibilidad", titulo: "Declaración de accesibilidad", pie: "Compara Carreras para todas las personas" },
]

const navegador = await chromium.launch({ executablePath: "/usr/bin/google-chrome" })
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } })

const capturar = async (html, archivo) => {
  await pagina.setContent(html, { waitUntil: "networkidle" })
  await pagina.screenshot({ path: path.join(salida, archivo + ".jpg"), type: "jpeg", quality: 88 })
}

for (const s of secciones) {
  await capturar(plantilla({ superior: s.superior, titulo: s.titulo, descripcion: s.descripcion, chips: [], pie: s.pie }), s.archivo)
}
console.log(`secciones: ${secciones.length}`)

const lookup = {}
for (const c of carreras) {
  const archivo = "carrera-" + ascii(c.CARRERA)
  const chips = [
    ["salario promedio mensual", fmtDinero(c.INGRESO)],
    ["tasa de ocupación", fmtPct(c.TASA_OCUPACION)],
    ["mujeres", fmtPct(c.PCT_MUJER)],
  ]
  const esTSU = c.CARRERA.startsWith("TSU")
  await capturar(plantilla({
    superior: esTSU ? "Técnico Superior Universitario" : "Carrera universitaria",
    titulo: c.CARRERA.replace(/^TSU\. /, ""),
    chips,
    pie: "Conoce cuántos son, en qué trabajan y cuánto ganan",
  }), archivo)

  const salario = fmtDinero(c.INGRESO)
  lookup["/" + slugPagina(c.CARRERA)] = {
    title: c.CARRERA,
    content: `${c.CARRERA}: salario promedio mensual de ${salario}, tasa de ocupación de ${fmtPct(c.TASA_OCUPACION)}. Conoce cuántos son, en qué trabajan y cuánto ganan en Compara Carreras del IMCO.`,
    urlMiniatura: `${SITIO}/og/${archivo}.jpg`,
    urlCanonical: `${SITIO}/${slugPagina(c.CARRERA)}/`,
  }
  process.stdout.write(".")
}
console.log(`\ncarreras: ${carreras.length}`)

// --- tops de "Las 10 más": card con el top 3 real de cada ranking ---
const sinComentarios = t => t.replace(/\/\*[\s\S]*?\*\//g, "")
const activos = new Set(
  [...sinComentarios(readFileSync(path.join(raiz, "src/app/las-10-mas/data.constans.ts"), "utf-8"))
    .matchAll(/titleUrl:\s*"([^"]+)"/g)].map(m => m[1])
)
const todosLosTops = [...sinComentarios(readFileSync(path.join(raiz, "src/app/las-10-mas/[slug]/data.constans.ts"), "utf-8"))
  .matchAll(/name:\s*"([^"]+)",\s*jsonName:\s*"([^"]+)",\s*titleUrl:\s*"([^"]+)",\s*description:\s*"([^"]+)"(?:,\s*lado:\s*"[^"]+",\s*pareja:\s*"([^"]+)")?/g)]
  .map(m => ({ name: m[1], jsonName: m[2], titleUrl: m[3], description: m[4], pareja: m[5] }))
// las contrapartes "Los 10 menos" también tienen página aunque no salgan en el grid
todosLosTops.forEach(t => { if (activos.has(t.titleUrl) && t.pareja) activos.add(t.pareja) })
const registroTops = todosLosTops.filter(t => activos.has(t.titleUrl))

// mismo formato que la tabla de tops del sitio
const fmtTop = (jsonName, v) => {
  const n = parseFloat(v)
  if (isNaN(n)) return "—"
  if (jsonName.includes("pagadas")) return fmtDinero(n)
  if (jsonName.includes("matricula") || jsonName.includes("numero")
    || jsonName.includes("mas_nuevo_ingresos") || jsonName.includes("menos_nuevo_ingresos")) return Math.round(n).toLocaleString("en-US")
  return n.toFixed(1) + "%"
}
const recortar = (s, max) => (s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s)

for (const top of registroTops) {
  const datos = JSON.parse(readFileSync(path.join(raiz, "src/components/las-10-mas/top", top.jsonName), "utf-8"))
  const top3 = Object.entries(datos).sort((a, b) => a[1][0] - b[1][0]).slice(0, 3)
  const archivo = "top-" + top.titleUrl
  await capturar(plantilla({
    superior: "Las 10 más",
    titulo: top.name,
    chips: top3.map(([carrera, [pos, valor]]) => [`${pos}° ${recortar(carrera, 30)}`, fmtTop(top.jsonName, valor)]),
    pie: "Conoce el ranking completo",
  }), archivo)

  lookup["/las-10-mas/" + top.titleUrl] = {
    title: top.name,
    content: top.description,
    urlMiniatura: `${SITIO}/og/${archivo}.jpg`,
    urlCanonical: `${SITIO}/las-10-mas/${top.titleUrl}/`,
  }
  process.stdout.write("+")
}
console.log(`\ntops: ${registroTops.length}`)

await navegador.close()

const ts = `// GENERADO por scripts/generar_og.mjs — no editar a mano.
// Metadatos para compartir cada página de carrera en redes sociales.

export type CarrerCard = {
  title: string
  content: string
  urlMiniatura: string
  urlCanonical: string
}

export const CarrerCards: Record<string, CarrerCard> = ${JSON.stringify(lookup, null, 2)}
`
writeFileSync(path.join(raiz, "src/interfaces/navbar/carrer-cards.data.ts"), ts)
console.log("lookup: src/interfaces/navbar/carrer-cards.data.ts")
