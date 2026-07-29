import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PackagePlus } from 'lucide-react'
import logoEmpresa from '../assets/logo_empresa.jpg'
import ProductTabs from '../components/ProductTabs'
import ProductDataForm from '../components/ProductDataForm'
import WarehouseSupplierForm from '../components/WarehouseSupplierForm'
import SalesPriceForm from '../components/SalesPriceForm'
import { createProduct } from '../api/products'
import { getCategories, createCategory } from '../api/categories'
import { getProductUnits, createProductUnit } from '../api/productUnits'
import { getWarehouses, createWarehouse } from '../api/warehouses'
import { createSupplier } from '../api/suppliers'
import { linkSupplierProduct } from '../api/suppProd'
import { createInventory } from '../api/inventory'
import { getTimeUnits, createTimeUnit } from '../api/timeUnits'
import { createSalesExpectation } from '../api/salesExpectations'

export default function AddProduct_Page() {
  const navigate = useNavigate()
  const [productData, setProductData] = useState<{ producto: any; almacenProveedor: any; precioVenta: any }>({
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
    const { producto, almacenProveedor, precioVenta } = productData

    if (!producto?.nombre || !producto?.sku) {
      alert('Completa al menos el nombre y el SKU del producto.')
      return
    }

    try {
      // 1. Categoría: usar existente por nombre o crear una nueva
      let categoryID: string | undefined
      if (producto.categoria) {
        const categories = await getCategories()
        const existing = categories.find(c => c.categoryName.toLowerCase() === producto.categoria.toLowerCase())
        categoryID = existing ? existing.categoryID : (await createCategory(producto.categoria)).categoryID
      }

      // 2. Unidad: usar existente por nombre o crear una nueva
      let produnitID: string | undefined
      if (producto.unidades) {
        const units = await getProductUnits()
        const existing = units.find(u => u.produnitName.toLowerCase() === producto.unidades.toLowerCase())
        produnitID = existing ? existing.produnitID : (await createProductUnit(producto.unidades)).produnitID
      }

      // 3. Crear el producto
      const newProduct = await createProduct({
        productName: producto.nombre,
        sku: producto.sku,
        description: producto.descripcion,
        prodType: 'warehouse',
        cost: Number(producto.costo) || 0,
        currencyCost: producto.moneda || 'MXN',
        salePrice: Number(precioVenta?.precioVenta) || 0,
        lowStock: Number(producto.unidadesStockBajo) || 0,
        categoryID,
        produnitID,
      })

      // 4. Almacén: usar existente por nombre o crear uno nuevo
      let whID: string | undefined
      if (almacenProveedor?.nombreAlmacen) {
        const warehouses = await getWarehouses()
        const existing = warehouses.find(w => w.whname.toLowerCase() === almacenProveedor.nombreAlmacen.toLowerCase())
        whID = existing ? existing.whID : (await createWarehouse({
          whname: almacenProveedor.nombreAlmacen,
          whaddress: almacenProveedor.direccionAlmacen,
        })).whID
      }

      // 5. Proveedor: usar el seleccionado o registrar uno nuevo, y enlazarlo al producto
      const proveedor = almacenProveedor?.proveedor
      if (proveedor?.nombre) {
        let suppCode = proveedor.id
        if (!suppCode) {
          const createdSupplier = await createSupplier({
            supplierName: proveedor.nombre,
            enterpBusi: proveedor.empresa,
            address: proveedor.direccion,
            officePhone: proveedor.telefonoOficina,
            contactName: proveedor.contacto,
            contactPhone: proveedor.telefonoContacto,
          })
          suppCode = createdSupplier.suppCode
        }
        await linkSupplierProduct(suppCode, newProduct.prodCode)
      }

      // 6. Inventario inicial en el almacén elegido
      if (whID && producto.cantidad) {
        await createInventory({ prodCode: newProduct.prodCode, whID, quantity: Number(producto.cantidad) || 0 })
      }

      // 7. Expectativa de venta (opcional)
      if (precioVenta?.cantidad && precioVenta?.cantTiempo) {
        const timeUnits = await getTimeUnits()
        const existing = timeUnits.find(t => t.timeunitName === precioVenta.unidadTiempo)
        const timeunitID = existing ? existing.timeunitID : (await createTimeUnit(precioVenta.unidadTiempo)).timeunitID
        await createSalesExpectation({ prodCode: newProduct.prodCode, timeunitID, quantity: Number(precioVenta.cantidad) })
      }

      alert('Producto registrado correctamente')
      navigate('/products')
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Ocurrió un error al registrar el producto.')
    }
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
          costPrice={Number(productData.producto.costo) || 0}
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
