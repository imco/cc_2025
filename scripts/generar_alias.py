#!/usr/bin/env python3
"""Genera el diccionario de nombres auxiliares del buscador a partir del
archivo oficial de INEGI (Nombres auxiliares de carreras CMPE 2016).

Empata cada clave del archivo contra CVE_CARRERA del catálogo del sitio
(carrers.data.json); una misma clave puede corresponder a la licenciatura y a
su versión TSU, y ambas reciben los alias.

Salida: src/components/search/carrer-alias-inegi.data.ts (generado; los alias
manuales viven aparte en carrer-alias.data.ts y se combinan al exportar).

Uso:
  python3 scripts/generar_alias.py --fuente <ruta al .xlsx o .csv>
"""

import argparse
import csv
import json
import os
import sys

MASTER_PATH = "src/components/carrers/carrers-data/carrers.data.json"
SALIDA = "src/components/search/carrer-alias-inegi.data.ts"


def leer_filas(ruta):
    if ruta.lower().endswith(".xlsx"):
        import openpyxl
        wb = openpyxl.load_workbook(ruta, read_only=True)
        ws = wb.worksheets[0]
        return [[("" if v is None else str(v)) for v in fila] for fila in ws.iter_rows(values_only=True)]
    # CSV: probar utf-8 y reparar mojibake (utf-8 leído como latin-1)
    crudo = open(ruta, "rb").read()
    try:
        texto = crudo.decode("utf-8")
    except UnicodeDecodeError:
        texto = crudo.decode("latin-1")
    if "Ã" in texto:  # mojibake típico: 'DiseÃ±o' -> 'Diseño'
        try:
            texto = texto.encode("latin-1").decode("utf-8")
        except (UnicodeDecodeError, UnicodeEncodeError):
            pass
    return list(csv.reader(texto.splitlines()))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fuente", required=True, help="archivo de INEGI (.xlsx o .csv)")
    args = ap.parse_args()

    master = json.load(open(MASTER_PATH, encoding="utf-8"))
    # una clave puede tener dos carreras en el sitio: la licenciatura y la TSU
    por_cve = {}
    for c in master:
        por_cve.setdefault(int(c["CVE_CARRERA"]), []).append(c["CARRERA"])

    filas = leer_filas(args.fuente)
    encabezado, filas = filas[0], filas[1:]
    print(f"Fuente: {len(filas)} campos de carrera, {len(encabezado)} columnas")

    alias_por_carrera = {}
    sin_match = []
    total_alias = 0
    for fila in filas:
        if not fila or not str(fila[0]).strip():
            continue
        try:
            clave = int(str(fila[0]).strip())
        except ValueError:
            continue
        oficial_inegi = str(fila[1]).strip()
        alias = []
        for celda in fila[2:]:
            nombre = str(celda).strip()
            if nombre and nombre.lower() != oficial_inegi.lower() and nombre not in alias:
                alias.append(nombre)
        if clave not in por_cve:
            sin_match.append(f"{clave} ({oficial_inegi[:50]})")
            continue
        for carrera_sitio in por_cve[clave]:
            existentes = alias_por_carrera.setdefault(carrera_sitio, [])
            for a in alias:
                if a not in existentes:
                    existentes.append(a)
                    total_alias += 1

    print(f"Carreras del sitio con alias: {len(alias_por_carrera)} de {len(master)}")
    print(f"Alias totales: {total_alias}")
    print(f"Claves de INEGI sin carrera en el sitio: {len(sin_match)}")
    for s in sin_match[:8]:
        print(f"  - {s}")

    sin_alias = [c["CARRERA"] for c in master if c["CARRERA"] not in alias_por_carrera]
    if sin_alias:
        print(f"Carreras del sitio SIN alias de INEGI: {len(sin_alias)}")
        for s in sin_alias[:8]:
            print(f"  ! {s}")

    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write("// GENERADO por scripts/generar_alias.py a partir del archivo oficial de\n")
        f.write("// INEGI (Nombres auxiliares de carreras CMPE 2016). NO editar a mano:\n")
        f.write("// los alias manuales van en carrer-alias.data.ts y se combinan al exportar.\n\n")
        f.write("export const CarrerAliasInegi: Record<string, string[]> = ")
        f.write(json.dumps(alias_por_carrera, ensure_ascii=False, indent=2))
        f.write("\n")
    print(f"\nEscrito: {SALIDA}")


if __name__ == "__main__":
    if not os.path.exists(MASTER_PATH):
        sys.exit("Ejecuta desde la raíz del proyecto")
    main()
