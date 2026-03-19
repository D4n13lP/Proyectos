import { Package, ClipboardCheck } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import logoEmpresa from '../assets/logo_empresa.jpg'; // Importación arriba del componente

export default function ProductsMenu_Page() {
  const LOGO_SRC = "/src/assets/logo_empresa.png"; 

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col">
      
      {/* 1. LOGO */}
      <div className="max-w-7xl mx-auto w-full">
        <img 
          src={logoEmpresa} 
          alt="LogoEmpresa" 
          className="h-16 md:h-20 object-contain" 
        />
      </div>

      {/* 2. CONTENEDOR DE CONTENIDO */}
      <main className="flex-grow flex flex-col items-center">
        
        {/* Espaciador mínimo arriba: Esto acerca el título al logo */}
        <div className="h-2 md:h-4" />

        {/* TITULO: Con un margen inferior (mb-32) mucho más grande para empujar las tarjetas */}
        <div className="flex items-center gap-4 mb-32 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Productos
          </h1>
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 6h8M8 10h8" />
          </svg>
        </div>

        {/* 3. ÁREA DE TARJETAS: Ahora tienen más separación del título */}
        <div className="flex flex-wrap justify-center gap-20 w-full max-w-5xl px-4">
          <MenuCard 
            label="Ver productos" 
            icon={Package} 
            path="/products/catalog" 
            bgColor="bg-[#3ab0e2]" 
          />
          
          <MenuCard 
            label="Registrar productos" 
            icon={ClipboardCheck} 
            path="/products/new" 
            bgColor="bg-[#ffcc33]" 
          />
        </div>

        {/* Espaciador inferior para mantener el equilibrio visual */}
        <div className="flex-grow min-h-[100px]" />
      </main>
    </div>
  );
}