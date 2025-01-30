export type TopDescription = {
  name: string,
  titleUrl: string,
  jsonName: string,
  description: string,
}

export const TopsTypes: TopDescription[] = [
  {
    name: "Las 10 carreras con mayor número de profesionistas",
    jsonName: "top_10_numero.json",
    titleUrl: "profesionistas",
    description: "Aquí conocerás la lista de las carreras con más egresados en el país, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor calidad de inversión en universidades privadas",
    jsonName: "top_10_calidad_inversion_privada.json",
    titleUrl: "calidad-inversion",
    description: "Aquí conocerás la lista de las carreras públicas que obtuvieron la mayor calificación en el Índice de Calidad de la Inversión de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor calidad de inversión en universidades públicas",
    jsonName: "top_10_calidad_inversion_publica.json",
    titleUrl: "calidad-inversion-publicas",
    description: "Aquí conocerás la lista de las carreras privadas que obtuvieron la mayor calificación en el Índice de Calidad de la Inversión de Compara Carreras."
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
    name: "Las 10 carreras más demandadas (porcentaje de aceptación en universidades públicas)",
    jsonName: "top_10_mas_demandadas.json",
    titleUrl: "demanda-publica",
    description: "Aquí conocerás la lista de las carreras que reciben una mayor cantidad de solicitudes de ingreso dada su oferta disponible de espacios, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor porcentaje de mujeres",
    jsonName: "top_10_mas_mujeres.json",
    titleUrl: "porcentaje-mujeres",
    description: "Aquí conocerás la lista de las carreras cuya matrícula está principalmente compuesta por mujeres, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor porcentaje de desempleados",
    jsonName: "top_10_mas_desempleados.json",
    titleUrl: "desempleados",
    description: "Aquí conocerás la lista de las carreras con la mayor proporción de desempleados, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con mayor porcentaje de informalidad",
    jsonName: "top_10_mas_informalidad.json",
    titleUrl: "informalidad",
    description: "Aquí conocerás la lista de las carreras con la mayor proporción de informalidad laboral, de acuerdo con el ranking de Compara Carreras."
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
    description: "Aquí conocerás la lista de las carreras con más estudiantes, de acuerdo con el ranking de Compara Carreras."
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
    description: "Aquí conocerás la lista de las carreras con mayor riesgo (mayor probabilidad de acceder a empleos informales o desempleo), de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras con menor riesgo",
    jsonName: "top_10_menos_riesgo.json",
    titleUrl: "menor-riesgo",
    description: "Aquí conocerás la lista de las carreras con menor riesgo (mayor probabilidad de acceder a empleos informales o desempleo), de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras mejor pagadas",
    jsonName: "top_10_mejor_pagadas.json",
    titleUrl: "mejor-pagadas",
    description: "Aquí conocerás la lista de las carreras con el mayor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras."
  },
  {
    name: "Las 10 carreras peor pagadas",
    jsonName: "top_10_peor_pagadas.json",
    titleUrl: "peor-pagadas",
    description: "Aquí conocerás la lista de las carreras con el menor ingreso promedio mensual, de acuerdo con el ranking de Compara Carreras."
  }
]
