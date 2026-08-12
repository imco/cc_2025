import { Chart, ChartEvent, ActiveElement, LegendItem } from "chart.js"

// Sincroniza el hover entre la leyenda y las rebanadas de gráficas pie/dona:
// - hover en la leyenda activa (resalta) su rebanada
// - hover en una rebanada atenúa las demás etiquetas de la leyenda

type LegendWithChart = { chart: Chart }

export function legendSliceSync(tipo: "pie" | "doughnut") {
  return {
    onHover: (_e: ChartEvent, item: LegendItem, legend: LegendWithChart) => {
      if (item.index === undefined) return
      legend.chart.setActiveElements([{ datasetIndex: 0, index: item.index }])
      legend.chart.update()
    },
    onLeave: (_e: ChartEvent, _item: LegendItem, legend: LegendWithChart) => {
      legend.chart.setActiveElements([])
      legend.chart.update()
    },
    labels: {
      color: "#FFFFFF",
      generateLabels: (chart: Chart): LegendItem[] => {
        const base =
          Chart.overrides[tipo]?.plugins?.legend?.labels?.generateLabels?.(chart) ??
          Chart.defaults.plugins.legend.labels.generateLabels(chart)
        const activo = chart.getActiveElements()[0]?.index ?? -1
        return base.map(etiqueta => ({
          ...etiqueta,
          fontColor:
            activo === -1 || etiqueta.index === activo
              ? "#FFFFFF"
              : "rgba(255, 255, 255, 0.5)",
        }))
      },
    },
  }
}

// onHover del chart: fuerza re-render de la leyenda para que generateLabels
// refleje la rebanada activa cuando el mouse está sobre la gráfica
export function sliceHoverRefresh(_e: ChartEvent, _els: ActiveElement[], chart: Chart) {
  chart.update("none")
}

// props de hover para las rebanadas (pop + borde blanco)
export const sliceHoverStyle = {
  hoverOffset: 10,
  hoverBorderColor: "#FFFFFF",
  hoverBorderWidth: 2,
}

// --- gráfica de barras con leyenda HTML propia (.salary-legend) ---

// hover sobre una barra: resalta el item correspondiente de la leyenda HTML
export function barLegendHover(_e: ChartEvent, els: ActiveElement[]) {
  const items = document.querySelectorAll(".salary-legend .legend-item")
  items.forEach((el, i) =>
    el.classList.toggle("sector-hl", els.length > 0 && els[0].index === i)
  )
}

// hover sobre un item de la leyenda HTML: activa la barra (con su tooltip)
export function activarBarra(chart: Chart | null, index: number, on: boolean) {
  if (!chart) return
  // chart.update() re-procesa el último mousemove sobre el canvas (replay) y
  // pisaría esta activación si el cursor cruzó la gráfica camino a la leyenda
  ;(chart as unknown as { _lastEvent: unknown })._lastEvent = null
  // limpia resaltados de leyenda que hayan quedado del paso del cursor por el canvas
  document
    .querySelectorAll(".salary-legend .legend-item.sector-hl")
    .forEach(el => el.classList.remove("sector-hl"))
  const activos = on ? [{ datasetIndex: 0, index }] : []
  chart.setActiveElements(activos)
  chart.tooltip?.setActiveElements(activos, { x: 0, y: 0 })
  chart.update()
}
