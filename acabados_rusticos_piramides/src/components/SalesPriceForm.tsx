import { useState, useEffect } from 'react'

interface SalesPriceFormProps {
  onDataChange?: (data: any) => void
  costPrice?: number // Precio de costo del producto
}

export default function SalesPriceForm({ onDataChange, costPrice = 100 }: SalesPriceFormProps) {
  const [applySpecialPrice, setApplySpecialPrice] = useState(false)
  const [formData, setFormData] = useState({
    precioVenta: '',
    cantidad: '1',
    importeTotal: 0,
    ganancia: 0,
    gananciaPorcentaje: 0
  })

  // Calcular automáticamente importe total y ganancia
  useEffect(() => {
    if (applySpecialPrice && formData.precioVenta) {
      const precio = parseFloat(formData.precioVenta) || 0
      const cantidad = parseFloat(formData.cantidad) || 1
      const importeTotal = precio * cantidad
      const ganancia = (precio - costPrice) * cantidad
      const gananciaPorcentaje = costPrice > 0 ? ((precio - costPrice) / costPrice) * 100 : 0

      const newData = {
        ...formData,
        importeTotal: Math.round(importeTotal * 100) / 100,
        ganancia: Math.round(ganancia * 100) / 100,
        gananciaPorcentaje: Math.round(gananciaPorcentaje * 100) / 100
      }
      setFormData(newData)
      if (onDataChange) onDataChange(newData)
    }
  }, [formData.precioVenta, formData.cantidad, costPrice, applySpecialPrice])

  // Permitir solo números en el campo de precio venta
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Solo permitir números y punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        precioVenta: value
      })
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        cantidad: value
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplySpecialPrice(e.target.checked)
    if (!e.target.checked) {
      // Limpiar los valores cuando se desmarca
      setFormData({
        precioVenta: '',
        cantidad: '1',
        importeTotal: 0,
        ganancia: 0,
        gananciaPorcentaje: 0
      })
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Precio de Venta</h2>

      {/* INFORMACIÓN DEL COSTO */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-sm text-blue-800">
          <strong>Precio de costo: ${costPrice.toFixed(2)}</strong>
        </p>
        <small className="text-blue-600">
          Este valor se utiliza para calcular automáticamente la ganancia
        </small>
      </div>

      {/* CHECKBOX PARA APLICAR PRECIO ESPECIAL */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <input
          type="checkbox"
          id="applyPrice"
          checked={applySpecialPrice}
          onChange={handleCheckboxChange}
          className="w-5 h-5 cursor-pointer accent-emerald-500"
        />
        <label htmlFor="applyPrice" className="text-sm font-bold text-gray-700 cursor-pointer uppercase">
          Aplicar expectativa de venta
        </label>
      </div>

      {/* FORMULARIO DE PRECIO */}
      <div
        className={`p-6 border-2 rounded-lg transition-all ${
          applySpecialPrice ? 'border-emerald-400 bg-white' : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Precio de venta */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Precio venta *
            </label>
            <input
              type="text"
              value={formData.precioVenta}
              onChange={handlePriceChange}
              placeholder="0.00"
              disabled={!applySpecialPrice}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
            />
            <small className="text-gray-400 block mt-1">Solo números permitidos</small>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Cantidad
            </label>
            <input
              type="text"
              value={formData.cantidad}
              onChange={handleQuantityChange}
              disabled={!applySpecialPrice}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Importe Total */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Importe total
            </label>
            <div className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 flex items-center">
              <span className="text-lg font-bold text-gray-700">
                ${formData.importeTotal.toFixed(2)}
              </span>
            </div>
            <small className="text-gray-400 block mt-1">
              Se calcula automáticamente: Precio × Cantidad
            </small>
          </div>

          {/* Ganancia */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Ganancia
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 flex items-center">
                  <span className="text-lg font-bold text-gray-700">
                    ${formData.ganancia.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="w-24">
                <div className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-600">
                    {formData.gananciaPorcentaje.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <small className="text-gray-400 block mt-1">
              Se calcula automáticamente con el precio de costo
            </small>
          </div>
        </div>
      </div>

      {/* NOTA INFORMATIVA */}
      <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
        <p className="text-sm font-bold text-amber-800 mb-2">Notas sobre los cálculos:</p>
        <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
          <li><strong>Importe total:</strong> Se calcula automáticamente multiplicando el precio de venta por la cantidad</li>
          <li><strong>Ganancia:</strong> Se calcula como la diferencia entre el precio de venta y el precio de costo, multiplicado por la cantidad</li>
          <li>Los cálculos se actualizan en tiempo real cuando cambias los valores</li>
        </ul>
      </div>
    </div>
  )
}
