# 📊 Guía de Configuración: Google Sheets para Calculadora ROI

Para que la calculadora guarde los datos en tu Google Sheet, necesitamos configurar un "robot" (Service Account) que tenga permiso de escribir en ella.

## Paso 1: Crear la Hoja de Cálculo
1. Ve a [Google Sheets](https://sheets.new) y crea una hoja nueva.
2. Ponle un nombre, ej: `Base de Datos - Compara Carreras`.
3. En la primera fila (encabezados), escribe exactamente estos nombres en orden (A1, B1, C1...):
   - `ID`
   - `Fecha`
   - `Nivel Educativo`
   - `Tipo Universidad`
   - `Carrera`
   - `Carrera Personalizada`
   - `Unidad Plan`
   - `Periodos`
   - `Costo Periodo`
   - `Costo Total`
   - `Meses Recuperacion`
   - `RSI Porcentaje`

4. Copia el **ID de la hoja** de la URL.
   - URL: `https://docs.google.com/spreadsheets/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/edit`
   - ID: `1aBcDeFgHiJkLmNoPqRsTuVwXyZ` (la parte larga entre `/d/` y `/edit`)

## Paso 2: Crear Credenciales en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto (o usa uno existente).
3. Busca **"Google Sheets API"** en la barra de búsqueda y **Habilítala**.
4. Ve a **"APIs & Services"** > **"Credentials"**.
5. Click en **"Create Credentials"** > **"Service Account"**.
6. Ponle un nombre (ej: `roi-calculator-bot`) y dale "Create".
7. (Opcional) Dale rol de "Editor" si te pregunta, o déjalo vacío y "Done".
8. En la lista de Service Accounts, haz click en el email del bot que acabas de crear (ej: `roi-calculator-bot@tu-proyecto.iam.gserviceaccount.com`).
9. Ve a la pestaña **"Keys"** > **"Add Key"** > **"Create new key"**.
10. Selecciona **JSON** y descarga el archivo.

## Paso 3: Conectar el Bot a la Hoja
1. Abre el archivo JSON que descargaste.
2. Copia el correo que dice `"client_email"`.
3. Ve a tu Google Sheet.
4. Click en el botón **"Compartir"** (Share).
5. Pega el correo del bot y asegúrate que tenga permisos de **Editor**.
6. Dale "Enviar".

## Paso 4: Configurar Variables de Entorno
En tu proyecto (o en Vercel), agrega estas variables de entorno con los datos del archivo JSON:

```env
GOOGLE_SHEET_ID=el_id_que_copiaste_en_paso_1
GOOGLE_SERVICE_ACCOUNT_EMAIL=el_client_email_del_json
GOOGLE_PRIVATE_KEY="todo_el_texto_de_private_key_del_json"
```
**Nota**: El `GOOGLE_PRIVATE_KEY` debe incluir los `-----BEGIN PRIVATE KEY-----` y saltos de línea. En Vercel se pega tal cual. En `.env.local` asegúrate de usar comillas si tiene saltos de línea.
