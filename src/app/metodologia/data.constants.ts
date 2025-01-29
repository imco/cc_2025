export type MetodologyContent = {
  title: string,
  text: string
}

export const HowMuchAre: MetodologyContent[] = [
  {
    title: "Total: ",
    text: "Se refiere al total de profesionistas de la carrera a nivel nacional",
  },
  {
    title: "Porcentaje de profesionistas: ",
    text: "Profesionistas de la carrera como porcentaje del total de profesionistas a nivel nacional."
  },
  {
    title: "Mujeres/Hombres: ",
    text: "Segmentación por sexo de los profesionistas de la carrera."
  },
  {
    title: "Población Económicamente Activa (PEA): ",
    text: "Población que actualmente cuenta con un trabajo o que está activamente buscando uno."
  },
  {
    title: "Población No Económicamente Activa (PNEA): ",
    text: "Población que no está buscando un trabajo activamente o no está interesado en tener uno."
  },
  {
    title: "Desocupados: ",
    text: "PEA que no tiene un empleo pero está en búsqueda de uno."
  },
  {
    title: "Disponibles: ",
    text: "PNEA que no se encuentra activamente buscando un trabajo pero aceptaría uno si se le presentara una oportunidad."
  },
  {
    title: "No disponible: ",
    text: "PNEA que no busca un empleo y no aceptaría uno aunque se le presentara una oportunidad."
  },
  {
  title:  "Menos de 30 años/30 años y más: ",
  text: "Segmentación por grupo de edad de los profesionistas de la carrera."
  },
  {
    title: "Desanimado: ",
    text: "PNEA no disponible que no se dedica a estudiar, ni hacer tareas domésticas, no es una persona pensionada o jubilada ni tiene una incapacidad. No existe una limitante que no le permita aceptar o buscar un empleo."
  }
]

export const WhatTheyWork: MetodologyContent[] = [
  {
    title: "Ocupación: ",
    text: "Porcentaje de profesionistas que cuentan con un empleo como proporción de aquellos que están activos en el mercado laboral (ocupados/PEA)."
  },
  {
    title: "Desempleo: ",
    text: "Porcentaje de profesionistas desocupados como proporción de aquellos que están activos en el mercado laboral (desocupados/PEA)."
  },
  {
    title: "Informalidad: ",
    text: "Porcentaje de profesionistas ocupados que tienen un trabajo en la informalidad, esto es, un empleo no amparado por el marco legal (ej. trabajos sin protección de la seguridad social), como proporción de aquellos profesionistas ocupados (informales/ocupados)."
  }
]

export const PositionsInWork: MetodologyContent[] = [
  {
    title: "Subordinado: ",
    text: "Empleados que trabajan a cambio de un pago y dependen laboralmente de un jefe o superior."
  },
  {
    title: "Empleador: ",
    text: 'Trabajador que da empleo a personas a cambio de una remuneración económica.'
  },
  {
    title: "Cuenta propia: ",
    text: "Trabajadores que desempeñan su profesión solos o asociados con otros. Estos trabajadores disponen de sus propias herramientas o medios de producción y son dueños del bien o servicio que venden."
  },
  {
    title: "Trabajador sin pago: ",
    text: "Personas ocupadas que trabajan sin recibir a cambio una remuneración económica."
  }
]

export const HowMuchWon: MetodologyContent[] = [
  {
    title: "25% de los profesionistas gana menos de esta cantidad (P25): ",
    text: "Salario mensual por debajo del cual está 25% de los profesionistas que menos ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario superior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte baja de la escala salarial de esta carrera, o un profesional con un desempeño inferior a la mediana."
  },
  {
    title: "Ingreso mediano: ",
    text: "Salario mensual que divide a los profesionistas de una carrera en dos grupos de igual proporción, dejando 50% por debajo de ese salario y el otro 50% por arriba. Es una medida de cuánto podría estar ganando un profesional que se encuentre a la mitad de la escala salarial de esta carrera."
  },
  {
    title: "25% de los profesionistas gana más de esta cantidad (P75): ",
    text: "Salario mensual por arriba del cual está 25% de los profesionistas que más ganan. De manera equivalente, 75% de los profesionistas de esta carrera tienen un salario inferior a éste. Es una medida de cuánto podría estar ganando un profesional en la parte alta de la escala salarial de esta carrera, o un profesional con un desempeño superior a la mediana."
  }
]

export const HowMuchWonPhD: MetodologyContent[] = [
  {
    title: "Obtienen posgrado: ",
    text: "Porcentaje de profesionistas de cada carrera con estudios de maestría o doctorado."
  },
  {
    title: "Salario promedio mensual con posgrado: ",
    text: "Promedio aritmético del salario de los profesionistas de esta carrera que tienen maestría o doctorado ajustado por el estimado del subreporte de ingresos para personas con posgrado del comparativo ENOE-ENIGH."
  },
  {
  title: "Incremento salarial con posgrado: ",
  text: "Cambio porcentual en el salario promedio de los profesionistas con posgrado, respecto al promedio de los que sólo tienen licenciatura."
  }
]

export const IdOfIds: MetodologyContent[] = [
  {
    title:"Universidades que imparten la carrera: ",
    text: "Número total de universidades que ofrecen cada carrera."
  },
  {
    title:"Actualmente la cursan: ",
    text: "Número total de estudiantes matriculados en la carrera en el ciclo escolar 2022-2023."
  },
  {
    title: "Top 5 en matrícula: ",
    text: "Lista de las primeras cinco universidades con mayor número de estudiantes en la carrera y su distribución por sexo."
  }
]
