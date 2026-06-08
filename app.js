const { useState, useCallback, useMemo } = React;

// Tabla de SENIAT 2025-2026 con UT = Bs. 43,00
const SENIAT_TABLE = {
  'Honorarios Profesionales': {
    PN: { rate: 0.03, sustraendo: 107.50 },
    PJ: { rate: 0.05, sustraendo: 0 }
  },
  'Servicios / Ejecución de obras': {
    PN: { rate: 0.01, sustraendo: 35.83 },
    PJ: { rate: 0.02, sustraendo: 0 }
  },
  'Gastos de transporte (fletes)': {
    PN: { rate: 0.01, sustraendo: 35.83 },
    PJ: { rate: 0.03, sustraendo: 0 }
  },
  'Arrendamiento de bienes inmuebles': {
    PN: { rate: 0.03, sustraendo: 107.50 },
    PJ: { rate: 0.05, sustraendo: 0 }
  },
  'Arrendamiento de bienes muebles': {
    PN: { rate: 0.03, sustraendo: 107.50 },
    PJ: { rate: 0.05, sustraendo: 0 }
  },
  'Comisiones': {
    PN: { rate: 0.03, sustraendo: 107.50 },
    PJ: { rate: 0.05, sustraendo: 0 }
  },
  'Intereses': {
    PN: { rate: 0.03, sustraendo: 107.50 },
    PJ: { rate: 0.05, sustraendo: 0 }
  },
  'Regalías': {
    PN_NR: { rate: 0.34, sustraendo: 0 }, // Personas Naturales No Residentes
    PJ_ND: { rate: 0, sustraendo: 0 } // PJ No Domiciliadas (acumulativo)
  },
  'Otros': {
    PN: { rate: 0.02, sustraendo: 0 },
    PJ: { rate: 0.03, sustraendo: 0 }
  }
};

const TIPO_RECEPTOR = [
  'Persona Natural Residente',
  'PJ Domiciliada',
  'Persona Natural No Residente',
  'PJ No Domiciliada'
];

const CONCEPTOS = Object.keys(SENIAT_TABLE);

function calcularRetenciones(monto, concepto, tipoReceptor, esContribuyenteEspecial) {
  let islr = 0;
  let iva = 0;

  const tabla = SENIAT_TABLE[concepto];

  if (!tabla) {
    return { islr: 0, iva: 0, totalRetenciones: 0, neto: monto };
  }

  // Determinar si es Persona Natural (PN) o Persona Jurídica (PJ)
  const esPN = tipoReceptor.startsWith('Persona Natural');
  const esResidente = tipoReceptor === 'Persona Natural Residente' || tipoReceptor === 'PJ Domiciliada';

  // Cálculo de ISLR
  if (concepto === 'Regalías') {
    if (tipoReceptor === 'Persona Natural No Residente') {
      islr = monto * tabla.PN_NR.rate;
    } else if (tipoReceptor === 'PJ No Domiciliada') {
      // Para PJ No Domiciliadas es acumulativo (se aplica sobre el monto)
      islr = monto * 0.5; // Placeholder, normalmente requiere cálculo especial
    }
  } else {
    const config = esPN ? tabla.PN : tabla.PJ;
    if (config) {
      let baseISLR = monto;
      // Aplicar sustraendo solo si es PN Residente
      if (esPN && esResidente && config.sustraendo > 0) {
        baseISLR = Math.max(0, monto - config.sustraendo);
      }
      islr = baseISLR * config.rate;
    }
  }

  // Cálculo de IVA (75% de retención si es contribuyente especial)
  if (esContribuyenteEspecial) {
    iva = monto * 0.75; // 75% de retención de IVA
  }

  const totalRetenciones = islr + iva;
  const neto = monto - totalRetenciones;

  return {
    islr: Math.round(islr * 100) / 100,
    iva: Math.round(iva * 100) / 100,
    totalRetenciones: Math.round(totalRetenciones * 100) / 100,
    neto: Math.round(neto * 100) / 100
  };
}

function FormularioMovimiento({ onAgregar }) {
  const [formData, setFormData] = useState({
    concepto: 'Honorarios Profesionales',
    monto: '',
    nombreReceptor: '',
    tipoReceptor: 'Persona Natural Residente',
    esContribuyenteEspecial: false
  });

  const [calculoMostrado, setCalculoMostrado] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCalcular = () => {
    if (!formData.monto || isNaN(formData.monto) || formData.monto <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    const calculo = calcularRetenciones(
      parseFloat(formData.monto),
      formData.concepto,
      formData.tipoReceptor,
      formData.esContribuyenteEspecial
    );

    setCalculoMostrado(calculo);
  };

  const handleAgregar = () => {
    if (!formData.nombreReceptor.trim()) {
      alert('Por favor ingresa el nombre del receptor');
      return;
    }

    if (!calculoMostrado) {
      alert('Por favor calcula las retenciones primero');
      return;
    }

    onAgregar({
      id: Date.now(),
      ...formData,
      monto: parseFloat(formData.monto),
      ...calculoMostrado,
      fecha: new Date().toLocaleString('es-VE')
    });

    setFormData({
      concepto: 'Honorarios Profesionales',
      monto: '',
      nombreReceptor: '',
      tipoReceptor: 'Persona Natural Residente',
      esContribuyenteEspecial: false
    });

    setCalculoMostrado(null);
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  };

  return React.createElement('div', { className: 'card' },
    React.createElement('h2', null, 'Nuevo Movimiento'),

    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Tipo de Concepto'),
      React.createElement('select', {
        name: 'concepto',
        value: formData.concepto,
        onChange: handleChange
      }, CONCEPTOS.map(c =>
        React.createElement('option', { key: c, value: c }, c)
      ))
    ),

    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Monto (Bs.)'),
      React.createElement('input', {
        type: 'number',
        name: 'monto',
        value: formData.monto,
        onChange: handleChange,
        placeholder: '0.00',
        step: '0.01'
      })
    ),

    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Nombre del Receptor (Cliente/Proveedor)'),
      React.createElement('input', {
        type: 'text',
        name: 'nombreReceptor',
        value: formData.nombreReceptor,
        onChange: handleChange,
        placeholder: 'Ej: Juan Pérez'
      })
    ),

    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Tipo de Receptor'),
      React.createElement('select', {
        name: 'tipoReceptor',
        value: formData.tipoReceptor,
        onChange: handleChange
      }, TIPO_RECEPTOR.map(t =>
        React.createElement('option', { key: t, value: t }, t)
      ))
    ),

    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'checkbox-group' },
        React.createElement('input', {
          type: 'checkbox',
          id: 'esContribuyente',
          name: 'esContribuyenteEspecial',
          checked: formData.esContribuyenteEspecial,
          onChange: handleChange
        }),
        React.createElement('label', {
          htmlFor: 'esContribuyente',
          className: 'checkbox-label'
        }, '¿Es contribuyente especial? (IVA 75% retención)')
      )
    ),

    calculoMostrado && React.createElement('div', { className: 'calculation-display' },
      React.createElement('div', { className: 'calculation-row' },
        React.createElement('span', { className: 'calculation-label' }, 'Monto'),
        React.createElement('span', { className: 'calculation-value' }, formatearMoneda(formData.monto))
      ),
      React.createElement('div', { className: 'calculation-row' },
        React.createElement('span', { className: 'calculation-label' }, 'ISLR Retenido'),
        React.createElement('span', { className: 'calculation-value value-negative' }, `-${formatearMoneda(calculoMostrado.islr)}`)
      ),
      calculoMostrado.iva > 0 && React.createElement('div', { className: 'calculation-row' },
        React.createElement('span', { className: 'calculation-label' }, 'IVA Retenido'),
        React.createElement('span', { className: 'calculation-value value-negative' }, `-${formatearMoneda(calculoMostrado.iva)}`)
      ),
      React.createElement('div', { className: 'calculation-row' },
        React.createElement('span', { className: 'calculation-label' }, 'Total Retenciones'),
        React.createElement('span', { className: 'calculation-value value-negative' }, `-${formatearMoneda(calculoMostrado.totalRetenciones)}`)
      ),
      React.createElement('div', { className: 'calculation-row' },
        React.createElement('span', null, 'NETO A RECIBIR'),
        React.createElement('span', null, formatearMoneda(calculoMostrado.neto))
      )
    ),

    React.createElement('div', { className: 'button-group' },
      React.createElement('button', {
        className: 'btn-secondary',
        onClick: handleCalcular
      }, 'Calcular Retenciones'),
      calculoMostrado && React.createElement('button', {
        className: 'btn-primary',
        onClick: handleAgregar
      }, 'Agregar Movimiento')
    )
  );
}

function TablaMovimientos({ movimientos, onEliminar, formatearMoneda }) {
  if (movimientos.length === 0) {
    return React.createElement('div', { className: 'empty-state' },
      React.createElement('p', null, 'No hay movimientos registrados aún.')
    );
  }

  return React.createElement('div', { className: 'table-responsive' },
    React.createElement('table', null,
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, 'Concepto'),
          React.createElement('th', null, 'Receptor'),
          React.createElement('th', null, 'Tipo'),
          React.createElement('th', null, 'Monto'),
          React.createElement('th', null, 'ISLR'),
          React.createElement('th', null, 'IVA'),
          React.createElement('th', null, 'Total Retenciones'),
          React.createElement('th', null, 'Neto'),
          React.createElement('th', null, 'Acción')
        )
      ),
      React.createElement('tbody', null,
        movimientos.map(mov =>
          React.createElement('tr', { key: mov.id },
            React.createElement('td', null, mov.concepto),
            React.createElement('td', null, mov.nombreReceptor),
            React.createElement('td', null,
              React.createElement('span', {
                className: mov.tipoReceptor.startsWith('Persona Natural') ? 'badge badge-pn' : 'badge badge-pj'
              }, mov.tipoReceptor === 'Persona Natural Residente' ? 'PN Res' :
                  mov.tipoReceptor === 'PJ Domiciliada' ? 'PJ Dom' :
                  mov.tipoReceptor === 'Persona Natural No Residente' ? 'PN NRes' : 'PJ NDom'
              ),
              mov.esContribuyenteEspecial && React.createElement('span', {
                className: 'badge badge-especial',
                style: { marginLeft: '5px' }
              }, 'Especial')
            ),
            React.createElement('td', null, formatearMoneda(mov.monto)),
            React.createElement('td', null, formatearMoneda(mov.islr)),
            React.createElement('td', null, formatearMoneda(mov.iva)),
            React.createElement('td', null, formatearMoneda(mov.totalRetenciones)),
            React.createElement('td', null, React.createElement('strong', null, formatearMoneda(mov.neto))),
            React.createElement('td', null,
              React.createElement('button', {
                className: 'btn-danger',
                onClick: () => onEliminar(mov.id)
              }, 'Eliminar')
            )
          )
        )
      )
    )
  );
}

function Resumen({ movimientos, formatearMoneda }) {
  const totales = useMemo(() => {
    return movimientos.reduce((acc, mov) => ({
      monto: acc.monto + mov.monto,
      islr: acc.islr + mov.islr,
      iva: acc.iva + mov.iva,
      totalRetenciones: acc.totalRetenciones + mov.totalRetenciones,
      neto: acc.neto + mov.neto
    }), {
      monto: 0,
      islr: 0,
      iva: 0,
      totalRetenciones: 0,
      neto: 0
    });
  }, [movimientos]);

  return React.createElement('div', null,
    React.createElement('div', { className: 'summary-grid' },
      React.createElement('div', { className: 'summary-item' },
        React.createElement('div', { className: 'summary-label' }, 'TOTAL MOVIMIENTOS'),
        React.createElement('div', { className: 'summary-value' }, formatearMoneda(totales.monto))
      ),
      React.createElement('div', { className: 'summary-item' },
        React.createElement('div', { className: 'summary-label' }, 'ISLR Retenido'),
        React.createElement('div', { className: 'summary-value value-negative' }, `-${formatearMoneda(totales.islr)}`)
      ),
      React.createElement('div', { className: 'summary-item' },
        React.createElement('div', { className: 'summary-label' }, 'IVA Retenido'),
        React.createElement('div', { className: 'summary-value value-negative' }, `-${formatearMoneda(totales.iva)}`)
      ),
      React.createElement('div', { className: 'summary-item' },
        React.createElement('div', { className: 'summary-label' }, 'Total Retenciones'),
        React.createElement('div', { className: 'summary-value value-negative' }, `-${formatearMoneda(totales.totalRetenciones)}`)
      ),
      React.createElement('div', { className: 'summary-item highlight' },
        React.createElement('div', { className: 'summary-label' }, 'TOTAL NETO'),
        React.createElement('div', { className: 'summary-value' }, formatearMoneda(totales.neto))
      )
    ),
    React.createElement('div', { className: 'ut-info' },
      '* UT: Bs. 43,00 (2025-2026) | Cálculos según tabla SENIAT'
    )
  );
}

function RegistroContableApp() {
  const [movimientos, setMovimientos] = useState([]);

  const formatearMoneda = useCallback((valor) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }, []);

  const handleAgregarMovimiento = useCallback((movimiento) => {
    setMovimientos(prev => [...prev, movimiento]);
  }, []);

  const handleEliminarMovimiento = useCallback((id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
      setMovimientos(prev => prev.filter(mov => mov.id !== id));
    }
  }, []);

  const handleExportar = useCallback(() => {
    const hoy = new Date().toLocaleDateString('es-VE');
    const datos = {
      fecha: hoy,
      ut: 43.00,
      movimientos: movimientos,
      totales: {
        totalIngresos: movimientos.reduce((sum, m) => sum + m.monto, 0),
        totalISLR: movimientos.reduce((sum, m) => sum + m.islr, 0),
        totalIVA: movimientos.reduce((sum, m) => sum + m.iva, 0),
        totalRetenciones: movimientos.reduce((sum, m) => sum + m.totalRetenciones, 0),
        totalNeto: movimientos.reduce((sum, m) => sum + m.neto, 0)
      }
    };

    const json = JSON.stringify(datos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registro-contable-${hoy.replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [movimientos]);

  const handleExportarCSV = useCallback(() => {
    const hoy = new Date().toLocaleDateString('es-VE');
    let csv = 'Concepto,Receptor,Tipo Receptor,Contribuyente Especial,Monto (Bs.),ISLR (Bs.),IVA (Bs.),Total Retenciones (Bs.),Neto (Bs.)\n';

    movimientos.forEach(mov => {
      csv += `"${mov.concepto}","${mov.nombreReceptor}","${mov.tipoReceptor}","${mov.esContribuyenteEspecial ? 'Sí' : 'No'}",${mov.monto},${mov.islr},${mov.iva},${mov.totalRetenciones},${mov.neto}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registro-contable-${hoy.replace(/\//g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [movimientos]);

  const hoy = new Date().toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return React.createElement('div', { className: 'container' },
    React.createElement('header', null,
      React.createElement('h1', null, '📊 Registro Contable Diario'),
      React.createElement('p', null, `${hoy.charAt(0).toUpperCase() + hoy.slice(1)} | Venezuela`),
      React.createElement('div', { className: 'ut-info' }, 'UT: Bs. 43,00 (2025-2026)')
    ),

    React.createElement('div', { className: 'main-grid' },
      React.createElement(FormularioMovimiento, { onAgregar: handleAgregarMovimiento }),
      React.createElement('div', { className: 'card' },
        React.createElement('h2', null, 'Resumen del Día'),
        React.createElement(Resumen, { movimientos, formatearMoneda }),
        movimientos.length > 0 && React.createElement('div', { className: 'button-group', style: { marginTop: '20px' } },
          React.createElement('button', {
            className: 'btn-export',
            onClick: handleExportar
          }, '📥 Exportar JSON'),
          React.createElement('button', {
            className: 'btn-export',
            onClick: handleExportarCSV
          }, '📥 Exportar CSV')
        )
      )
    ),

    React.createElement('div', { className: 'card' },
      React.createElement('h2', null, 'Movimientos Registrados'),
      React.createElement(TablaMovimientos, {
        movimientos,
        onEliminar: handleEliminarMovimiento,
        formatearMoneda
      })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(RegistroContableApp));

