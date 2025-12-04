'use server';

import { agregarFilaSheet } from '@/utils/google-sheets';

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

export async function guardarCalculoRoi(datos: DatosEnvioRoi) {
  try {
    const resultado = await agregarFilaSheet(datos);
    if (!resultado.exito) {
      throw new Error(resultado.error);
    }
    return { exito: true };
  } catch (error) {
    console.error('Error al guardar cálculo ROI:', error);
    return { exito: false, error: 'Error al guardar datos' };
  }
}
