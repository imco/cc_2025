# Cómo Agregar un Nuevo Top 10

La sección "Las 10 más" muestra rankings de carreras según distintos indicadores. Agregar un nuevo top requiere 3 pasos: crear el archivo de datos, registrarlo en la lista principal y registrar su metadata de página.

---

## Paso 1 — Crear el archivo JSON con los datos

Crea un archivo en:

```
src/components/las-10-mas/top/top_10_nombre_descriptivo.json
```

### Estructura del JSON

```json
{
    "Nombre de la carrera": [1, 0.94],
    "Otra carrera":         [2, 0.87],
    ...
}
```

Cada entrada es un par `"Nombre": [posición, valor]`:

- **Posición**: número entero que indica el lugar en el ranking (1, 2, 3…).
- **Valor**: número decimal o `"NA"` si no hay dato disponible.

### Formato automático del valor en la tabla

El componente detecta el formato a partir del nombre del archivo JSON:

| Condición | Ejemplo de valor | Se muestra como |
|---|---|---|
| Nombre incluye `pagadas` | `25760.99` | `$25,761` |
| Nombre incluye `rsi_` | `12.5` | `12.5%` |
| Valor entre 0 y 1 | `0.939` | `93.9%` |
| Cualquier otro número | `1234567` | `1,234,567` |
| Sin dato | `"NA"` | `NA` |

### Convención de nombres de carreras

Usa los mismos nombres que aparecen en los otros JSONs del directorio. En particular, **no agregues comas** en el medio de nombres compuestos:

```json
// Correcto
"Formación docente en educación básica nivel primaria"
"Industria de la minería extracción y metalurgia"
"Finanzas banca y seguros"

// Incorrecto
"Formación docente en educación básica, nivel primaria"
"Industria de la minería, extracción y metalurgia"
"Finanzas, banca y seguros"
```

### Encoding

Guarda el archivo en **UTF-8**. Si recibes el JSON con caracteres corruptos (p. ej. `MecÃ¡nica` en lugar de `Mecánica`), es un problema de encoding Latin-1 → UTF-8 que debes corregir antes de guardar.

---

## Paso 2 — Registrar el top en la lista principal

Edita el archivo:

```
src/app/las-10-mas/data.constans.ts
```

Agrega un objeto al array `TopsLists` en la posición donde quieres que aparezca la tarjeta:

```typescript
{
  topName: "Las 10 carreras con mayor X",
  titleUrl: "slug-de-la-url"
}
```

- `topName`: texto que aparece en la tarjeta de la página `/las-10-mas`.
- `titleUrl`: slug que forma la URL `/las-10-mas/slug-de-la-url`.

---

## Paso 3 — Registrar la metadata del top

Edita el archivo:

```
src/app/las-10-mas/[slug]/data.constans.ts
```

Agrega un objeto al array `TopsTypes`:

```typescript
{
  name: "Las 10 carreras con mayor X",
  titleUrl: "slug-de-la-url",
  jsonName: "top_10_nombre_descriptivo.json",
  description: "Descripción visible en la página del top."
}
```

- `titleUrl`: debe coincidir exactamente con el del Paso 2.
- `jsonName`: debe coincidir exactamente con el nombre del archivo creado en el Paso 1.

---

## Ejemplo completo

Se agregó el top "Las 10 carreras con mayor porcentaje de hombres":

**Paso 1** → `src/components/las-10-mas/top/top_10_mas_hombres.json`

**Paso 2** → en `data.constans.ts` (lista principal):
```typescript
{
  topName: "Las 10 carreras con mayor porcentaje de hombres",
  titleUrl: "porcentaje-hombres"
}
```

**Paso 3** → en `data.constans.ts` (slug):
```typescript
{
  name: "Las 10 carreras con mayor porcentaje de hombres",
  titleUrl: "porcentaje-hombres",
  jsonName: "top_10_mas_hombres.json",
  description: "Aquí conocerás la lista de las carreras cuya matrícula está principalmente compuesta por hombres, de acuerdo con el ranking de Compara Carreras."
}
```

---

## Tops comentados (desactivados temporalmente)

Algunos tops están comentados en `data.constans.ts` (lista principal) pero sí tienen entrada en `data.constans.ts` (slug) y su JSON en el directorio de datos. Para reactivarlos basta con descomentar su entrada en la lista principal.

| titleUrl | JSON |
|---|---|
| `calidad-inversion` | `top_10_calidad_inversion_privada.json` |
| `calidad-inversion-publicas` | `top_10_calidad_inversion_publica.json` |
| `mayor-tasa-retorno-publicas` | `top_10_rsi_pub.json` |
| `mayor-tasa-retorno-privadas` | `top_10_rsi_priv.json` |
| `menor-tasa-retorno-publicas` | `top_10_peor_rsi_pub.json` |
| `menor-tasa-retorno-privadas` | `top_10_peor_rsi_priv.json` |
