import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'roi-calculations.json');

export interface DatosRoiAlmacenados {
  id: string;
  fecha: string;
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
}

async function asegurarDirectorioExiste() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function guardarRoiEnArchivoLocal(datos: Omit<DatosRoiAlmacenados, 'id' | 'fecha'>) {
  await asegurarDirectorioExiste();

  let datosActuales: DatosRoiAlmacenados[] = [];

  try {
    const contenidoArchivo = await fs.readFile(FILE_PATH, 'utf-8');
    datosActuales = JSON.parse(contenidoArchivo);
  } catch {
    // Si el archivo no existe o está vacío/inválido, iniciar con array vacío
    datosActuales = [];
  }

  const nuevoRegistro: DatosRoiAlmacenados = {
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
    ...datos,
  };

  datosActuales.push(nuevoRegistro);

  await fs.writeFile(FILE_PATH, JSON.stringify(datosActuales, null, 2), 'utf-8');

  return nuevoRegistro;
}
