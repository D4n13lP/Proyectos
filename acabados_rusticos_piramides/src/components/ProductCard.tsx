import { useAppStore } from '../stores/useAppStore' // Importa tu store
import { type Product } from "../types"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Obtenemos la función para abrir el modal del Store
  const openModal = useAppStore((state) => state.openModal)
  
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col w-full max-w-[200px]">
      <div className="overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.imagenes[0]}
          alt={product.nombre}
          className="w-full h-full object-cover hover:scale-125 transition-transform duration-500 hover:rotate-2"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-sm font-extrabold text-gray-800 truncate uppercase">
          {product.nombre}
        </h3>
        
        {/* Precio dinámico del index.ts */}
        <p className="text-[#e65100] font-bold text-lg my-2">
          ${product.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </p>

        <button
          type="button"
          className="bg-[#3ab0e2] hover:bg-[#16A085] text-white py-2 w-full rounded-md font-bold text-xs transition-colors mt-auto cursor-pointer"
          // onClick={() => console.log(`Ver detalle de ${product.id}`)}
          onClick={() => openModal(product)}
        >
          VER DETALLE
        </button>
      </div>
    </div>
  )
}