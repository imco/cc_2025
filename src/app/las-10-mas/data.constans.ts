import { ComponentType } from "react"
import {
  IconProps,
  UsersIcon,
  UserPlusIcon,
  FemaleIcon,
  MaleIcon,
  StarIcon,
  UserXIcon,
  FileXIcon,
  SproutIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  BanknoteIcon,
  BriefcaseCheckIcon,
  CoinIcon,
} from "@/components/icons"

export type TopInfo = {
  topName: string,
  titleUrl: string,
  icon: ComponentType<IconProps>,
}

// Un card por indicador; los tops con contraparte "Los 10 menos" se
// alcanzan con el switch dentro de la página del top (ver pareja en
// [slug]/data.constans.ts).
export const TopsLists: TopInfo[] = [
  {
    topName: "Las 10 carreras con mayor número de profesionistas",
    titleUrl: "profesionistas",
    icon: UsersIcon
  },
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
    topName: "Las 10 carreras con mayor vinculación laboral",
    titleUrl: "mayor-vinculacion-laboral",
    icon: BriefcaseCheckIcon
  },
  {
    topName: "Las 10 carreras con más estudiantes de nuevo ingreso",
    titleUrl: "mas-nuevo-ingreso",
    icon: UserPlusIcon
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
  {
    topName: "Las 10 carreras con mayor riesgo",
    titleUrl: "mayor-riesgo",
    icon: AlertTriangleIcon
  },
  {
    topName: "Las 10 carreras mejor pagadas",
    titleUrl: "mejor-pagadas",
    icon: BanknoteIcon
  },
  {
    topName: "Las 10 carreras de TSU mejor pagadas",
    titleUrl: "tsu-mejor-pagadas",
    icon: CoinIcon
  }
]
