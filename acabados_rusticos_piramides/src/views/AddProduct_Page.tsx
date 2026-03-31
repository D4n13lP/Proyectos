import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PackagePlus } from 'lucide-react'
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
    navigate('/products/add')
  }

  const tabs = [
    {
      id: 'datos-producto',
      label: 'Datos del producto',
      component: (
        <ProductDataForm onDataChange={(data) => handleDataChange('producto', data)} />
      )
    },
    {
      id: 'almacen-proveedor',
      label: 'Datos de almacen y proveedor',
      hideNavigation: true, // Let the component handle its own navigation
      component: (
        <WarehouseSupplierForm onDataChange={(data) => handleDataChange('almacenProveedor', data)} />
      )
    },
    {
      id: 'precio-venta',
      label: 'Precio venta',
      hideNavigation: true, // Allow SalesPriceForm to render the final Save/Agregar button
      component: (
        <SalesPriceForm
          costPrice={100} // TODO: Este valor debería venir del producto seleccionado
          onDataChange={(data) => handleDataChange('precioVenta', data)}
        />
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white animate-fade-in pb-12">
      {/* Botón regresar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <button 
          onClick={handleBack}
          className="text-gray-500 hover:text-[#16A085] flex items-center gap-2 transition-colors duration-300 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Volver
        </button>
      </div>

      {/* HEADER LOGO Y TÍTULO (en la misma fila para pantallas grandes) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative">
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <img 
            src={logoEmpresa} 
            alt="Acabados Rústicos Pirámides" 
            className="h-24 md:h-32 object-contain" 
          />
        </div>
        
        <div className="flex items-center justify-center gap-4 w-full h-[128px]">
          <h1 className="text-3xl md:text-[40px] font-normal text-[#e64a19] whitespace-nowrap">
            Agregar Producto
          </h1>
          <div className="text-[#e64a19]">
            <PackagePlus size={64} strokeWidth={1.2} />
          </div>
        </div>
      </div>

      {/* COMPONENTE DE TABS */}
      <div className="px-6 md:px-12">
        <ProductTabs 
          tabs={tabs}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </div>
    </div>
  )
}
