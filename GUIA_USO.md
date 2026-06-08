# 🇻🇪 Registro Contable Diario - Guía de Uso

## ¿Qué es?

Una herramienta web profesional, desarrollada con React, que automatiza el cálculo de retenciones ISLR e IVA según la **tabla SENIAT 2025-2026** para registros contables diarios en Venezuela.

**UT vigente:** Bs. 43,00

## 🎯 Características Principales

### 1. **Registro Automático de Movimientos**
- Ingresa datos de conceptos contables
- Calcula automáticamente retenciones ISLR e IVA
- Visualiza el neto a recibir en tiempo real

### 2. **Cálculos Precisos SENIAT 2025-2026**
- Aplica correctamente tasas y sustraendos por tipo de receptor
- Diferencia entre Personas Naturales Residentes (PN) y Personas Jurídicas (PJ)
- Maneja casos especiales (No Residentes, No Domiciliadas)
- Calcula retención de IVA del 75% para contribuyentes especiales

### 3. **Interfaz Intuitiva**
- Formulario paso a paso
- Tabla de movimientos con detalles completos
- Resumen diario automático
- Badges para identificar tipo de receptor

### 4. **Exportación de Datos**
- Exporta a JSON para auditoría
- Exporta a CSV para Excel/Sheets
- Incluye fecha, UT y resumen de totales

### 5. **Sin servidor**
- Funciona completamente en el navegador
- Los datos se guardan en memoria
- Privacidad total (nada se envía a servidores)

---

## 📖 Cómo Usar

### Paso 1: Abrir la Aplicación
```
Abre en tu navegador: http://localhost:8000
o simplemente: file:///ruta/a/index.html
```

### Paso 2: Registrar un Movimiento

1. **Selecciona el Tipo de Concepto**
   - Honorarios Profesionales
   - Servicios / Ejecución de obras
   - Gastos de transporte (fletes)
   - Arrendamiento (inmuebles o muebles)
   - Comisiones
   - Intereses
   - Regalías
   - Otros

2. **Ingresa el Monto**
   - En bolívares (Bs.)
   - Ejemplo: 1000.00

3. **Nombre del Receptor**
   - Nombre de la persona o empresa
   - Ejemplo: "Juan Pérez" o "Empresa ABC C.A."

4. **Tipo de Receptor**
   - Persona Natural Residente
   - PJ Domiciliada
   - Persona Natural No Residente
   - PJ No Domiciliada

5. **¿Es Contribuyente Especial?**
   - Marca el checkbox si retiene IVA (75%)
   - Normalmente aplica para comercios

### Paso 3: Calcular Retenciones
1. Haz clic en **"Calcular Retenciones"**
2. Verás el desglose automático:
   - Monto original
   - ISLR aplicado
   - IVA (si aplica)
   - Total de retenciones
   - **Neto a recibir**

### Paso 4: Agregar a la Tabla
1. Haz clic en **"Agregar Movimiento"**
2. El movimiento aparece en la tabla
3. El resumen diario se actualiza automáticamente

### Paso 5: Exportar (Opcional)
- **Exportar JSON:** Para auditoría, importar en sistemas
- **Exportar CSV:** Para abrir en Excel o Google Sheets

---

## 💰 Tabla de Cálculos

### ISLR por Concepto

#### Honorarios Profesionales
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 3% | Bs. 107,50 |
| PJ Domiciliada | 5% | - |

**Ejemplo:** PN Residente con Bs. 1.000
- Base: 1.000 - 107,50 = 892,50
- ISLR: 892,50 × 0,03 = **Bs. 26,78**

#### Servicios / Ejecución de Obras
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 1% | Bs. 35,83 |
| PJ Domiciliada | 2% | - |

#### Gastos de Transporte (Fletes)
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 1% | Bs. 35,83 |
| PJ Domiciliada | 3% | - |

#### Arrendamiento (Inmuebles o Muebles)
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 3% | Bs. 107,50 |
| PJ Domiciliada | 5% | - |

#### Comisiones
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 3% | Bs. 107,50 |
| PJ Domiciliada | 5% | - |

#### Intereses
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 3% | Bs. 107,50 |
| PJ Domiciliada | 5% | - |

#### Regalías
| Tipo Receptor | Tasa |
|---|---|
| PN No Residente | 34% |
| PJ No Domiciliada | Acumulativo |

#### Otros
| Tipo Receptor | Tasa | Sustraendo |
|---|---|---|
| PN Residente | 2% | - |
| PJ Domiciliada | 3% | - |

### Retención de IVA
- **Contribuyente Especial:** 75% del monto
- **No contribuyente:** 0%

---

## 📊 Ejemplos de Cálculos

### Ejemplo 1: Honorarios - PN Residente
```
Concepto: Honorarios Profesionales
Monto: Bs. 1.000,00
Receptor: Juan Pérez (PN Residente)
Contribuyente Especial: No

ISLR = (1.000 - 107,50) × 0,03 = Bs. 26,78
IVA = 0 (no aplica)
Neto = 1.000 - 26,78 = Bs. 973,22
```

### Ejemplo 2: Servicios - PJ Domiciliada
```
Concepto: Servicios / Ejecución de Obras
Monto: Bs. 5.000,00
Receptor: Empresa XYZ C.A. (PJ Domiciliada)
Contribuyente Especial: No

ISLR = 5.000 × 0,02 = Bs. 100,00
IVA = 0 (no aplica)
Neto = 5.000 - 100 = Bs. 4.900,00
```

### Ejemplo 3: Arrendamiento - PN Residente Contribuyente Especial
```
Concepto: Arrendamiento de Bienes Inmuebles
Monto: Bs. 1.000,00
Receptor: Carlos López (PN Residente)
Contribuyente Especial: Sí

ISLR = (1.000 - 107,50) × 0,03 = Bs. 26,78
IVA = 1.000 × 0,75 = Bs. 750,00
Total Retenciones = 26,78 + 750 = Bs. 776,78
Neto = 1.000 - 776,78 = Bs. 223,22
```

### Ejemplo 4: Fletes - PJ No Domiciliada
```
Concepto: Gastos de Transporte (Fletes)
Monto: Bs. 2.000,00
Receptor: Transportes Internacionales (PJ No Domiciliada)
Contribuyente Especial: No

ISLR = 2.000 × 0,03 = Bs. 60,00
IVA = 0 (no aplica)
Neto = 2.000 - 60 = Bs. 1.940,00
```

---

## 🔍 Verificación de Cálculos

### ¿Cómo sé que los cálculos son correctos?

1. **Página de Pruebas:**
   - Abre `http://localhost:8000/test.html`
   - Ejecuta 9 casos de prueba automatizados
   - Verifica ISLR, IVA, Total y Neto

2. **Validación Manual:**
   - Compara con la tabla SENIAT oficial
   - Verifica que los sustraendos se apliquen solo a PN Residentes
   - Comprueba que IVA (75%) solo aplica a contribuyentes especiales

3. **Precisión:**
   - Cálculos con 2 decimales (estándar bancario)
   - Tolerancia máxima: ±Bs. 0,01

---

## ⚙️ Requisitos Técnicos

### Navegadores Soportados
- ✅ Google Chrome (últimas 3 versiones)
- ✅ Mozilla Firefox (últimas 3 versiones)
- ✅ Microsoft Edge (últimas 3 versiones)
- ✅ Safari (últimas 2 versiones)

### No Requiere
- ❌ Node.js
- ❌ Python
- ❌ Base de datos
- ❌ Conexión a internet

### Instalación
1. Descarga los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo! (sin instalación requerida)

---

## 📁 Archivos del Proyecto

```
registro-contable/
├── index.html          # Punto de entrada
├── app.js              # Lógica React (cálculos + UI)
├── styles.css          # Estilos profesionales
├── test.html           # Pruebas automáticas
├── README.md           # Documentación técnica
├── GUIA_USO.md         # Esta guía
├── package.json        # Metadatos del proyecto
└── server.log          # Log del servidor (generado)
```

---

## 🚀 Opciones de Instalación

### Opción 1: Abrir directamente
```bash
# Simplemente abre index.html en tu navegador
# No requiere instalación adicional
```

### Opción 2: Servidor Python (macOS/Linux)
```bash
cd registro-contable
python3 -m http.server 8000
# Abre: http://localhost:8000
```

### Opción 3: Servidor Python (Windows)
```bash
cd registro-contable
python -m http.server 8000
# Abre: http://localhost:8000
```

### Opción 4: Node.js HTTP Server
```bash
cd registro-contable
npx http-server -p 8000 -o
```

---

## 💡 Consejos y Trucos

### Validación de Datos
- Los montos deben ser números positivos
- El nombre del receptor es obligatorio
- Se valida antes de calcular

### Precisión en Cálculos
- Usa montos con máximo 2 decimales
- El sistema redondea automáticamente
- Los sustraendos se aplican correctamente

### Exportación
- JSON: Ideal para auditoría y registros oficiales
- CSV: Ideal para trabajar con Excel
- Ambos incluyen la UT y fecha del día

### Privacidad
- Todo se procesa localmente
- No hay envíos a servidores
- Puedes usar offline después de cargar

---

## ❓ Preguntas Frecuentes

### ¿Se pierden los datos al recargar?
**Sí.** Los datos se guardan solo en memoria. Si recarga, se pierden. Use exportar para guardar.

### ¿Puedo usar offline?
**Sí.** Una vez cargado, funciona sin conexión a internet.

### ¿Es seguro para datos sensibles?
**Sí.** Todo se procesa localmente, ningún dato sale de tu navegador.

### ¿Puedo modificar los cálculos?
**Sí.** El código está en `app.js`, puedes personalizarlo según tus necesidades.

### ¿Qué pasa con actualizaciones de UT?
Actualiza el archivo `app.js` o abre el archivo en un editor de texto y cambia los valores en la tabla SENIAT.

### ¿Funciona en móvil?
**Parcialmente.** La interfaz es responsive, pero la experiencia es mejor en desktop.

---

## 🐛 Solución de Problemas

### La aplicación no carga
- Verifica que `index.html` esté en la carpeta
- Intenta abrir en otro navegador
- Comprueba la consola del navegador (F12)

### Los cálculos no son correctos
- Abre `test.html` para verificar
- Revisa que hayas seleccionado el tipo de receptor correcto
- Verifica que el monto sea un número válido

### No puedo descargar archivos
- Verifica los permisos de descarga
- Intenta en otra carpeta
- Abre la consola (F12) para ver errores

### El servidor no inicia
- Verifica que el puerto 8000 esté libre
- Usa otro puerto: `python -m http.server 9000`
- En Windows, abre PowerShell como Administrador

---

## 📞 Soporte y Contacto

Para reportar problemas o sugerencias:
1. Revisa la página de pruebas (`test.html`)
2. Consulta la tabla SENIAT oficial
3. Verifica los ejemplos de cálculo

---

## 📜 Información Legal

- **UT vigente:** Bs. 43,00 (2025-2026)
- **Normativa:** Basada en tabla SENIAT
- **Responsabilidad:** Verifica los cálculos con la documentación oficial antes de usarlos en registros fiscales

---

**Herramienta desarrollada para facilitar el cumplimiento fiscal en Venezuela** 🇻🇪
