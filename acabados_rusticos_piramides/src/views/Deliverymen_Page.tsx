import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Trash2 } from 'lucide-react';
import logoEmpresa from '../assets/logo_empresa.jpg';

export default function Deliverymen_Page() {
  const navigate = useNavigate();

  const [deliverymen, setDeliverymen] = useState([
    { id: 1, name: 'Repartidor 1' },
    { id: 2, name: 'Repartidor 2' },
    { id: 3, name: 'Repartidor 3' },
  ]);

  const [newName, setNewName] = useState('');

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${name} de la base de datos?`)) {
      setDeliverymen(deliverymen.filter(d => d.id !== id));
    }
  };

  const handleAdd = () => {
    if (newName.trim() === '') {
      alert('Por favor, ingresa el nombre del repartidor.');
      return;
    }
    const newDeliveryman = {
      id: Date.now(),
      name: newName.trim(),
    };
    setDeliverymen([...deliverymen, newDeliveryman]);
    setNewName('');
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl mb-12 border-b border-gray-200 pb-8 relative flex items-center justify-center min-h-[5rem]">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-6">
          <img 
            src={logoEmpresa} 
            alt="Logo Empresa" 
            className="h-20 w-auto object-contain" 
          />
          <button 
            onClick={() => navigate(-1)} 
            className="bg-[#3ab0e2] hover:bg-sky-400 text-white px-6 py-2 rounded shadow-sm transition-colors text-sm font-medium cursor-pointer"
          >
            Atras
          </button>
        </div>
        
        {/* Title Centered with Icon */}
        <div className="flex items-center gap-4 text-[#e2694b]">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">
            Repartidores
          </h1>
          <Truck size={45} strokeWidth={1.5} />
        </div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch gap-16 md:gap-32 mt-4 px-4 bg-white">
        
        {/* Contenedor Gris Izquierdo */}
        <div className="w-full md:w-[480px] bg-[#b1b8cc] rounded shadow-md p-8 min-h-[500px] flex flex-col items-center">
          <h2 className="text-[22px] font-medium text-gray-900 mb-8 self-start w-full text-left">
            Repartidores disponibles
          </h2>
          
          <div className="flex flex-col gap-4 w-full">
            {deliverymen.map((repartidor) => (
              <div key={repartidor.id} className="flex flex-row items-center justify-center gap-3 w-full pl-6 pr-6">
                <div className="bg-white rounded py-1.5 px-4 shadow-sm text-center text-sm font-semibold text-gray-800 w-[240px]">
                  {repartidor.name}
                </div>
                <button 
                  onClick={() => handleDelete(repartidor.id, repartidor.name)}
                  className="bg-white p-1.5 rounded shadow-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                >
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
            ))}
            
            {deliverymen.length === 0 && (
              <p className="text-gray-600 text-center mt-4">No hay repartidores disponibles.</p>
            )}
          </div>
        </div>

        {/* Formulario Derecho */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start pt-10 md:pt-0">
          <div className="flex flex-col gap-4 w-full pl-0 md:pl-10">
            <div className="flex flex-row items-center justify-start gap-4">
              <label className="text-sm font-medium text-gray-800 min-w-max">Nombre del repartidor</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAdd();
                  }
                }}
                className="border border-gray-400 bg-white rounded-md px-3 py-1.5 focus:border-[#3ab0e2] outline-none w-full max-w-[280px]"
              />
            </div>
            <div className="flex justify-end w-full max-w-[440px] mt-2">
              <button 
                onClick={handleAdd}
                className="bg-[#3ab0e2] hover:bg-sky-500 text-white px-10 py-1.5 rounded shadow text-sm transition-colors cursor-pointer"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
