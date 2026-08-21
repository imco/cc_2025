# 📊 Documentación: Recolección de Datos en Calculadora ROI

## Resumen Ejecutivo

La calculadora ROI de Compara Carreras ahora captura automáticamente todos los datos ingresados por los usuarios y los envía a **Google Analytics 4** para análisis posterior. Esto permite entender el comportamiento de los usuarios, identificar carreras faltantes, y tomar decisiones basadas en datos.

---

## 🎯 ¿Qué Datos se Capturan?

### Evento Principal: `roi_calculation`

Cada vez que un usuario completa un cálculo en la calculadora ROI, se envía un evento a Google Analytics 4 con **12 parámetros personalizados**:

### 1️⃣ Información del Formulario (7 campos)

| Campo | Descripción | Valores Posibles | Ejemplo |
|-------|-------------|------------------|---------|
| `education_level` | Nivel educativo | "Licenciatura", "Carrera_técnica" | "Licenciatura" |
| `university_type` | Tipo de universidad | "Pública", "Privada" | "Pública" |
| `career_name` | Carrera seleccionada | Nombre de carrera o "Otro (carrera no listada)" | "Administración" |
| `custom_career_name` | Carrera personalizada | Texto libre o null | "Ingeniería en IA" |
| `is_custom_career` | ¿Seleccionó "Otro"? | true, false | false |
| `plan_unit` | División del plan | "Semestres", "Cuatrimestres", "Trimestres", "Años" | "Cuatrimestres" |
| `periods` | Número de períodos | 1-15 | 9 |

### 2️⃣ Costos Ingresados (2 campos)

| Campo | Descripción | Formato | Ejemplo |
|-------|-------------|---------|---------|
| `cost_per_period` | Costo por período | Número entero | 15000 |
| `total_cost` | Costo total | Número entero | 135000 |

### 3️⃣ Resultados Calculados (2 campos)

| Campo | Descripción | Formato | Ejemplo |
|-------|-------------|---------|---------|
| `months_to_recover` | Meses para recuperar inversión | Decimal (1 decimal) | 12.5 |
| `rsi_percentage` | RSI en porcentaje | Decimal (1 decimal) | 8.5 |

### 4️⃣ Metadata (1 campo)

| Campo | Descripción | Formato | Ejemplo |
|-------|-------------|---------|---------|
| `timestamp` | Fecha y hora del cálculo | ISO 8601 | "2025-11-24T17:30:00.000Z" |

---

## 📍 ¿Dónde se Almacenan los Datos?

### Plataforma: Google Analytics 4

Los datos se envían a tu propiedad de Google Analytics 4 configurada en el proyecto:
- **Measurement ID**: `G-J7CL260VSJ`
- **GTM Container**: `GTM-TJM2GX3X`

### Ubicación en GA4:

```
Google Analytics 4
└── Propiedad: Compara Carreras
    └── Eventos
        └── roi_calculation
            ├── education_level
            ├── university_type
            ├── career_name
            ├── custom_career_name
            ├── is_custom_career
            ├── plan_unit
            ├── periods
            ├── cost_per_period
            ├── total_cost
            ├── months_to_recover
            ├── rsi_percentage
            └── timestamp
```

---

## 👀 ¿Dónde Verás los Datos?

### 1. Real-Time Dashboard (Inmediato)

**Ruta:** `Reports → Real-time`

**Qué verás:**
- Eventos `roi_calculation` apareciendo en tiempo real
- Conteo de eventos activos
- Usuarios activos en la calculadora

**Cuándo usarlo:**
- Verificar que el tracking funciona después de publicar
- Monitorear actividad en vivo durante campañas
- Debug de problemas de tracking

**Limitación:** Solo muestra datos de los últimos 30 minutos

---

### 2. Events Report (Después de 24 horas)

**Ruta:** `Reports → Engagement → Events`

**Qué verás:**
- Lista de todos los eventos
- `roi_calculation` con conteo total
- Tendencia temporal de eventos

**Cuándo usarlo:**
- Ver volumen total de cálculos
- Comparar con otros eventos del sitio
- Identificar picos de uso

**Limitación:** Sin configurar Custom Dimensions, solo verás el conteo, no los parámetros

---

### 3. Custom Reports (Requiere configurar Custom Dimensions)

**Ruta:** `Explore → Create exploration`

**Qué verás (después de configurar):**
- Carreras más consultadas
- Costos promedio por tipo de universidad
- Distribución de períodos de estudio
- Top de carreras personalizadas
- RSI promedio por carrera

**Cuándo usarlo:**
- Análisis profundo de datos
- Identificar carreras faltantes
- Tomar decisiones de producto

**Requisito:** Configurar Custom Dimensions (ver sección siguiente)

---

### 4. BigQuery (Opcional - Análisis Avanzado)

**Ruta:** `Admin → BigQuery Links`

**Qué verás:**
- Todos los eventos exportados a BigQuery
- Posibilidad de hacer queries SQL complejas
- Integración con herramientas de BI

**Cuándo usarlo:**
- Análisis muy complejos
- Machine learning sobre los datos
- Integración con otros sistemas

**Costo:** Gratis hasta 10GB/mes, luego pago por uso

---

## ⚙️ Configuración Requerida (Una sola vez)

### Paso 1: Crear Custom Dimensions

Para poder ver los parámetros en reportes, debes crear Custom Dimensions:

**Ruta:** `Admin → Data display → Custom definitions → Create custom dimension`

**Dimensiones a crear (6 en total):**

1. **Education Level**
   - Event parameter: `education_level`
   - Scope: Event

2. **University Type**
   - Event parameter: `university_type`
   - Scope: Event

3. **Career Name**
   - Event parameter: `career_name`
   - Scope: Event

4. **Custom Career Name**
   - Event parameter: `custom_career_name`
   - Scope: Event

5. **Is Custom Career**
   - Event parameter: `is_custom_career`
   - Scope: Event

6. **Plan Unit**
   - Event parameter: `plan_unit`
   - Scope: Event

### Paso 2: Crear Custom Metrics

**Ruta:** `Admin → Data display → Custom definitions → Create custom metric`

**Métricas a crear (5 en total):**

1. **Periods**
   - Event parameter: `periods`
   - Unit: Standard

2. **Cost Per Period**
   - Event parameter: `cost_per_period`
   - Unit: Currency

3. **Total Cost**
   - Event parameter: `total_cost`
   - Unit: Currency

4. **Months to Recover**
   - Event parameter: `months_to_recover`
   - Unit: Standard

5. **RSI Percentage**
   - Event parameter: `rsi_percentage`
   - Unit: Standard

**⏱️ Tiempo de activación:** 24-48 horas después de crear las dimensiones/métricas

---

## 📊 Ejemplos de Reportes que Podrás Crear

### Reporte 1: Top 10 Carreras Más Consultadas

**Configuración:**
- Dimensión: Career Name
- Métrica: Event count
- Filtro: is_custom_career = false
- Ordenar: Event count DESC
- Límite: 10

**Pregunta que responde:** ¿Qué carreras consultan más los usuarios?

---

### Reporte 2: Carreras Faltantes (Más Solicitadas)

**Configuración:**
- Dimensión: Custom Career Name
- Métrica: Event count
- Filtro: is_custom_career = true AND custom_career_name != "No especificado"
- Ordenar: Event count DESC
- Límite: 20

**Pregunta que responde:** ¿Qué carreras debemos agregar a nuestra lista?

**Acción:** Agregar las carreras con >10 solicitudes

---

### Reporte 3: Costo Promedio por Tipo de Universidad

**Configuración:**
- Dimensión: University Type
- Métrica: Total Cost (average)
- Filtro: Event name = roi_calculation

**Pregunta que responde:** ¿Cuánto cuesta estudiar en pública vs privada?

---

### Reporte 4: RSI Promedio por Carrera

**Configuración:**
- Dimensión: Career Name
- Métrica: RSI Percentage (average)
- Filtro: is_custom_career = false AND rsi_percentage is not null
- Ordenar: RSI Percentage DESC

**Pregunta que responde:** ¿Qué carreras tienen mejor retorno de inversión?

---

### Reporte 5: Distribución de Períodos de Estudio

**Configuración:**
- Dimensión: Periods
- Métrica: Event count
- Visualización: Bar chart

**Pregunta que responde:** ¿Cuántos períodos suelen durar las carreras consultadas?

---

## 🔍 Cómo Acceder a los Datos

### Opción 1: Interfaz Web de Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Selecciona la propiedad "Compara Carreras"
3. Navega a la sección correspondiente (Real-time, Events, Explore)

### Opción 2: Google Analytics API

```javascript
// Ejemplo de consulta programática
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient();

const [response] = await analyticsDataClient.runReport({
  property: `properties/YOUR_PROPERTY_ID`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'customEvent:career_name' }],
  metrics: [{ name: 'eventCount' }],
  dimensionFilter: {
    filter: {
      fieldName: 'eventName',
      stringFilter: { value: 'roi_calculation' }
    }
  }
});
```

### Opción 3: Exportar a Google Sheets

1. En GA4: `Explore → Create exploration`
2. Configura tu reporte
3. Click en `Share` → `Download file` → `Google Sheets`
4. Se creará una hoja de cálculo con los datos

### Opción 4: BigQuery SQL

```sql
SELECT
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'career_name') AS career,
  COUNT(*) AS total_calculations,
  AVG(CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'total_cost') AS FLOAT64)) AS avg_cost
FROM `project.dataset.events_*`
WHERE event_name = 'roi_calculation'
  AND _TABLE_SUFFIX BETWEEN '20250101' AND '20251231'
GROUP BY career
ORDER BY total_calculations DESC
LIMIT 20
```

---

## 🔒 Privacidad y Cumplimiento

### Datos que SÍ se capturan:
- ✅ Selecciones del formulario (nivel, tipo, carrera, etc.)
- ✅ Valores numéricos ingresados (períodos, costos)
- ✅ Resultados calculados (ROI, meses)
- ✅ Timestamp del evento

### Datos que NO se capturan:
- ❌ Información personal identificable (nombre, email, teléfono)
- ❌ Dirección IP (anonimizada por GA4)
- ❌ Datos sensibles

### Datos automáticos de GA4:
- 🌍 Ubicación geográfica (país, ciudad)
- 📱 Dispositivo y navegador
- 🔗 Fuente de tráfico
- ⏱️ Tiempo en página

### Cumplimiento:
- ✅ Compatible con GDPR (si se configura correctamente)
- ✅ Sin datos personales identificables
- ⚠️ Considera agregar aviso de cookies si es requerido en tu jurisdicción

---

## 📈 Flujo de Datos Completo

```
Usuario completa formulario
        ↓
Click en "Calcular"
        ↓
handleCalculate() ejecuta cálculos
        ↓
trackRoiCalculation() envía datos
        ↓
window.gtag() (Google Tag Manager)
        ↓
Google Analytics 4 Servers
        ↓
┌───────────────────────────────┐
│  Almacenamiento en GA4        │
│  - Real-time (30 min)         │
│  - Events (permanente)        │
│  - BigQuery (opcional)        │
└───────────────────────────────┘
        ↓
Visualización en Reportes
```

---

## 🛠️ Troubleshooting

### Problema: No veo eventos en Real-Time

**Soluciones:**
1. Verifica que el código esté publicado en producción
2. Abre DevTools (F12) → Console → busca errores
3. Verifica que `window.gtag` exista en la consola
4. Usa [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### Problema: Veo eventos pero no los parámetros

**Causa:** No has configurado Custom Dimensions

**Solución:**
1. Crea las Custom Dimensions (ver sección "Configuración Requerida")
2. Espera 24-48 horas
3. Los parámetros aparecerán en reportes

### Problema: Custom Dimensions no aparecen

**Soluciones:**
1. Verifica que hayas esperado 24-48 horas
2. Verifica que el `Event parameter` esté escrito exactamente igual
3. Verifica que `Scope` sea `Event` (no `User`)
4. Recrea la dimensión si es necesario

---

## 📞 Recursos Adicionales

### Documentación Oficial:
- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Custom Dimensions Guide](https://support.google.com/analytics/answer/10075209)
- [BigQuery Export](https://support.google.com/analytics/answer/9358801)

### Herramientas Útiles:
- [GA4 Query Explorer](https://ga-dev-tools.google/ga4/query-explorer/)
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [Tag Assistant](https://tagassistant.google.com/)

### Soporte:
- [GA4 Community Forum](https://support.google.com/analytics/community)
- [Google Analytics Help Center](https://support.google.com/analytics)

---

## 📝 Checklist de Implementación

- [x] Código de tracking implementado
- [x] Build exitoso sin errores
- [ ] Código publicado en producción
- [ ] Verificado en Real-Time que eventos se capturan
- [ ] Custom Dimensions creadas en GA4
- [ ] Custom Metrics creadas en GA4
- [ ] Esperado 24-48 horas
- [ ] Primer reporte de prueba creado
- [ ] Dashboard ejecutivo configurado
- [ ] Equipo capacitado en uso de reportes

---

## 🎯 Próximos Pasos Recomendados

1. **Publicar código** → Los datos empezarán a capturarse inmediatamente
2. **Configurar Custom Dimensions** → 15 minutos de trabajo
3. **Esperar 24-48 horas** → Las dimensiones se activan
4. **Crear primer reporte** → Verificar que todo funciona
5. **Configurar alertas** → Notificaciones de picos de uso
6. **Exportar datos semanalmente** → Análisis de carreras faltantes
7. **Actualizar lista de carreras** → Agregar las más solicitadas

---

## 📌 Otros Eventos del Sitio

Además de `roi_calculation`, el sitio envía estos eventos a GA4:

| Evento | Cuándo se dispara | Parámetros |
|---|---|---|
| `search` | El usuario elige una carrera en cualquier autocompletado (inicio o comparador) | `search_term` (lo que tecleó), `carrera` (la elegida), `via_alias` (nombre común usado, o null) |
| `compare_careers` | Se muestra una comparación de dos carreras | `carrera_1`, `carrera_2` |
| `top_toggle` | El usuario usa el switch "Los 10 más / Los 10 menos" en un top | `top` (slug del top destino), `lado` ("mas" o "menos") |
| `file_download` | Descarga del CSV de un top | `file_name`, `file_extension`, `top` (nombre del top) |
| `print_pdf` | Clic en "Descargar PDF" (carrera o comparador) | `page_path` (página desde la que se descargó) |
| `share` | Clic en un botón de compartir (WhatsApp, Facebook, X, copiar liga o compartir nativo) | `method`, `content_type`, `item_id` (liga compartida) |

Con `search` se puede detectar qué buscan y no encuentran (términos sin selección
no se registran, pero `via_alias` revela qué nombres comunes conviene reforzar
en el diccionario). `compare_careers` alimenta el análisis de pares más
consultados y `top_toggle` mide el interés por los lados negativos de los
rankings.

---

**Última actualización:** 2026-08-21
**Versión:** 1.1
**Autor:** Equipo IMCO - Compara Carreras
