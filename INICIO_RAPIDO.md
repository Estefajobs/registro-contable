# ⚡ Inicio Rápido - 2 Minutos

## 🚀 Opción 1: Abrir Directamente (La Más Fácil)

1. Haz **doble clic** en `index.html`
2. Se abrirá en tu navegador predeterminado
3. ¡Ya está listo para usar!

---

## 🌐 Opción 2: Servidor Local

### En Windows (PowerShell)
```powershell
cd "ruta\a\registro-contable"
python -m http.server 8000
```
Luego abre: **http://localhost:8000**

### En macOS/Linux (Terminal)
```bash
cd ruta/a/registro-contable
python3 -m http.server 8000
```
Luego abre: **http://localhost:8000**

---

## 📝 Primer Registro en 30 Segundos

1. **Abre la app** (index.html)
2. **Rellena el formulario:**
   - Concepto: "Honorarios Profesionales"
   - Monto: `1000`
   - Receptor: "Juan Pérez"
   - Tipo: "Persona Natural Residente"
   - Contribuyente especial: ☐ (sin marcar)

3. **Haz clic:** "Calcular Retenciones"
   - Verás el desglose:
     ```
     Monto: Bs. 1.000,00
     ISLR: -Bs. 26,78
     Total Retenciones: -Bs. 26,78
     NETO: Bs. 973,22
     ```

4. **Haz clic:** "Agregar Movimiento"
5. ¡Listo! Aparece en la tabla y resumen

---

## 🧪 Verificar que Todo Funciona

Abre: **http://localhost:8000/test.html**

Deberías ver ✓ en todos los tests

---

## 📊 Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| **index.html** | 👈 Abre esto para usar la app |
| **test.html** | Pruebas automáticas (9 casos) |
| **GUIA_USO.md** | Documentación completa |
| **app.js** | Lógica de cálculos |
| **styles.css** | Diseño visual |

---

## 💾 Guardar Resultados

Antes de cerrar:
- 📥 **Botón "Exportar JSON"** → Archivo de auditoría
- 📥 **Botón "Exportar CSV"** → Para Excel

---

## ⚠️ Importante

- Los datos se guardan **en memoria del navegador**
- Si recargas la página → se pierden
- **Exporta antes de cerrar** si quieres guardar

---

## ❓ ¿No funciona?

1. ¿Usas un navegador moderno?
   - Chrome ✓, Firefox ✓, Edge ✓, Safari ✓

2. ¿Los montos son números válidos?
   - Ej: `1000.50` ✓ no `mil` ✗

3. ¿Seleccionaste receptor?
   - Es obligatorio

4. Abre la **Consola (F12)** y busca errores

---

## 🎯 Próximos Pasos

→ Lee **GUIA_USO.md** para:
- Tabla completa de cálculos
- 4 ejemplos paso a paso
- Preguntas frecuentes
- Solución de problemas

---

**¡Listo para usar!** 🇪🇸 Registro contable fácil y sin complicaciones.
