import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowLeft, FileText } from 'lucide-react';
import logoEmpresa from '../assets/logo_empresa.jpg';

export default function SalesReport_Page() {
  const navigate = useNavigate();

  // --- ESTADOS DE FECHAS ---
  const [fechaInicio, setFechaInicio] = useState({ mm: '', dd: '', aaaa: '' });
  const [fechaFin, setFechaFin] = useState({ mm: '', dd: '', aaaa: '' });
  const [isReporteDia, setIsReporteDia] = useState(false);

  // --- ESTADOS DE USUARIO ---
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState('Todos');

  // Simulación de carga de usuarios (esto vendrá de tu BD)
  const usuariosDB = ["Todos", "Juan Pérez", "María García", "Carlos López", "Ana Martínez", "Luis Rodríguez", "Elena Beltrán"];

  // Efecto para manejar el "Reporte del día"
  useEffect(() => {
    if (isReporteDia) {
      const hoy = new Date();
      const actual = {
        mm: String(hoy.getMonth() + 1).padStart(2, '0'),
        dd: String(hoy.getDate()).padStart(2, '0'),
        aaaa: String(hoy.getFullYear())
      };
      setFechaInicio(actual);
      setFechaFin(actual);
    }
  }, [isReporteDia]);

  const handleGenerateReport = () => {
    const dataConsultada = {
      inicio: `${fechaInicio.aaaa}-${fechaInicio.mm}-${fechaInicio.dd}`,
      fin: `${fechaFin.aaaa}-${fechaFin.mm}-${fechaFin.dd}`,
      vendedor: vendedorSeleccionado !== 'Todos' ? vendedorSeleccionado : null
    };
    console.log("Generando reporte con:", dataConsultada);
    // Aquí navegarás a la vista de resultados o dispararás la consulta
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 animate-fade-in flex flex-col">
      <div className="max-w-7xl mx-auto w-full mb-4">
        <img src={logoEmpresa} alt="Logo" className="h-16 md:h-20 object-contain" />
      </div>

      <main className="w-full max-w-4xl mx-auto">
        {/* BOTÓN REGRESAR */}
        {/* <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#3ab0e2] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Regresar</span>
        </button> */}

        {/* TÍTULO CON ICONO A LA DERECHA */}
        <div className="flex items-center gap-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-normal text-[#e65100]">Reporte de ventas</h1>
          <TrendingUp className="text-[#e65100]" size={60} strokeWidth={1.5} />
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl text-gray-700 font-light">Selecciona una periodo para generar reporte</h2>

          {/* SECCIÓN DE FECHAS */}
          <div className="space-y-6">
            {/* INICIO */}
            <div className={`flex flex-col md:flex-row items-center gap-8 transition-opacity ${isReporteDia ? 'opacity-40 pointer-events-none' : ''}`}>
              <span className="text-2xl w-24">Inicio</span>
              <div className="flex gap-4">
                <input type="text" placeholder="MM" className="w-20 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaInicio.mm} onChange={(e) => setFechaInicio({...fechaInicio, mm: e.target.value})} />
                <input type="text" placeholder="DD" className="w-20 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaInicio.dd} onChange={(e) => setFechaInicio({...fechaInicio, dd: e.target.value})} />
                <input type="text" placeholder="AAAA" className="w-32 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaInicio.aaaa} onChange={(e) => setFechaInicio({...fechaInicio, aaaa: e.target.value})} />
              </div>
            </div>

            {/* FIN */}
            <div className={`flex flex-col md:flex-row items-center gap-8 transition-opacity ${isReporteDia ? 'opacity-40 pointer-events-none' : ''}`}>
              <span className="text-2xl w-24">Fin</span>
              <div className="flex gap-4">
                <input type="text" placeholder="MM" className="w-20 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaFin.mm} onChange={(e) => setFechaFin({...fechaFin, mm: e.target.value})} />
                <input type="text" placeholder="DD" className="w-20 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaFin.dd} onChange={(e) => setFechaFin({...fechaFin, dd: e.target.value})} />
                <input type="text" placeholder="AAAA" className="w-32 p-2 border-2 border-gray-200 rounded text-center outline-none focus:border-[#3ab0e2]" value={fechaFin.aaaa} onChange={(e) => setFechaFin({...fechaFin, aaaa: e.target.value})} />
              </div>
            </div>
          </div>

          {/* REPORTE DEL DÍA */}
          <div className="flex items-center gap-4 py-4">
            <span className="text-2xl text-gray-800">Reporte del dia</span>
            <input 
              type="checkbox" 
              className="w-6 h-6 accent-[#3ab0e2] cursor-pointer"
              checked={isReporteDia}
              onChange={(e) => setIsReporteDia(e.target.checked)}
            />
          </div>

          {/* SELECCIÓN VENDEDOR */}
          <div className="space-y-4">
            <h3 className="text-2xl text-gray-800">Selecciona un vendedor</h3>
            <select 
              className="w-64 p-2 border-2 border-gray-200 rounded-md outline-none focus:border-[#3ab0e2] bg-gray-50 cursor-pointer overflow-y-auto"
              value={vendedorSeleccionado}
              onChange={(e) => setVendedorSeleccionado(e.target.value)}
            >
              {usuariosDB.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* BOTÓN GENERAR */}
          <div className="flex justify-end pt-10">
            <button
              onClick={handleGenerateReport}
              className="bg-[#3ab0e2] hover:bg-[#16A085] text-white px-8 py-3 rounded shadow-md transition-all flex items-center gap-3 font-medium active:scale-95 cursor-pointer"
            >
              Generar reporte
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}