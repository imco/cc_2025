import { ComponentType } from "react"
import {
  IconProps,
  UsersIcon,
  FemaleIcon,
  MaleIcon,
  StarIcon,
  UserXIcon,
  FileXIcon,
  SproutIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  BanknoteIcon,
  TrendingDownIcon,
} from "@/components/icons"

export type TopInfo = {
  topName: string,
  titleUrl: string,
  icon: ComponentType<IconProps>,
}

export const TopsLists: TopInfo[] = [
  {
    topName: "Las 10 carreras con mayor número de profesionistas",
    titleUrl: "profesionistas",
    icon: UsersIcon
  },
 /*  {
    topName: "Las 10 carreras con mayor calidad de inversión en universidades privadas",
    titleUrl: "calidad-inversion"
  },
  {
    topName: "Las 10 carreras con mayor calidad de inversión en universidades públicas",
    titleUrl: "calidad-inversion-publicas"
  }, */
  {
    topName: "Las 10 carreras con el mayor porcentaje de mujeres en nuevo ingreso",
    titleUrl: "porcentaje-ingreso-mujeres",
    icon: FemaleIcon
  },
  {
    topName: "Las 10 carreras con el mayor porcentaje de hombres en nuevo ingreso",
    titleUrl: "porcentaje-ingreso-hombres",
    icon: MaleIcon
  },
  {
    topName: "Las 10 carreras más demandadas (porcentaje de aceptación en universidades públicas)",
    titleUrl: "demanda-publica",
    icon: StarIcon
  },
  {
    topName: "Las 10 carreras con mayor porcentaje de mujeres",
    titleUrl: "porcentaje-mujeres",
    icon: FemaleIcon
  },
  {
    topName: "Las 10 carreras con mayor porcentaje de hombres",
    titleUrl: "porcentaje-hombres",
    icon: MaleIcon
  },
  {
    topName: "Las 10 carreras con mayor porcentaje de desempleados",
    titleUrl: "desempleados",
    icon: UserXIcon
  },
  {
    topName: "Las 10 carreras con mayor porcentaje de informalidad",
    titleUrl: "informalidad",
    icon: FileXIcon
  },
  {
    topName: "Las 10 carreras con mayor porcentaje de jóvenes",
    titleUrl: "porcentaje-jovenes",
    icon: SproutIcon
  },
  {
    topName: "Las 10 carreras con más profesionistas con posgrado",
    titleUrl: "posgrado",
    icon: GraduationCapIcon
  },
  {
    topName: "Las 10 carreras con mayor matrícula",
    titleUrl: "matricula",
    icon: ClipboardListIcon
  },
  /* {
    topName: "Las 10 carreras con mayor tasa de retorno en universidades públicas",
    titleUrl: "mayor-tasa-retorno-publicas"
  },
  {
    topName: "Las 10 carreras con mayor tasa de retorno en universidades privadas",
    titleUrl: "mayor-tasa-retorno-privadas"
  },
  {
    topName: "Las 10 carreras con menor tasa de retorno en universidades públicas",
    titleUrl: "menor-tasa-retorno-publicas"
  },
  {
    topName: "Las 10 carreras con menor tasa de retorno en universidades privadas",
    titleUrl: "menor-tasa-retorno-privadas"
  }, */
  {
    topName: "Las 10 carreras con mayor riesgo",
    titleUrl: "mayor-riesgo",
    icon: AlertTriangleIcon
  },
  {
    topName: "Las 10 carreras con menor riesgo",
    titleUrl: "menor-riesgo",
    icon: ShieldCheckIcon
  },
  {
    topName: "Las 10 carreras mejor pagadas",
    titleUrl: "mejor-pagadas",
    icon: BanknoteIcon
  },
  {
    topName: "Las 10 carreras peor pagadas",
    titleUrl: "peor-pagadas",
    icon: TrendingDownIcon
  }
]
