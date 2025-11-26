# Cómo Agregar Nuevas Ediciones a la Sección de Investigaciones

La sección de "Investigaciones" ha sido automatizada para facilitar la adición de nuevas publicaciones. Ya no es necesario copiar manualmente el título, descripción o buscar la imagen. El sistema lo hará automáticamente a partir de la URL.

## Pasos para agregar una nueva edición

1.  Abre el archivo de configuración:
    `src/app/investigaciones/data.constants.ts`

2.  Agrega un nuevo objeto al inicio del arreglo `RESEARCH_CONFIG`:

    ```typescript
    {
      id: "cc-2026", // ID único (ej. cc-AÑO)
      year: 2026,    // Año de la edición
      url: "https://imco.org.mx/tu-nueva-investigacion/", // URL de la publicación en IMCO
    },
    ```

3.  ¡Listo!
    - El sistema visitará automáticamente esa URL.
    - Extraerá el **Título** de la etiqueta `og:title`.
    - Extraerá la **Descripción** de la etiqueta `og:description`.
    - Extraerá la **Imagen** de la etiqueta `og:image`.

## Notas Importantes

- **Imágenes**: El sistema buscará la imagen definida en la metadata de la página (Open Graph). Asegúrate de que la publicación en el sitio de IMCO tenga una imagen destacada configurada.
- **Títulos**: El sistema limpiará automáticamente el sufijo " - IMCO" si está presente en el título.
- **Orden**: Las investigaciones se muestran en el orden en que aparecen en el archivo `data.constants.ts`. Agrega las nuevas al principio para que aparezcan primero.

## Solución de Problemas

Si una investigación muestra "Error cargando información":
1. Verifica que la URL sea correcta y accesible.
2. Asegúrate de que la página tenga las etiquetas meta `og:title`, `og:description` y `og:image`.
