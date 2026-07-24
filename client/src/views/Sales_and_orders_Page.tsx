import { ShoppingCart, PackageSearch, Wallet, Banknote } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import logoEmpresa from '../assets/logo_empresa.jpg';

export default function SalesMenu_Page() {
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
        
        {/* Espaciador mínimo para subir el título */}
        <div className="h-2 md:h-4" />

        {/* 2. TÍTULO: "Ventas y pedidos" con el icono del mismo color naranja */}
        <div className="flex items-center gap-6 mb-32 text-[#e65100]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Ventas y pedidos
          </h1>
          {/* El icono ahora hereda el color text-[#e65100] */}
          <div className="text-inherit">
            <Banknote size={65} strokeWidth={1.2} />
          </div>
        </div>

        {/* 3. GRID DE TARJETAS: Alineadas horizontalmente con flex-row (por defecto en flex) */}
        <div className="flex flex-wrap justify-center gap-12 w-full max-w-7xl px-4">
          
          <MenuCard 
            label="Registrar Venta" 
            icon={ShoppingCart} 
            path="/sales/new-sale" 
            bgColor="bg-[#3ab0e2]" 
          />
          
          <MenuCard 
            label="Registrar Pedido" 
            icon={PackageSearch} 
            path="/sales/new-order" 
            bgColor="bg-[#ffcc33]" 
          />

          <MenuCard 
            label="Registrar Cuenta destino" 
            icon={Wallet} 
            path="/sales/destination-account" 
            bgColor="bg-[#5d1209]" // Color café/oscuro de la imagen
          />
          
        </div>

        {/* 4. CONTRAPESO: Espaciador inferior */}
        <div className="flex-grow min-h-[100px]" />
      </main>
    </div>
  );
}