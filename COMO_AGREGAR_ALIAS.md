# Cómo agregar nombres comunes (alias) al buscador

El buscador (inicio y comparador) encuentra carreras tanto por su **nombre oficial** como por los **nombres comunes** con los que la gente las conoce ("abogado" → Derecho). Los alias vienen de dos fuentes que se combinan automáticamente:

1. **Diccionario oficial de INEGI** (`carrer-alias-inegi.data.ts`, ~2,700 nombres auxiliares) — archivo **generado**, no editar a mano. Para regenerarlo (p. ej. con una nueva versión del archivo de INEGI):

   ```bash
   python3 scripts/generar_alias.py --fuente "<ruta al xlsx o csv de Nombres auxiliares CMPE>"
   ```

   El empate es por clave de carrera (`CVE_CARRERA`), así que sobrevive a cambios de nomenclatura, y una misma clave alimenta a la licenciatura y a su versión TSU.

2. **Alias manuales** (términos coloquiales que INEGI no contempla, como "doctor" o "abogado"):

```
src/components/search/carrer-alias.data.ts
```

## Agregar un alias

1. Abre el archivo y localiza (o agrega) la entrada de la carrera:

```ts
export const CarrerAlias: Record<string, string[]> = {
  "Derecho": ["Abogado", "Leyes", "Abogacía"],
  ...
}
```

2. La **llave** debe ser exactamente el nombre oficial que aparece en `carrers.data.json` (campo `CARRERA`):
   - Sin comas en medio del nombre (convención del sitio)
   - Con acentos ("Matemáticas", no "Matematicas")
   - Con el prefijo `TSU. ` si es carrera de Técnico Superior Universitario

3. Los **alias** pueden escribirse de forma natural: la búsqueda ignora mayúsculas y acentos, y encuentra coincidencias parciales ("abog" ya sugiere Derecho).

## Alias ambiguos (una palabra, varias carreras)

Un mismo alias **puede repetirse en varias carreras**. Cuando el término es ambiguo, agrégalo a todas las que apliquen y el buscador las sugerirá juntas para que la persona elija:

```ts
"Ciencias computacionales":              ["Programación", ...],
"Desarrollo de software (Innovación)":   ["Programación", ...],
"Desarrollo de software (Implementación)": ["Programación", ...],
```

Buscar "programación" mostrará las tres opciones, cada una con la nota de por qué apareció.

## Cómo se muestra

Cuando alguien busca por alias, el dropdown muestra el nombre oficial de la carrera con la nota *"la buscaste como «alias»"*, para que la persona aprenda el nombre real sin perderse.

## Verificar que la llave es válida

Si la llave no coincide con ninguna carrera del catálogo, el alias simplemente no hará nada (no rompe el sitio). Para comprobar los nombres oficiales vigentes:

```bash
node -e "require('./src/components/carrers/carrers-data/carrers.data.json').forEach(c => console.log(c.CARRERA))"
```
