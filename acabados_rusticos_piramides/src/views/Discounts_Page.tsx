import { useNavigate } from 'react-router-dom';
import { TicketPercent, Settings2 } from 'lucide-react'; // Importamos Settings2
import { RadioGroup } from '@headlessui/react';
import { useDiscountStore } from '../stores/useDiscountSlice';
import DiscountOption from '../components/DiscountOption';
import logoEmpresa from '../assets/logo_empresa.jpg';
import { ROUTES } from '../routes';

export default function DiscountsMenu_Page() {
  const navigate = useNavigate();
  const { selectedType, setSelectedType } = useDiscountStore();

  const handleNext = () => {
    if (selectedType === 'promocion') {
      navigate(ROUTES.DISCOUNTS.PROMOTION); 
    } else if (selectedType === 'cliente') {
      // Ajusta según el nombre de tu ruta para clientes
      navigate('/discounts/clients'); 
    } else if (selectedType === 'ajustes') {
      navigate(ROUTES.DISCOUNTS.DISCOUNT_ADJUSTMENT); 
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col">
      <div className="max-w-7xl mx-auto w-full mb-4">
        <img src={logoEmpresa} alt="Logo" className="h-16 md:h-20 object-contain" />
      </div>

      <main className="flex-grow flex flex-col items-center">
        <div className="h-2 md:h-4" />

        <div className="flex items-center gap-6 mb-16 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">Descuentos</h1>
          <TicketPercent className="text-[#e65100]" size={70} strokeWidth={1.2} />
        </div>

        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-xl text-gray-800 mb-12 font-medium">Selecciona el tipo de descuento</h2>

          <RadioGroup value={selectedType} onChange={setSelectedType} className="w-full space-y-8">
            <RadioGroup.Option value="promocion" className="cursor-pointer outline-none group">
              {({ checked }: { checked: boolean }) => (
                <DiscountOption 
                  label="Promoción" 
                  checked={checked} 
                  activeColor="text-[#3ab0e2]" 
                />
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value="cliente" className="cursor-pointer outline-none group">
              {({ checked }: { checked: boolean }) => (
                <DiscountOption 
                  label="Descuento a clientes" 
                  checked={checked} 
                  activeColor="text-[#16A085]" 
                />
              )}
            </RadioGroup.Option>

            {/* TERCERA OPCIÓN: AJUSTAR */}
            <RadioGroup.Option value="ajustes" className="cursor-pointer outline-none group">
              {({ checked }: { checked: boolean }) => (
                <div className="flex items-center justify-between w-full">
                  <DiscountOption 
                    label="Ajustar los tipos de descuento" 
                    checked={checked} 
                    activeColor="text-[#8e44ad]" 
                  />
                  {/* Icono extra para enfatizar que es configuración */}
                  <Settings2 
                    size={20} 
                    className={`transition-colors ${checked ? 'text-[#8e44ad]' : 'text-gray-300'}`} 
                  />
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>

          <p className="mt-14 text-gray-500 italic text-sm border-t border-gray-100 pt-4 w-full text-center">
            Nota: Solo aplica un descuento a la vez
          </p>

          <button
            onClick={handleNext}
            className="mt-10 bg-[#3ab0e2] hover:bg-[#16A085] text-white px-12 py-2.5 rounded shadow-md transition-all cursor-pointer font-medium text-lg active:scale-95"
          >
            Siguiente
          </button>
        </div>
        <div className="flex-grow min-h-[100px]" />
      </main>
    </div>
  );
}