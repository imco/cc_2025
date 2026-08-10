# Íconos SVG

Sistema de íconos del proyecto. Todos son componentes React que renderizan
un `<svg>` inline, heredan el color con `currentColor` y aceptan `size` +
cualquier prop de `<svg>`.

## Uso

```tsx
import { MenuIcon, TrendingUpIcon } from "@/components/icons"

<MenuIcon size={28} />
<TrendingUpIcon className="mi-clase" style={{ color: "#4FC3F7" }} />
```

Como usan `currentColor`, se pintan con el `color` heredado del contenedor —
no hay que tocar el SVG para recolorearlos.

## Agregar un ícono nuevo desde Reicon (extensión de VSCode)

1. Busca el ícono en el panel de **Reicon** y copia su SVG (o el JSX).
2. Crea un archivo `nombre.icon.tsx` en esta carpeta. Copia la estructura de
   un ícono existente (p. ej. [menu.icon.tsx](./menu.icon.tsx)) y pega el
   contenido del `<svg>` de Reicon dentro.
3. Ajústalo a la convención del proyecto:
   - Reemplaza colores fijos (`stroke="#000"`, `fill="#333"`) por
     `currentColor` para que herede la paleta.
   - Cambia `width`/`height` fijos por `width={size} height={size}`.
   - Convierte atributos a camelCase de JSX (`stroke-width` → `strokeWidth`,
     `stroke-linecap` → `strokeLinecap`, etc.).
   - Deja `aria-hidden="true"` si es decorativo; usa `aria-label` + `role="img"`
     si el ícono transmite información por sí solo.
4. Expórtalo en [index.ts](./index.ts).

## Convenciones

- Íconos de trazo (line/outline): `fill="none"`, `stroke="currentColor"`,
  `strokeWidth={2}`, viewBox `0 0 24 24`.
- Logotipos de marca (Facebook, X): `fill="currentColor"` con su path oficial.
- Un ícono por archivo, nombrado `*.icon.tsx`.
