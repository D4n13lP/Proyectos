import { FileEdit, FileText, Receipt } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import logoEmpresa from '../assets/logo_empresa.jpg';

export default function OrdersMenu_Page() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col">
      
      {/* 1. LOGO */}
      <div className="max-w-7xl mx-auto w-full">
        <img 
          src={logoEmpresa} 
          alt="Acabados Rústicos Pirámides" 
          className="h-16 md:h-20 object-contain" 
        />
      </div>

      <main className="flex-grow flex flex-col items-center">
        
        {/* Espaciador mínimo para el posicionamiento alto del título */}
        <div className="h-2 md:h-4" />

        {/* 2. TÍTULO: Texto a la izquierda e Icono a la derecha */}
        <div className="flex items-center gap-6 mb-32 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Pedidos
          </h1>
          {/* El icono Receipt ahora está después del h1 */}
          <div className="text-inherit">
            <Receipt size={65} strokeWidth={1.2} />
          </div>
        </div>

        {/* 3. GRID DE TARJETAS: Alineación horizontal estándar */}
        <div className="flex flex-wrap justify-center gap-20 w-full max-w-5xl px-4">
          
          <MenuCard 
            label="Actualizar pedido" 
            icon={FileEdit} 
            path="/orders/update" 
            bgColor="bg-[#74c9f1]" 
          />
          
          <MenuCard 
            label="Reporte Pedidos" 
            icon={FileText} 
            path="/orders/reports" 
            bgColor="bg-[#fcd34d]" 
          />
          
        </div>

        {/* 4. CONTRAPESO: Espaciador inferior */}
        <div className="flex-grow min-h-[100px]" />
      </main>
    </div>
  );
}