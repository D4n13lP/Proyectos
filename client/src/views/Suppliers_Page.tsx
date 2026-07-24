import { Users, UserPlus } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import logoEmpresa from '../assets/logo_empresa.jpg'; // Usando la importación recomendada

export default function SuppliersMenu_Page() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col">
      
      {/* 1. LOGO: Posicionado arriba a la izquierda */}
      <div className="max-w-7xl mx-auto w-full">
        <img 
          src={logoEmpresa} 
          alt="Acabados Rústicos Pirámides" 
          className="h-16 md:h-20 object-contain" 
        />
      </div>

      <main className="flex-grow flex flex-col items-center">
        
        {/* Espaciador mínimo para subir el título */}
        <div className="h-2 md:h-4" />

        {/* 2. TÍTULO: "Proveedores" con el margen inferior estándar de mb-32 */}
        <div className="flex items-center gap-6 mb-32 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Proveedores
          </h1>
          {/* Icono de Proveedores similar al de la imagen */}
          <div className="text-[#e65100]">
            <Users size={55} strokeWidth={1.5} />
          </div>
        </div>

        {/* 3. GRID DE TARJETAS: Con separación gap-20 y efecto hover invertido */}
        <div className="flex flex-wrap justify-center gap-20 w-full max-w-5xl px-4">
          
          <MenuCard 
            label="Ver proveedores" 
            icon={Users} 
            path="/suppliers/list" 
            bgColor="bg-[#3ab0e2]" 
          />
          
          <MenuCard 
            label="Registrar proveedor" 
            icon={UserPlus} 
            path="/suppliers/new" 
            bgColor="bg-[#ffcc33]" 
          />
          
        </div>

        {/* 4. CONTRAPESO: Espaciador inferior para el centrado óptico */}
        <div className="flex-grow min-h-[100px]" />
      </main>
    </div>
  );
}