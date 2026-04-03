import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import logoEmpresa from '../assets/logo_empresa.jpg';

export default function RegisterSupplier_Page() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    empresa: '',
    direccion: '',
    telefonoOficina: '',
    nombreContacto: '',
    telefonoContacto: '',
    correo: '',
    sitioWeb: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes realizar la llamada a la API o manejar la base de datos
    console.log('Enviando a la base de datos los datos del proveedor:', formData);
    
    // Una vez guardado, se puede limpiar o redirigir a ver los proveedores.
    // navigate('/suppliers/watch');
    alert('Proveedor registrado (Ver consola)');
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-7xl mb-12 border-b border-gray-200 pb-8 relative flex items-center justify-center min-h-[5rem]">
        
        {/* Back Button and Logo (Left) */}
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
            Registrar proveedor
          </h1>
          <UserPlus size={45} strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Form Content */}
      <main className="w-full max-w-2xl flex flex-col mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <label htmlFor="codigo" className="text-gray-900 font-semibold w-1/3 text-lg">
              Código de proveedor
            </label>
            <input 
              type="text" 
              name="codigo" 
              id="codigo" 
              value={formData.codigo} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="nombre" className="text-gray-900 font-semibold w-1/3 text-lg">
              Nombre de proveedor
            </label>
            <input 
              type="text" 
              name="nombre" 
              id="nombre" 
              value={formData.nombre} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="empresa" className="text-gray-900 font-semibold w-1/3 text-lg">
              Empresa
            </label>
            <input 
              type="text" 
              name="empresa" 
              id="empresa" 
              value={formData.empresa} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="direccion" className="text-gray-900 font-semibold w-1/3 text-lg">
              Dirección
            </label>
            <input 
              type="text" 
              name="direccion" 
              id="direccion" 
              value={formData.direccion} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="telefonoOficina" className="text-gray-900 font-semibold w-1/3 text-lg">
              Teléfono oficina
            </label>
            <input 
              type="text" 
              name="telefonoOficina" 
              id="telefonoOficina" 
              value={formData.telefonoOficina} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="nombreContacto" className="text-gray-900 font-semibold w-1/3 text-lg">
              Nombre del contacto
            </label>
            <input 
              type="text" 
              name="nombreContacto" 
              id="nombreContacto" 
              value={formData.nombreContacto} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="telefonoContacto" className="text-gray-900 font-semibold w-1/3 text-lg">
              Teléfono de contacto
            </label>
            <input 
              type="text" 
              name="telefonoContacto" 
              id="telefonoContacto" 
              value={formData.telefonoContacto} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="correo" className="text-gray-900 font-semibold w-1/3 text-lg">
              Correo electrónico
            </label>
            <input 
              type="email" 
              name="correo" 
              id="correo" 
              value={formData.correo} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="sitioWeb" className="text-gray-900 font-semibold w-1/3 text-lg">
              Sitio web
            </label>
            <input 
              type="text" 
              name="sitioWeb" 
              id="sitioWeb" 
              value={formData.sitioWeb} 
              onChange={handleChange}
              className="w-2/3 bg-gray-200 border-none rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3ab0e2]"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button 
              type="submit" 
              className="bg-[#3ab0e2] hover:bg-sky-400 text-white px-8 py-2 rounded shadow-sm transition-colors text-sm font-medium cursor-pointer"
            >
              Guardar
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}