# Compara Carreras

- [Compara Carreras](#compara-carreras)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación y configuración](#instalación-y-configuración)
  - [Desarrollo local](#desarrollo-local)
  - [Actualización del sistema](#actualización-del-sistema)
  - [Conversión de CSV a JSON](#conversión-de-csv-a-json)
  - [Despliegue](#despliegue)
  - [Contribuciones](#contribuciones)
  - [Contacto](#contacto)

Este es el repositorio del proyecto **Compara Carreras**, desarrollado por **IMCO**. Este proyecto está construido con **Next.js** y utiliza **GitHub Pages** para el despliegue, con soporte de **GitHub Actions** para la automatización del proceso.

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- npm
- Acceso al repositorio en GitHub

## Instalación y configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/IMCO/compara-carreras.git
   cd compara-carreras
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Desarrollo local

Para correr el proyecto en un entorno local, ejecuta:

```bash
npm run dev
```

Esto levantará un servidor local en `http://localhost:3000`.

### Variables de Entorno (.env.local)

Para que la integración con Google Sheets funcione localmente, crea un archivo `.env.local` en la raíz con:

```env
GOOGLE_SHEET_ID=tu_id_de_hoja
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu_email_de_servicio
GOOGLE_PRIVATE_KEY="tu_clave_privada"
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Actualización del sistema

Para realizar actualizaciones al sistema, sigue estos pasos:

1. **Crea una rama nueva** basada en `main`:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Realiza los cambios necesarios** en el código y prueba el proyecto localmente.
3. **Confirma y sube los cambios**:

   ```bash
   git add .
   git commit -m "Añadida nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```

4. **Crea un Pull Request (PR)** en GitHub desde la rama creada hacia `main` y espera la revisión.
5. **Una vez aprobado el PR**, haz merge a `main`.

## Conversión de CSV a JSON

Si necesitas convertir archivos CSV a JSON para el proyecto, puedes utilizar la siguiente herramienta en línea:

[https://csvjson.com/](https://csvjson.com/)

## Despliegue (Arquitectura Híbrida)

El proyecto utiliza una **arquitectura híbrida** para soportar funcionalidades de servidor (como la integración con Google Sheets) manteniendo el frontend estático en GitHub Pages.

### Componentes
1.  **Frontend (GitHub Pages)**: Alojamiento estático. Se construye con `output: 'export'`.
2.  **Backend (Vercel)**: Alojamiento de servidor (Node.js). Provee la API (`/api/roi`) para manejar peticiones seguras.

### Configuración de Entornos

#### 1. Vercel (Backend)
El proyecto debe desplegarse en Vercel para habilitar la API.
*   **Variables de Entorno requeridas en Vercel**:
    *   `GOOGLE_SHEET_ID`: ID de la hoja de cálculo.
    *   `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Email de la cuenta de servicio.
    *   `GOOGLE_PRIVATE_KEY`: Llave privada de la cuenta de servicio.
#### 2. GitHub Pages (Frontend)
El flujo de trabajo de GitHub Actions (`.github/workflows/nextjs.yml`) se encarga de construir y desplegar el sitio estático.
*   **Secretos de Repositorio requeridos en GitHub**:
    *   `NEXT_PUBLIC_API_URL`: URL del proyecto desplegado en Vercel (ej. `https://tu-proyecto.vercel.app`). **Nota**: Sin la barra `/` al final.

### Flujo de Despliegue Automático
1.  Al hacer push a `main`, GitHub Actions inicia el proceso.
2.  Elimina la carpeta `src/app/api` para evitar conflictos con la exportación estática.
3.  Construye el proyecto inyectando `NEXT_PUBLIC_API_URL`.
4.  Despliega los archivos estáticos a GitHub Pages.

El sitio estará disponible en:
```text
https://comparacarreras.imco.org.mx/
```

## Contribuciones

Si deseas contribuir, por favor abre un **Issue** o un **Pull Request** siguiendo las mejores prácticas de desarrollo.

## Sección de Investigaciones

El proyecto incluye una sección automatizada de "Investigaciones" que muestra las últimas publicaciones de Compara Carreras.

### Agregar nueva investigación

El proceso de agregar nuevas ediciones está **completamente automatizado**. El sistema extrae el título, descripción e imagen directamente de la URL proporcionada.

1.  Edita el archivo `src/app/investigaciones/data.constants.ts`.
2.  Agrega la nueva configuración:

    ```typescript
    {
      id: "cc-2026",
      year: 2026,
      url: "https://imco.org.mx/nueva-investigacion/"
    }
    ```

Para más detalles, consulta la guía completa en [COMO_AGREGAR_INVESTIGACIONES.md](./COMO_AGREGAR_INVESTIGACIONES.md).

## Analítica (GA4)

El proyecto utiliza Google Analytics 4 para el seguimiento de usuarios.

- **Eventos personalizados**: Se rastrean cálculos de ROI (`roi_calculation`).
- **Dimensiones personalizadas**: Nivel educativo, carrera, tipo de universidad, etc.
- **Métricas personalizadas**: Costo total, meses de recuperación, RSI, etc.

Consulta `ANALYTICS_DATA_COLLECTION.md` para ver la especificación completa de eventos.

## Contacto

Para más información, contacta con el equipo de IMCO a través de su página oficial: [https://imco.org.mx](https://imco.org.mx).
