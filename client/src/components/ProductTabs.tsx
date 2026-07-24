import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

interface TabConfig {
  id: string
  label: string
  component: React.ReactNode
}

interface ProductTabsProps {
  tabs: TabConfig[]
  onSubmit?: (data: any) => void
  onBack?: () => void
}

export default function ProductTabs({ tabs, onSubmit, onBack }: ProductTabsProps) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setCurrentTabIndex(currentTabIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentTabIndex > 0) {
      setCurrentTabIndex(currentTabIndex - 1)
    }
  }

  const handleGoBack = () => {
    if (onBack) onBack()
  }

  const isFirstTab = currentTabIndex === 0
  const isLastTab = currentTabIndex === tabs.length - 1

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 animate-fade-in">
      {/* BOTÓN REGRESAR GLOBAL */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={handleGoBack}
          className="bg-[#3ab0e2] hover:bg-[#16A085] text-white px-8 py-2 rounded shadow-md flex items-center gap-2 transition-all font-bold text-sm uppercase cursor-pointer"
        >
          <ArrowLeft size={18} /> Atrás
        </button>
      </div>

      {/* TABS HEADER */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTabIndex(index)}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wider transition-all whitespace-nowrap border-b-2 ${
                currentTabIndex === index
                  ? 'text-[#3ab0e2] border-[#3ab0e2]'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          {tabs[currentTabIndex].component}
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="max-w-6xl mx-auto mt-12 flex gap-4 justify-end">
        {!isFirstTab && (
          <button
            onClick={handlePrev}
            className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-8 rounded-lg shadow-lg font-bold flex items-center justify-center gap-2 transition-all uppercase cursor-pointer"
          >
            <ArrowLeft size={18} /> Anterior
          </button>
        )}

        {!isLastTab ? (
          <button
            onClick={handleNext}
            className="bg-[#3ab0e2] hover:bg-[#16A085] text-white py-3 px-8 rounded-lg shadow-lg font-bold flex items-center justify-center gap-2 transition-all uppercase cursor-pointer"
          >
            Siguiente <ArrowRight size={18} />
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                if (onSubmit) onSubmit({})
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-8 rounded-lg shadow-lg font-bold flex items-center justify-center gap-2 transition-all uppercase cursor-pointer"
            >
              <Check size={18} /> Guardar Producto
            </button>
          </>
        )}
      </div>
    </div>
  )
}
