import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import logoEmpresa from '../assets/logo_empresa.jpg'
import ProductTabs from '../components/ProductTabs'
import ProductDataForm from '../components/ProductDataForm'
import WarehouseSupplierForm from '../components/WarehouseSupplierForm'
import SalesPriceForm from '../components/SalesPriceForm'

export default function AddProduct_Page() {
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    producto: {},
    almacenProveedor: {},
    precioVenta: {}
  })

  const handleDataChange = (tabType: string, data: any) => {
    setProductData(prev => ({
      ...prev,
      [tabType]: data
    }))
  }

  const handleSubmit = async () => {
    // TODO: Aquí se enviará toda la información a la base de datos
    console.log('Datos a guardar:', productData)
    alert('Producto registrado correctamente (datos en consola)')
    // Después de guardar exitosamente, regresar a la lista de productos
    navigate('/products')
  }

  const handleBack = () => {
    navigate('/products')
  }

  const tabs = [
    {
      id: 'datos-producto',
      label: 'Datos del Producto',
      component: (
        <ProductDataForm onDataChange={(data) => handleDataChange('producto', data)} />
      )
    },
    {
      id: 'almacen-proveedor',
      label: 'Datos del almacén y proveedor',
      component: (
        <WarehouseSupplierForm onDataChange={(data) => handleDataChange('almacenProveedor', data)} />
      )
    },
    {
      id: 'precio-venta',
      label: 'Precio venta',
      component: (
        <SalesPriceForm 
          costPrice={100} // TODO: Este valor debería venir del producto seleccionado
          onDataChange={(data) => handleDataChange('precioVenta', data)} 
        />
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* HEADER CON LOGO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <img 
          src={logoEmpresa} 
          alt="Acabados Rústicos Pirámides" 
          className="h-16 md:h-20 object-contain" 
        />
      </div>

      {/* TÍTULO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="flex items-center justify-center gap-4 mb-4 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Agregar Producto
          </h1>
          <Package size={55} strokeWidth={1.2} />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Complete todos los datos del producto en los siguientes pasos
        </p>
      </div>

      {/* COMPONENTE DE TABS */}
      <ProductTabs 
        tabs={tabs}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </div>
  )
}
