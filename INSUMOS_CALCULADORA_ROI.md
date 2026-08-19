# Insumos para actualizar la Calculadora de Inversión (RSI)

**Edición:** 2026 · **Solicita:** TI Compara Carreras · **Para:** Equipo de datos IMCO

La calculadora de retorno sobre la inversión (`comparacarreras.imco.org.mx/roi`) estima cuánto tarda en recuperarse el costo de estudiar una carrera y su rendimiento anual equivalente. Este documento describe qué datos consume, de dónde vienen y **cuáles necesitamos actualizados para la edición 2026**.

---

## Cómo calcula

- **Costo total** = periodos × costo por periodo *(lo ingresa el usuario; no viene de ninguna base)*
- **Meses de recuperación** = costo total ÷ ingreso mensual promedio de la carrera
- **RSI anual** = ((diferencia de ingreso de vida vs. egresado de preparatoria ÷ costo total)^(1/años laborales)) − 1
  - Vida laboral considerada: de los **18** a los **65** años

## Insumos y su estado

| # | Insumo | Valor edición 2025 | Fuente | Estado |
|---|---|---|---|---|
| 1 | Ingreso mensual promedio por carrera (`INGRESO`) | — | ENOE (INEGI), ajustado por subreporte ENOE-ENIGH | ✅ Actualizado con la base 2026 entregada en agosto |
| 2 | **Salario mensual promedio de egresados de preparatoria** (contrafactual del cálculo) | $12,052 | ENOE: ocupados con educación media superior, mismo ajuste por subreporte que las carreras | 🔴 **Pendiente — insumo principal** |
| 3 | Rendimiento anual de referencia: **Cetes** | 7.3% | Banxico, tasa vigente | 🔴 Pendiente, con fecha de corte |
| 4 | Rendimiento anual de referencia: **Oro** | 12.4% (promedio última década) | Serie histórica | 🔴 Pendiente, con fecha de corte |
| 5 | Rendimiento anual de referencia: **S&P 500** | 14% (promedio última década) | Serie histórica | 🔴 Pendiente, con fecha de corte |
| 6 | Edades de vida laboral (inicio 18, retiro 65) | 18 / 65 | Metodología IMCO | 🟢 Solo confirmar que siguen vigentes |

Los valores 3–5 se muestran al usuario como comparativo ("¿Contra qué compararlo?") con la leyenda *"Referencia a noviembre de 2025"*, que también debe actualizarse.

## Lo que solicitamos

1. **Salario mensual promedio de la población ocupada con educación media superior** (egresados de preparatoria), calculado con los mismos trimestres de la ENOE y el mismo ajuste por subreporte de ingresos que los salarios por carrera de la edición 2026.
2. **Rendimientos anuales de referencia** con su fecha de corte: tasa de Cetes vigente, y rendimiento anual promedio de la última década del oro y del S&P 500.
3. **Confirmación metodológica** de las edades de vida laboral (18 a 65 años).

## Formato de entrega sugerido

Basta con las cifras y su fecha de referencia; TI las integrará en el archivo de parámetros de la edición (`src/parametros_generales.json`), por ejemplo:

```json
{
  "salario_prepa_mensual": { "valor": 12052, "referencia": "ENOE 2T2025-1T2026" },
  "rendimiento_cetes":     { "valor": 7.3,   "referencia": "noviembre 2026" },
  "rendimiento_oro":       { "valor": 12.4,  "referencia": "promedio 10 años a noviembre 2026" },
  "rendimiento_sp500":     { "valor": 14.0,  "referencia": "promedio 10 años a noviembre 2026" }
}
```
