# Prompt para Stitch — Sección "¿Qué estudiaron?"

Prompt listo para pegar en [Stitch](https://stitch.withgoogle.com). Diseña la nueva sección **¿Qué estudiaron?** respetando la estética actual de Compara Carreras (extraída de `src/app/globals.css`).

---

## Prompt

Diseña una sección web llamada **"¿Qué estudiaron?"** para "Compara Carreras", una herramienta del IMCO (México) que ayuda a jóvenes a decidir qué carrera universitaria estudiar. Esta sección muestra las 10 carreras mejor pagadas de México y, al elegir una, despliega la trayectoria educativa típica de quienes la ejercen como una línea del tiempo vertical.

### Estilo visual (debe coincidir con el sitio existente — OBLIGATORIO)

**IMPORTANTE: NO uses tema oscuro de grises. Prohibido usar negro (#000, #111, #1a1a1a), gris oscuro o gris carbón como fondo de página, de paneles o de cards. Todo el diseño vive sobre AZUL.**

Mapa exacto de colores por superficie:

- **Fondo de página**: azul institucional profundo **#024383** (nunca negro ni gris).
- **Navbar y paneles**: el mismo azul #024383 o su variante **#0a4fa1**; separadores con blanco translúcido rgba(255,255,255,0.15).
- **Cards y contenedores**: blanco translúcido **rgba(255,255,255,0.12)** sobre el fondo azul (efecto glassmorphism), bordes redondeados de 10–15px, sombra suave (0 4px 6px rgba(0,0,0,0.1)). En hover: rgba(255,255,255,0.2) + elevación.
- **Superficies destacadas / gradientes**: de **#0a4fa1** a **#2b6cd1**.
- **Acento principal**: azul cielo **#4FC3F7** — botones, resaltados, íconos activos, la línea del tiempo; acento claro **#81D4FA**.
- **Acentos semánticos puntuales (solo en chips/íconos, nunca fondos grandes)**: verde **#69DB7C** (logros), naranja **#FFA94D** (opcionales/destacados), rojo suave **#FF6B6B** (alertas).
- **Texto**: blanco #FFFFFF sobre los azules; texto secundario en blanco al 70–80% de opacidad (no gris puro).
- **Botones**: tipo píldora (border-radius 25px) en #4FC3F7 con texto blanco.
- Tipografía: **Poppins** (pesos 300, 400 y 600).
- Estética general: institucional pero juvenil, limpia, luminosa y con mucho aire — como un cielo nocturno azul, NO como un dashboard dark-mode gris.
- Las fotos/ilustraciones llevan un overlay o duotono azulado para integrarse a la paleta.

### Pantalla 1 — Ranking de las 10 mejor pagadas

- Hero compacto con el título "¿Qué estudiaron?" y un subtítulo: "Descubre la ruta educativa de quienes ejercen las carreras mejor pagadas de México".
- Grid o lista de 10 cards de carrera, cada una con: posición del ranking (número grande estilizado), ícono ilustrativo de la profesión, nombre de la carrera, salario promedio mensual y un chip con la tasa de ocupación.
- Cards ordenadas 1 a 10; la #1 puede ser más grande o destacada.
- Al hacer hover, la card se eleva y muestra un botón "Ver trayectoria →".
- Usa estos datos de ejemplo: 1. Medicina de especialidad $34,500 · 2. Finanzas, banca y seguros $28,700 · 3. Minería y extracción $27,900 · 4. Construcción e ingeniería civil $25,300 · 5. Ciencias de la computación $24,800 · 6. Ingeniería mecánica y metalurgia $23,900 · 7. Estadística y actuaría $23,500 · 8. Ingeniería eléctrica $22,800 · 9. Ingeniería industrial $22,100 · 10. Arquitectura y urbanismo $21,600.

### Pantalla 2 — Línea del tiempo de la trayectoria (carrera seleccionada)

- Encabezado con el nombre de la carrera elegida (ej. "Finanzas, banca y seguros"), su ícono, salario promedio y un botón para regresar al ranking.
- **Línea del tiempo vertical** central con nodos conectados por una línea con gradiente de #4FC3F7 a #81D4FA. Cada etapa es una card glassmorphism alternando izquierda/derecha del eje (en móvil, todas a la derecha de un eje lateral izquierdo).
- Etapas en orden:
  1. **Licenciatura** — qué licenciatura(s) estudiaron (puede ser más de una opción, ej. "Economía", "Actuaría" o "Contaduría"), con ícono de birrete, duración típica (4–5 años) y las universidades más comunes.
  2. **Universidad** — card con logotipo/imagen ilustrativa del campus, nombre de universidades ejemplo (UNAM, IPN, ITAM) y un chip "pública" o "privada".
  3. **Posgrado (si aplica)** — maestría o especialidad típica, con ícono distintivo y un badge "68% lo cursó" como dato de ejemplo.
  4. **Curso o certificación (si aplica)** — certificaciones típicas del gremio (ej. CFA, cursos de análisis de datos), con ícono de insignia.
  5. **Ascenso en la organización** — puesto típico alcanzado (ej. "Gerente de análisis financiero"), con ícono de gráfica ascendente en verde #69DB7C y el salario en ese nivel.
- Cada nodo del eje es un círculo con ícono; el nodo de la etapa "actual" en el recorrido brilla en #4FC3F7.
- Las etapas condicionales ("si aplica") llevan un chip discreto "opcional" en #FFA94D.
- Sugiere animaciones de scroll: cada card de etapa aparece con fade-in + deslizamiento al entrar al viewport, y la línea del tiempo se va "dibujando" conforme se avanza.
- Cierre de la pantalla: card de resumen "Ruta completa: 6–9 años" y un CTA "Compara esta carrera" en botón píldora #4FC3F7.

### Requisitos generales

- Diseño responsive: versión desktop y móvil (la línea del tiempo pasa de alternada a columna única).
- Íconos de estilo consistente (línea o duotono en blanco/#4FC3F7).
- Ilustraciones o imágenes de apoyo en las cards de universidad y ascenso, con tratamiento azulado para integrarse a la paleta.
- Navbar y footer pueden ser placeholders simples (el sitio ya los tiene).
- Idioma de todos los textos: español (México).

---

## Prompt de ajuste (para re-tematizar un diseño ya generado)

Si Stitch ya generó las pantallas pero en grises/negro, pégale esto como iteración:

> Cambia toda la paleta del diseño: elimina por completo los fondos negros y grises. El fondo de página y de los paneles debe ser azul institucional #024383 (navbar y sidebar pueden usar #0a4fa1). Las cards pasan a blanco translúcido rgba(255,255,255,0.12) con efecto glassmorphism sobre el azul. Mantén el acento #4FC3F7 en botones, íconos y la línea del tiempo, y el texto en blanco (secundario en blanco al 75% de opacidad, no gris). Los chips semánticos: verde #69DB7C, naranja #FFA94D. Aplica un overlay azulado a las fotografías. El resultado debe sentirse luminoso y azul, como el sitio comparacarreras.imco.org.mx, no como un dashboard dark-mode.

## Cómo usarlo

1. Pega el prompt completo en Stitch y genera la Pantalla 1.
2. Itera la Pantalla 2 pidiendo "ahora la vista de trayectoria de la carrera seleccionada" si Stitch no genera ambas de una vez.
3. Pide la variante móvil de la línea del tiempo por separado si hace falta.

## Notas de implementación (para después del diseño)

- Los datos mostrados son de prueba; la estructura de datos real (`carrera → licenciaturas → universidad → posgrado → curso → ascenso`) aún no tiene base de datos. Al implementar, crear un mock en `src/components/que-estudiaron/` siguiendo el patrón de `carrers.data.json`.
- La ruta propuesta de la sección: `/que-estudiaron`, con entrada en el navbar como las demás secciones.
