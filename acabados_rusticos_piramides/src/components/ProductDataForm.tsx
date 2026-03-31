import { useState, useEffect } from 'react'
import * as React from 'react'
import { UploadCloud } from 'lucide-react'

interface ProductDataFormProps {
  onDataChange?: (data: any) => void
}

export default function ProductDataForm({ onDataChange }: ProductDataFormProps) {
  // Estados para los dropdowns - estos se llenarán con datos de BD
  const [categories, setCategories] = useState<string[]>([])
  const [currencies, setCurrencies] = useState<string[]>([])
  const [units, setUnits] = useState<string[]>([])

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    moneda: '',
    unidades: '',
    imagen: null as File | null,
    imagenPreview: ''
  })

  // Simular carga de datos de BD (cambiar cuando conectes BD real)
  useEffect(() => {
    // TODO: Reemplazar con llamada a BD real cuando esté disponible
    setCategories(['Macetas', 'Adhesivos', 'Adoquín', 'Cantera laminada', 'Figuras', 'Mármol', 'Fuentes', 'Laja'])
    setCurrencies(['MXN', 'USD', 'EUR'])
    setUnits(['Pieza', 'Metro', 'Kg', 'Litro', 'Caja'])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    if (onDataChange) onDataChange(newData)
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newData = {
          ...formData,
          imagen: file,
          imagenPreview: event.target?.result as string
        }
        setFormData(newData)
        if (onDataChange) onDataChange(newData)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos del Producto</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECCIÓN IZQUIERDA: Imagen */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer hover:border-emerald-400 transition-colors">
            {formData.imagenPreview ? (
              <img src={formData.imagenPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                <UploadCloud size={40} />
                <span className="text-sm font-medium">Seleccionar imagen</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#3ab0e2] hover:bg-[#16A085] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase cursor-pointer transition-all"
          >
            Seleccionar archivo
          </button>
        </div>

        {/* SECCIÓN DERECHA: Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nombre del producto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Nombre del producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre del producto"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Categoría *
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none bg-white"
            >
              <option value="">Seleccionar categoría...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <small className="text-gray-400 block mt-1">Los datos se cargarán de la base de datos</small>
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Moneda *
            </label>
            <select
              name="moneda"
              value={formData.moneda}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none bg-white"
            >
              <option value="">Seleccionar moneda...</option>
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
            <small className="text-gray-400 block mt-1">Los datos se cargarán de la base de datos</small>
          </div>

          {/* Unidades */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Unidades *
            </label>
            <select
              name="unidades"
              value={formData.unidades}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none bg-white"
            >
              <option value="">Seleccionar unidades...</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <small className="text-gray-400 block mt-1">Los datos se cargarán de la base de datos</small>
          </div>
        </div>
      </div>
    </div>
  )
}
