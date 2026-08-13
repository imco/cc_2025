#!/usr/bin/env python3
"""Pipeline de actualización de datos de Compara Carreras.

Convierte la base cruda de IMCO (CSV "LICENCIATURA Y TSU" + tops JSON) al
formato que consume el sitio:

  - renombra columnas (formato R con puntos -> convención del sitio)
  - mapea los ingresos ajustados a los nombres históricos (INGRESO, INGRESO_H, ...)
  - calcula los campos derivados (porcentajes, tasas, rankings) con las
    fórmulas validadas contra la edición 2025
  - arrastra los campos de ROI/costos de la edición anterior (hasta que IMCO
    entregue los nuevos) empatando por nombre de carrera
  - normaliza nombres (sin comas, sufijos de Desarrollo de software por CVE)
  - copia los 15 tops pregenerados
  - imprime un reporte de validación (altas/bajas, NA, integridad de tops)

Uso:
  python3 scripts/actualizar_datos.py --base <carpeta con CSVs y tops> [--dry-run]
"""

import argparse
import csv
import json
import os
import sys

MASTER_PATH = "src/components/carrers/carrers-data/carrers.data.json"
TOPS_DIR = "src/components/las-10-mas/top"
CSV_NAME = "LICENCIATURA Y TSU.csv"

# columnas crudas (R) -> columnas del sitio
RENOMBRES = {
    "NO.ACTIVA": "NO_ACTIVA",
    "NO.DISPONIBLE": "NO_DISPONIBLE",
    "30.O.MAS": "X30_O_MAS",
    "MENOR.DE.30": "MENOR_DE_30",
    "CARRERA.PROFESIONAL": "CARRERA_PROFESIONAL",
    "INGRESO.CERO": "INGRESO_CERO",
    "SIN.PAGO": "SIN_PAGO",
    "AGRICULTURA.Y.GANADERIA": "AGRICULTURA_Y_GANADERIA",
    "GOBIERNO.Y.ORGANISMOS.INTERNACIONALES": "GOBIERNO_Y_ORGANISMOS_INTERNACIONALES",
    "INDUSTRIA.EXTRACTIVA": "INDUSTRIA_EXTRACTIVA",
    "INDUSTRIA.MANUFACTURERA": "INDUSTRIA_MANUFACTURERA",
    "RESTAURANTES.Y.ALOJAMIENTOS": "RESTAURANTES_Y_ALOJAMIENTOS",
    "SERVICIOS.DIVERSOS": "SERVICIOS_DIVERSOS",
    "SERVICIOS.PROFESIONALES,.FINANCIEROS.Y.CORPORATIVOS": "SERVICIOS_PROFESIONALES_FINANCIEROS_Y_CORPORATIVOS",
    "SERVICIOS.SOCIALES": "SERVICIOS_SOCIALES",
    "TRANSPORTES.Y.COMUNICACIONES": "TRANSPORTES_Y_COMUNICACIONES",
    # ingresos: la base 2026 entrega los valores ajustados por subreporte
    "INGRESO_ajustado": "INGRESO",
    "INGRESO_HOMBRE_ajustado": "INGRESO_H",
    "INGRESO_MUJER_ajustado": "INGRESO_M",
    "INGRESO_FORMAL_ajustado": "INGRESO_FORMAL",
    "INGRESO_INFORMAL_ajustado": "INGRESO_INFORMAL",
    "INGRESO_30.O.MAS_ajustado": "INGRESO_30MAS",
    "INGRESO_MENOR.DE.30_ajustado": "INGRESO_30MENOS",
    "INGRESO_Q25_ajustado": "INGRESO_Q25",
    "INGRESO_Q50_ajustado": "INGRESO_Q50",
    "INGRESO_Q75_ajustado": "INGRESO_Q75",
    "INGRESO_Q100_ajustado": "INGRESO_Q100",
    "INGRESO_CARRERA.PROFESIONAL_ajustado": "INGRESO_LIC",
    "INGRESO_POSGRADO_ajustado": "ING_POSG",
}

# se arrastran de la edición anterior mientras IMCO entrega los nuevos
CAMPOS_ROI = [
    "PROB_EMPL_CAL",
    "COSTO_TOTAL_PRIVADA", "TIEMPO_INVERSION_PRIV", "CI_PRI", "RSI_PRI",
    "COSTO_TOTAL_PUBLICA", "TIEMPO_INVERSION_PUB", "CI_PUB", "RSI_PUB",
]

# indicadores nuevos de la edición 2026 (aún sin sección en el sitio)
CAMPOS_NUEVOS = ["EGRESADOS", "NUEVO_INGRESO", "EJERCE", "NO_EJERCE", "TASA_RIESGO", "TASA_APLICACION"]

# CVE -> sufijo perdido en el CSV crudo
SUFIJOS_CVE = {613: " (Innovación)", 621: " (Implementación)"}

# alias para nombres en tops (sin CVE disponible); el TSU de software es el
# de Innovación (CVE 613), igual que en el maestro
ALIAS_TOPS = {"TSU. Desarrollo de software": "TSU. Desarrollo de software (Innovación)"}


def num(v):
    """'NA'/vacío -> 'NA'; entero -> int; resto -> float."""
    if v is None:
        return "NA"
    s = str(v).strip()
    if s in ("", "NA", "NaN", "N/A"):
        return "NA"
    try:
        f = float(s)
    except ValueError:
        return "NA"
    return int(f) if f.is_integer() and "." not in s and "e" not in s.lower() else f


def div(a, b):
    if a == "NA" or b in ("NA", 0):
        return "NA"
    return a / b


def normalizar_nombre(nombre, cve):
    n = nombre.replace(",", "").replace("  ", " ").strip()
    # convención del sitio: prefijo "TSU. " (algunas entregas traen "TSU " sin punto)
    if n.startswith("TSU ") and not n.startswith("TSU. "):
        n = "TSU. " + n[4:]
    sufijo = SUFIJOS_CVE.get(cve)
    if sufijo and not n.endswith(sufijo.strip()):
        n += sufijo
    return n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True, help="carpeta con los CSVs y tops de IMCO")
    ap.add_argument("--dry-run", action="store_true", help="solo reporte, no escribe archivos")
    args = ap.parse_args()

    anterior = json.load(open(MASTER_PATH, encoding="utf-8"))
    columnas_sitio = list(anterior[0].keys())
    por_nombre_anterior = {c["CARRERA"]: c for c in anterior}

    csv_path = os.path.join(args.base, CSV_NAME)
    filas = list(csv.DictReader(open(csv_path, encoding="utf-8-sig")))
    print(f"Base cruda: {len(filas)} carreras, {len(filas[0])} columnas")

    # --- 1. renombrar columnas y tipar valores
    carreras = []
    for fila in filas:
        c = {}
        for k, v in fila.items():
            c[RENOMBRES.get(k, k)] = v
        cve = num(c["CVE_CARRERA"])
        carrera = {
            "CVE_CARRERA": cve,
            "CARRERA": normalizar_nombre(c["CARRERA"], cve),
        }
        for k, v in c.items():
            if k not in ("CVE_CARRERA", "CARRERA"):
                carrera[k] = num(v)
        carreras.append(carrera)

    # --- 2. campos derivados (fórmulas validadas contra la edición 2025)
    es_tsu = lambda c: c["CARRERA"].startswith("TSU")
    universos = {
        "lic": [c for c in carreras if not es_tsu(c)],
        "tsu": [c for c in carreras if es_tsu(c)],
    }

    for grupo in universos.values():
        suma_total = sum(c["TOTAL"] for c in grupo if c["TOTAL"] != "NA")
        for c in grupo:
            c["PCT_HOMBRE"] = div(c["HOMBRE"], c["TOTAL"])
            c["PCT_MUJER"] = div(c["MUJER"], c["TOTAL"])
            c["PCT_TOTAL"] = div(c["TOTAL"], suma_total)
            c["PCT_30MAS"] = div(c["X30_O_MAS"], c["TOTAL"])
            c["PCT_30MENOS"] = div(c["MENOR_DE_30"], c["TOTAL"])
            c["TASA_OCUPACION"] = div(c["OCUPADO"], c["ACTIVA"])
            for campo, base_col in [
                ("POR_CUENTAPROPIA", "CUENTAPROPIA"), ("POR_EMPLEADOR", "EMPLEADOR"),
                ("POR_SIN_PAGO", "SIN_PAGO"), ("POR_SUBORDINADO", "SUBORDINADO"),
                ("POR_AGRICULTURA", "AGRICULTURA_Y_GANADERIA"), ("POR_COMERCIO", "COMERCIO"),
                # POR_GOBIERNO es en realidad construcción: así viene nombrado
                # desde el origen y así lo espera el sitio
                ("POR_GOBIERNO", "CONSTRUCCION"),
                ("POR_GOBIERNO_1", "GOBIERNO_Y_ORGANISMOS_INTERNACIONALES"),
                ("POR_EXTRACTIVA", "INDUSTRIA_EXTRACTIVA"), ("POR_MANUFACTURA", "INDUSTRIA_MANUFACTURERA"),
                ("POR_RESTAURANTES", "RESTAURANTES_Y_ALOJAMIENTOS"), ("POR_SERVDIVERSOS", "SERVICIOS_DIVERSOS"),
                ("POR_SERVPROFESIONALES", "SERVICIOS_PROFESIONALES_FINANCIEROS_Y_CORPORATIVOS"),
                ("POR_SERVSOCIALES", "SERVICIOS_SOCIALES"), ("POR_TRANSPORTES", "TRANSPORTES_Y_COMUNICACIONES"),
            ]:
                c[campo] = div(c[base_col], c["OCUPADO"])
            c["POR_POSGRADO"] = div(c.get("POSGRADO", "NA"), c["TOTAL"])
            # incremento real: (posgrado/licenciatura - 1) * 100; la base cruda
            # y ediciones previas traían la razón (posgrado/licenciatura * 100)
            ing_posg, ing_lic = c.get("ING_POSG", "NA"), c.get("INGRESO_LIC", "NA")
            c["INCREMENTO_POSGRADO"] = "NA" if "NA" in (ing_posg, ing_lic) or ing_lic == 0 else (ing_posg / ing_lic - 1) * 100

        # rankings 1..N dentro de cada universo
        con_ingreso = sorted([c for c in grupo if c["INGRESO"] != "NA"], key=lambda c: -c["INGRESO"])
        for i, c in enumerate(con_ingreso):
            c["RANK_INGRESO"] = i + 1
        for c in grupo:
            c.setdefault("RANK_INGRESO", "NA")
        egresados = lambda c: (c["EGRESADOS_H"] if c["EGRESADOS_H"] != "NA" else 0) + (c["EGRESADOS_M"] if c["EGRESADOS_M"] != "NA" else 0)
        for i, c in enumerate(sorted(grupo, key=lambda c: -egresados(c))):
            c["RANK_EGRESADOS"] = i + 1

    # --- 3. arrastre de ROI/costos de la edición anterior
    arrastradas = 0
    for c in carreras:
        previa = por_nombre_anterior.get(c["CARRERA"])
        for campo in CAMPOS_ROI:
            c[campo] = previa[campo] if previa else "NA"
        arrastradas += 1 if previa else 0

    # --- 4. ensamblar con el orden histórico de columnas + indicadores nuevos
    orden = columnas_sitio + [k for k in CAMPOS_NUEVOS if k not in columnas_sitio]
    salida, faltantes = [], set()
    for c in carreras:
        registro = {}
        for k in orden:
            if k in c:
                registro[k] = c[k]
            else:
                registro[k] = "NA"
                faltantes.add(k)
        salida.append(registro)

    # --- 5. reporte de validación
    nombres_nuevos = {c["CARRERA"] for c in salida}
    nombres_previos = set(por_nombre_anterior)
    print(f"\n=== Reporte ===")
    print(f"Carreras: {len(anterior)} -> {len(salida)} "
          f"(lic {len(universos['lic'])}, TSU {len(universos['tsu'])})")
    print(f"Entran ({len(nombres_nuevos - nombres_previos)}):")
    for n in sorted(nombres_nuevos - nombres_previos):
        print(f"  + {n}")
    print(f"Salen ({len(nombres_previos - nombres_nuevos)}):")
    for n in sorted(nombres_previos - nombres_nuevos):
        print(f"  - {n}")
    print(f"ROI arrastrado de 2025: {arrastradas}/{len(salida)} carreras")
    if faltantes:
        print(f"AVISO columnas sin fuente (quedan NA): {sorted(faltantes)}")
    for campo in ["INGRESO", "TASA_OCUPACION", "TASA_INFORMALIDAD", "PROB_EMPL_CAL", "CI_PUB"]:
        nas = sum(1 for c in salida if c[campo] == "NA")
        print(f"NA en {campo}: {nas}/{len(salida)}")

    # integridad de tops: se normalizan los nombres (comas, prefijo TSU.) y
    # todo nombre debe existir en el maestro
    tops = {}
    rotos = []
    for t in sorted(f for f in os.listdir(args.base) if f.startswith("top_10") and f.endswith(".json")):
        crudo = json.load(open(os.path.join(args.base, t), encoding="utf-8"))
        tops[t] = {}
        for nombre, valor in crudo.items():
            limpio = normalizar_nombre(nombre, None)
            tops[t][ALIAS_TOPS.get(limpio, limpio)] = valor
        for nombre in tops[t]:
            if nombre not in nombres_nuevos:
                rotos.append(f"{t}: {nombre}")
    print(f"Tops: {len(tops)} archivos; nombres sin carrera en el maestro: {len(rotos)}")
    for r in rotos[:10]:
        print(f"  ! {r}")

    if args.dry_run:
        print("\n(dry-run: no se escribió nada)")
        return

    # --- 6. escribir
    with open(MASTER_PATH, "w", encoding="utf-8") as f:
        json.dump(salida, f, ensure_ascii=False, indent=2)
    for t, datos in tops.items():
        with open(os.path.join(TOPS_DIR, t), "w", encoding="utf-8") as out:
            json.dump(datos, out, ensure_ascii=False, indent=4)
    print(f"\nEscrito: {MASTER_PATH} y {len(tops)} tops en {TOPS_DIR}/")


if __name__ == "__main__":
    if not os.path.exists(MASTER_PATH):
        sys.exit("Ejecuta desde la raíz del proyecto (no se encontró " + MASTER_PATH + ")")
    main()
