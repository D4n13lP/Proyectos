import { useState, useEffect } from 'react'

interface WarehouseSupplierFormProps {
  onDataChange?: (data: any) => void
}

interface SupplierData {
  id: string
  nombre: string
  empresa: string
  direccion: string
  telefonoOficina: string
  contacto: string
  telefonoContacto: string
  correo: string
  web: string
}

export default function WarehouseSupplierForm({ onDataChange }: WarehouseSupplierFormProps) {
  // Estado para el dropdown de proveedores
  const [suppliers, setSuppliers] = useState<SupplierData[]>([])
  const [selectedSupplierId, setSelectedSupplierId] = useState('')
  const [isNewSupplier, setIsNewSupplier] = useState(false)

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreAlmacen: '',
    direccion: '',
    proveedor: {
      id: '',
      nombre: '',
      empresa: '',
      direccion: '',
      telefonoOficina: '',
      contacto: '',
      telefonoContacto: '',
      correo: '',
      web: ''
    }
  })

  // Cargar datos de proveedores desde la BD (simulado)
  useEffect(() => {
    // TODO: Reemplazar con llamada a BD real cuando esté disponible
    setSuppliers([
      {
        id: 'MD001',
        nombre: 'proveedor1',
        empresa: 'Macetas',
        direccion: '742 Evergreen Terrace, Springfield, Aguascalientes, Mexico',
        telefonoOficina: '55 1234 7777',
        contacto: 'Juan',
        telefonoContacto: '55 2222 1234',
        correo: 'proveedor@gmail.com',
        web: 'www.ventas.com.mx'
      },
      {
        id: 'MD002',
        nombre: 'proveedor2',
        empresa: 'Adhesivos Plus',
        direccion: 'Calle Principal 123, México',
        telefonoOficina: '55 5555 5555',
        contacto: 'Carlos',
        telefonoContacto: '55 6666 6666',
        correo: 'carlos@adhesivos.com',
        web: 'www.adhesivos.com.mx'
      }
    ])
  }, [])

  const handleSupplierSelect = (supplierId: string) => {
    setSelectedSupplierId(supplierId)
    
    // Buscar el proveedor y llenar el formulario automáticamente
    if (supplierId) {
      const supplier = suppliers.find(s => s.id === supplierId)
      if (supplier && !isNewSupplier) {
        setFormData({
          ...formData,
          proveedor: supplier
        })
      }
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNewSupplier(e.target.checked)
    
    if (e.target.checked) {
      // Limpiar el formulario cuando se marca "Nuevo proveedor"
      setFormData({
        ...formData,
        proveedor: {
          id: '',
          nombre: '',
          empresa: '',
          direccion: '',
          telefonoOficina: '',
          contacto: '',
          telefonoContacto: '',
          correo: '',
          web: ''
        }
      })
    } else {
      // Si se desmarca, llenar con datos del proveedor seleccionado
      if (selectedSupplierId) {
        const supplier = suppliers.find(s => s.id === selectedSupplierId)
        if (supplier) {
          setFormData({
            ...formData,
            proveedor: supplier
          })
        }
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const { value } = e.target
    
    if (field.startsWith('proveedor.')) {
      const proveedorField = field.split('.')[1]
      const newData = {
        ...formData,
        proveedor: {
          ...formData.proveedor,
          [proveedorField]: value
        }
      }
      setFormData(newData)
      if (onDataChange) onDataChange(newData)
    } else {
      const newData = { ...formData, [field]: value }
      setFormData(newData)
      if (onDataChange) onDataChange(newData)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos del Almacén y Proveedor</h2>

      {/* SECCIÓN ALMACÉN */}
      <div className="space-y-4 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-700">Datos del Almacén</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Nombre del almacén *
            </label>
            <select
              value={formData.nombreAlmacen}
              onChange={(e) => handleInputChange(e, 'nombreAlmacen')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none bg-white"
            >
              <option value="">Seleccionar almacén...</option>
              <option value="Matriz Coyoacán">Matriz Coyoacán</option>
              <option value="Sucursal Polanco">Sucursal Polanco</option>
              <option value="Bodega Centro">Bodega Centro</option>
            </select>
            <small className="text-gray-400 block mt-1">Los datos se cargarán de la base de datos</small>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Dirección *
            </label>
            <input
              type="text"
              value={formData.direccion}
              onChange={(e) => handleInputChange(e, 'direccion')}
              placeholder="Ingrese la dirección del almacén"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN PROVEEDOR */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-700">Datos del Proveedor</h3>
        </div>

        {/* Checkbox Nuevo Proveedor */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
          <input
            type="checkbox"
            id="newSupplier"
            checked={isNewSupplier}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer accent-emerald-500"
          />
          <label htmlFor="newSupplier" className="text-sm font-bold text-gray-700 cursor-pointer uppercase">
            Nuevo proveedor
          </label>
        </div>

        {/* Dropdown para seleccionar proveedor existente */}
        {!isNewSupplier && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
              Seleccionar proveedor *
            </label>
            <select
              value={selectedSupplierId}
              onChange={(e) => handleSupplierSelect(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none bg-white"
            >
              <option value="">Seleccionar proveedor...</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.nombre} - {supplier.empresa}
                </option>
              ))}
            </select>
            <small className="text-gray-400 block mt-1">Los datos se cargarán de la base de datos</small>
          </div>
        )}

        {/* Formulario de proveedor */}
        <div
          className={`p-6 border-2 rounded-lg transition-all ${
            isNewSupplier ? 'border-emerald-400 bg-white' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Código de proveedor
              </label>
              <input
                type="text"
                value={formData.proveedor.id}
                onChange={(e) => handleInputChange(e, 'proveedor.id')}
                placeholder="ID del proveedor"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Nombre proveedor *
              </label>
              <input
                type="text"
                value={formData.proveedor.nombre}
                onChange={(e) => handleInputChange(e, 'proveedor.nombre')}
                placeholder="Nombre del proveedor"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Empresa
              </label>
              <input
                type="text"
                value={formData.proveedor.empresa}
                onChange={(e) => handleInputChange(e, 'proveedor.empresa')}
                placeholder="Nombre de la empresa"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Dirección
              </label>
              <input
                type="text"
                value={formData.proveedor.direccion}
                onChange={(e) => handleInputChange(e, 'proveedor.direccion')}
                placeholder="Dirección"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Teléfono oficina
              </label>
              <input
                type="text"
                value={formData.proveedor.telefonoOficina}
                onChange={(e) => handleInputChange(e, 'proveedor.telefonoOficina')}
                placeholder="Teléfono de oficina"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Nombre del contacto
              </label>
              <input
                type="text"
                value={formData.proveedor.contacto}
                onChange={(e) => handleInputChange(e, 'proveedor.contacto')}
                placeholder="Nombre del contacto"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Teléfono del contacto
              </label>
              <input
                type="text"
                value={formData.proveedor.telefonoContacto}
                onChange={(e) => handleInputChange(e, 'proveedor.telefonoContacto')}
                placeholder="Teléfono de contacto"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.proveedor.correo}
                onChange={(e) => handleInputChange(e, 'proveedor.correo')}
                placeholder="correo@ejemplo.com"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                Sitio web
              </label>
              <input
                type="text"
                value={formData.proveedor.web}
                onChange={(e) => handleInputChange(e, 'proveedor.web')}
                placeholder="www.ejemplo.com"
                disabled={!isNewSupplier}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
