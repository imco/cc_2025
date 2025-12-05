import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export type DatosEnvioRoi = {
  nivel_educativo: string;
  tipo_universidad: string;
  carrera: string;
  carrera_personalizada?: string;
  unidad_plan: string;
  periodos: number;
  costo_por_periodo: number;
  costo_total: number;
  meses_recuperacion: number | null;
  porcentaje_rsi: number | null;
};


// Definir las variables de entorno
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

export async function agregarFilaSheet(datos: DatosEnvioRoi) {
  // Validar credenciales
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error('Faltan credenciales de Google Sheets en variables de entorno.');
    // No lanzamos error para no romper la app, pero logueamos el problema
    return { exito: false, error: 'Configuración de servidor incompleta' };
  }

  try {
    // Configurar autenticación
    const serviceAccountAuth = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, '\n'), // Manejar saltos de línea escapados
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);

    // Cargar info del documento
    await doc.loadInfo();

    // Obtener la primera hoja
    const sheet = doc.sheetsByIndex[0];

    // Preparar fila
    const nuevaFila = {
      ID: crypto.randomUUID(),
      Fecha: new Date().toISOString(),
      'Nivel Educativo': datos.nivel_educativo,
      'Tipo Universidad': datos.tipo_universidad,
      Carrera: datos.carrera,
      'Carrera Personalizada': datos.carrera_personalizada || '',
      'Unidad Plan': datos.unidad_plan,
      Periodos: datos.periodos,
      'Costo Periodo': datos.costo_por_periodo,
      'Costo Total': datos.costo_total,
      'Meses Recuperacion': datos.meses_recuperacion ?? '',
      'RSI Porcentaje': datos.porcentaje_rsi ?? '',
    };

    // Intentar cargar encabezados, si falla o están vacíos, crearlos
    try {
      await sheet.loadHeaderRow();
    } catch {
      // Si falla es probable que esté vacía, asignamos los headers
      await sheet.setHeaderRow(Object.keys(nuevaFila));
    }

    // Agregar fila
    await sheet.addRow(nuevaFila);

    return { exito: true };
  } catch (error) {
    console.error('Error al guardar en Google Sheets:', error);
    return { exito: false, error: 'Error de conexión con Google Sheets' };
  }
}
