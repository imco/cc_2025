export type TopDescription = {
  name: string,
  titleUrl: string,
  jsonName: string,
  description: string,
  // tops con contraparte "Los 10 más / Los 10 menos": lado propio y titleUrl de la pareja
  lado?: "mas" | "menos",
  pareja?: string,
}

export const TopsTypes: TopDescription[] = [
  {
    name: "Las 10 carreras con mayor número de profesionistas",
    jsonName: "top_10_numero.json",
    titleUrl: "profesionistas",
    description: "Aquí conocerás la lista de las carreras con más egresados en el país, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-profesionistas"
  },
  {
    name: "Las 10 carreras con menor número de profesionistas",
    jsonName: "top_10_menos_numero.json",
    titleUrl: "menos-profesionistas",
    description: "Aquí conocerás la lista de las carreras con menos egresados en el país, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "profesionistas"
  },
  {
    name: "Las 10 carreras con mayor calidad de inversión en universidades privadas",
    jsonName: "top_10_calidad_inversion_privada.json",
    titleUrl: "calidad-inversion",
    description: "Aquí conocerás la lista de las carreras privadas que obtuvieron la mayor calificación en el Índice de Calidad de la Inversión de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor calidad de inversión en universidades públicas",
    jsonName: "top_10_calidad_inversion_publica.json",
    titleUrl: "calidad-inversion-publicas",
    description: "Aquí conocerás la lista de las carreras públicas que obtuvieron la mayor calificación en el Índice de Calidad de la Inversión de Compara Carreras."
  },
  {
    name: "Las 10 carreras con el mayor porcentaje de mujeres en nuevo ingreso",
    jsonName: "top_10_mujeres_nuevo_ingresos.json",
    titleUrl: "porcentaje-ingreso-mujeres",
    description: "Aquí conocerás la lista de las carreras cuya matrícula de nuevo ingreso está principalmente compuesta por mujeres, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con el mayor porcentaje de hombres en nuevo ingreso",
    jsonName: "top_10_hombres_nuevo_ingresos.json",
    titleUrl: "porcentaje-ingreso-hombres",
    description: "Aquí conocerás la lista de las carreras cuya matrícula de nuevo ingreso está principalmente compuesta por hombres, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor vinculación laboral",
    jsonName: "top_10_mas_aplicacion.json",
    titleUrl: "mayor-vinculacion-laboral",
    description: "Aquí conocerás la lista de carreras en el que mayor porcentaje de sus egresados trabajan en algo relacionado a lo que estudiaron, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menor-vinculacion-laboral"
  },
  {
    name: "Las 10 carreras con menor vinculación laboral",
    jsonName: "top_10_menos_aplicacion.json",
    titleUrl: "menor-vinculacion-laboral",
    description: "Aquí conocerás la lista de carreras en el que menor porcentaje de sus egresados trabajan en algo relacionado a lo que estudiaron, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "mayor-vinculacion-laboral"
  },
  {
    name: "Las 10 carreras más demandadas (porcentaje de aceptación en universidades públicas)",
    jsonName: "top_10_mas_demandadas_publicas.json",
    titleUrl: "demanda-publica",
    description: "Aquí conocerás la lista de las carreras que reciben una mayor cantidad de solicitudes de ingreso dada su oferta disponible de espacios, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-demandadas"
  },
  {
    name: "Las 10 carreras menos demandadas (porcentaje de aceptación en universidades públicas)",
    jsonName: "top_10_menos_demandadas_publicas.json",
    titleUrl: "menos-demandadas",
    description: "Aquí conocerás la lista de las carreras que reciben una menor cantidad de solicitudes de ingreso dada su oferta disponible de espacios, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "demanda-publica"
  },
  {
    name: "Las 10 carreras con mayor porcentaje de mujeres",
    jsonName: "top_10_mas_mujeres.json",
    titleUrl: "porcentaje-mujeres",
    description: "Aquí conocerás la lista de las carreras cuya matrícula está principalmente compuesta por mujeres, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor porcentaje de hombres",
    jsonName: "top_10_mas_hombres.json",
    titleUrl: "porcentaje-hombres",
    description: "Aquí conocerás la lista de las carreras cuya matrícula está principalmente compuesta por hombres, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor porcentaje de desempleados",
    jsonName: "top_10_mas_desempleados.json",
    titleUrl: "desempleados",
    description: "Aquí conocerás la lista de las carreras con la mayor proporción de desempleados, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-desempleados"
  },
  {
    name: "Las 10 carreras con menor porcentaje de desempleados",
    jsonName: "top_10_menos_desempleados.json",
    titleUrl: "menos-desempleados",
    description: "Aquí conocerás la lista de las carreras con la menor proporción de desempleados, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "desempleados"
  },
  {
    name: "Las 10 carreras con mayor porcentaje de informalidad",
    jsonName: "top_10_mas_informalidad.json",
    titleUrl: "informalidad",
    description: "Aquí conocerás la lista de las carreras con la mayor proporción de informalidad laboral, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-informalidad"
  },
  {
    name: "Las 10 carreras con menor porcentaje de informalidad",
    jsonName: "top_10_menos_informalidad.json",
    titleUrl: "menos-informalidad",
    description: "Aquí conocerás la lista de las carreras con la menor proporción de informalidad laboral, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "informalidad"
  },
  {
    name: "Las 10 carreras con mayor porcentaje de jóvenes",
    jsonName: "top_10_mas_jovenes.json",
    titleUrl: "porcentaje-jovenes",
    description: "Aquí conocerás la lista de las carreras con la mayor proporción de egresados menores de 30 años, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con más profesionistas con posgrado",
    jsonName: "top_10_posgrado.json",
    titleUrl: "posgrado",
    description: "Aquí conocerás la lista de las carreras cuyos egresados más acceden a un posgrado, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor matrícula",
    jsonName: "top_10_matricula.json",
    titleUrl: "matricula",
    description: "Aquí conocerás la lista de las carreras con más estudiantes, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-matricula"
  },
  {
    name: "Las 10 carreras con menor matrícula",
    jsonName: "top_10_menos_matricula.json",
    titleUrl: "menos-matricula",
    description: "Aquí conocerás la lista de las carreras con menos estudiantes, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "matricula"
  },
  {
    name: "Las 10 carreras con más estudiantes de nuevo ingreso",
    jsonName: "top_10_mas_nuevo_ingresos.json",
    titleUrl: "mas-nuevo-ingreso",
    description: "Aquí conocerás la lista de las carreras que registraron más estudiantes de nuevo ingreso en el último ciclo escolar, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menos-nuevo-ingreso"
  },
  {
    name: "Las 10 carreras con menos estudiantes de nuevo ingreso",
    jsonName: "top_10_menos_nuevo_ingresos.json",
    titleUrl: "menos-nuevo-ingreso",
    description: "Aquí conocerás la lista de las carreras que registraron menos estudiantes de nuevo ingreso en el último ciclo escolar, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "mas-nuevo-ingreso"
  },
  {
    name: "Las 10 carreras con mayor tasa de retorno en universidades públicas",
    jsonName: "top_10_rsi_pub.json",
    titleUrl: "mayor-tasa-retorno-publicas",
    description: "Aquí conocerás la lista de las carreras públicas con tasa de retorno sobre la inversión más alta, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor tasa de retorno en universidades privadas",
    jsonName: "top_10_rsi_priv.json",
    titleUrl: "mayor-tasa-retorno-privadas",
    description: "Aquí conocerás la lista de las carreras privadas con tasa de retorno sobre la inversión más alta, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con menor tasa de retorno en universidades públicas",
    jsonName: "top_10_peor_rsi_pub.json",
    titleUrl: "menor-tasa-retorno-publicas",
    description: "Aquí conocerás la lista de las carreras públicas con tasa de retorno sobre la inversión más baja, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con menor tasa de retorno en universidades privadas",
    jsonName: "top_10_peor_rsi_priv.json",
    titleUrl: "menor-tasa-retorno-privadas",
    description: "Aquí conocerás la lista de las carreras privadas con tasa de retorno sobre la inversión más baja, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor riesgo",
    jsonName: "top_10_riesgo.json",
    titleUrl: "mayor-riesgo",
    description: "Aquí conocerás la lista de las carreras con mayor riesgo (mayor probabilidad de acceder a empleos informales o desempleo), de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "menor-riesgo"
  },
  {
    name: "Las 10 carreras con menor riesgo",
    jsonName: "top_10_menos_riesgo.json",
    titleUrl: "menor-riesgo",
    description: "Aquí conocerás la lista de las carreras con menor riesgo (mayor probabilidad de acceder a empleos informales o desempleo), de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "mayor-riesgo"
  },
  {
    name: "Las 10 carreras mejor pagadas",
    jsonName: "top_10_mejor_pagadas.json",
    titleUrl: "mejor-pagadas",
    description: "Aquí conocerás la lista de las carreras con el mayor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "peor-pagadas"
  },
  {
    name: "Las 10 carreras peor pagadas",
    jsonName: "top_10_peor_pagadas.json",
    titleUrl: "peor-pagadas",
    description: "Aquí conocerás la lista de las carreras con el menor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "mejor-pagadas"
  },
  {
    name: "Las 10 carreras de TSU mejor pagadas",
    jsonName: "top_10_tsu_mejor_pagadas.json",
    titleUrl: "tsu-mejor-pagadas",
    description: "Aquí conocerás la lista de las carreras de Técnico Superior Universitario (TSU) con el mayor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras.",
    lado: "mas",
    pareja: "tsu-peor-pagadas"
  },
  {
    name: "Las 10 carreras de TSU peor pagadas",
    jsonName: "top_10_tsu_peor_pagadas.json",
    titleUrl: "tsu-peor-pagadas",
    description: "Aquí conocerás la lista de las carreras de Técnico Superior Universitario (TSU) con el menor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras.",
    lado: "menos",
    pareja: "tsu-mejor-pagadas"
  }
]
