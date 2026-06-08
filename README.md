# 📊 Registro Contable Diario - Venezuela

Herramienta web profesional para registrar movimientos contables y calcular retenciones ISLR e IVA según la tabla SENIAT 2025-2026 (UT: Bs. 43,00).

## 🚀 Características

- ✅ **Cálculos automáticos de ISLR e IVA** según tabla SENIAT 2025-2026
- ✅ **Registro flexible** de movimientos contables con detalles de receptor
- ✅ **Sustraendos automáticos** para Personas Naturales Residentes
- ✅ **Retención de IVA** (75%) para contribuyentes especiales
- ✅ **Tabla resumen diario** con totales e indicadores
- ✅ **Exportación a JSON y CSV** para auditoría
- ✅ **Interfaz responsive** y minimalista
- ✅ **Cálculos en tiempo real** sin necesidad de servidor

## 📋 Requisitos

### Conceptos SENIAT soportados:
1. Honorarios Profesionales
2. Servicios / Ejecución de obras
3. Gastos de transporte (fletes)
4. Arrendamiento de bienes inmuebles
5. Arrendamiento de bienes muebles
6. Comisiones
7. Intereses
8. Regalías
9. Otros

### Tipos de receptor:
- Persona Natural Residente (PN Res)
- PJ Domiciliada
- Persona Natural No Residente (PN NRes)
- PJ No Domiciliada

## 🔧 Instalación

### Opción 1: Usar directamente en el navegador

1. Abre `index.html` en tu navegador
2. No requiere instalación ni servidor
3. Los datos se guardan en memoria (se pierden al recargar)

### Opción 2: Servir con Python

```bash
cd registro-contable
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

### Opción 3: Servir con Node.js

```bash
npx http-server registro-contable -p 8000
```

## 💰 Tabla de Cálculos SENIAT

### ISLR (Impuesto sobre la Renta)

| Concepto | PN Residente | PJ Domiciliada |
|----------|-------------|----------------|
| Honorarios | 3% (Sub: Bs. 107,50) | 5% |
| Servicios | 1% (Sub: Bs. 35,83) | 2% |
| Fletes | 1% (Sub: Bs. 35,83) | 3% |
| Arrendamiento | 3% (Sub: Bs. 107,50) | 5% |
| Comisiones | 3% (Sub: Bs. 107,50) | 5% |
| Intereses | 3% (Sub: Bs. 107,50) | 5% |
| Regalías | 34% (PN NRes) | Especial (PJ NDom) |
| Otros | 2% | 3% |

**Nota:** Los sustraendos se aplican solo a Personas Naturales Residentes.

### IVA

- **Contribuyente Especial:** 75% de retención
- **No contribuyente especial:** 0% (no retiene)

## 📊 Cálculo de Retenciones

El sistema calcula automáticamente:

1. **ISLR Base** = Monto × Tasa (aplicando sustraendo si aplica)
2. **IVA** = Monto × 75% (solo si es contribuyente especial)
3. **Total Retenciones** = ISLR + IVA
4. **Neto** = Monto - Total Retenciones

Ejemplo:
```
Monto: Bs. 1.000,00
Concepto: Honorarios Profesionales
Receptor: Persona Natural Residente

ISLR = (1.000 - 107,50) × 0.03 = Bs. 26,78
IVA = 0 (no es contribuyente especial)
Neto = 1.000 - 26,78 = Bs. 973,22
```

## 🎨 Interfaz

### Panel de Entrada
- Formulario intuitivo con validación
- Cálculo visual paso a paso
- Preview de retenciones antes de confirmar

### Tabla de Movimientos
- Vista clara de todos los registros
- Badges para identificar tipo de receptor
- Botones de acción inline

### Resumen Diario
- Total de ingresos
- Total ISLR retenido
- Total IVA retenido
- **Neto total** (highlight)
- Botones de exportación

## 📥 Exportación

### JSON
Exporta todos los movimientos en formato JSON estructurado para auditoría o integración con otros sistemas.

### CSV
Exporta a formato CSV compatible con Excel, Google Sheets, etc.

Archivos generados con nombre: `registro-contable-DD-MM-YYYY.json|csv`

## ⚙️ Detalles Técnicos

- **Tecnología:** React 18 (vía CDN)
- **Estilo:** CSS3 con diseño responsive
- **Almacenamiento:** localStorage opcional (no implementado actualmente)
- **Navegadores:** Chrome, Firefox, Safari, Edge (últimas versiones)

## 📝 Notas Importantes

1. **UT actual:** Bs. 43,00 (2025-2026)
2. **Sin servidor:** Los datos se guardan en memoria del navegador
3. **Validaciones:** Se validan montos y campos requeridos
4. **Precisión:** Los cálculos usan hasta 2 decimales (estándar bancario)

## 🔐 Privacidad

- No se envían datos a servidores externos
- Todo funciona localmente en tu navegador
- La exportación crea archivos locales

## 📞 Soporte

Para reportar errores o sugerencias, verifica:
- Que uses un navegador moderno
- Que ingrese datos válidos (montos positivos)
- Que selecciones un tipo de receptor apropiado

## 📄 Licencia

Herramienta desarrollada para cumplimiento fiscal venezolano.
Úsala libremente conforme a la normativa SENIAT.

---

**Creada para facilitar el registro contable en Venezuela** 🇻 V
