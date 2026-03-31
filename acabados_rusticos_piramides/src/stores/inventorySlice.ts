import { type StateCreator } from 'zustand'

// Definimos la forma de los datos del inventario
export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  stock: number;
  pendientes: number;
  estado: string;
}

// export interface InventorySlice {
//   productos: Product[]
//   busqueda: string
//   setBusqueda: (termino: string) => void
//   // Aquí añadirás fetchProductos cuando conectes la API
// }

// export const createInventorySlice: StateCreator<InventorySlice> = (set) => ({
//   productos: [], // Inicia vacío como pediste
//   busqueda: '',
//   setBusqueda: (termino) => set({ busqueda: termino }),
// })


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// export interface InventorySlice {
//   productos: Product[]
//   tabActiva: string // <-- Nueva propiedad
//   setTabActiva: (tab: string) => void // <-- Nueva acción
// }

// export const createInventorySlice: StateCreator<InventorySlice> = (set) => ({
//   productos: [], 
//   tabActiva: 'general', // Tab por defecto
//   setTabActiva: (tab) => set({ tabActiva: tab }),
// })


export interface Product {
  id: string;
  codigo: string; // Añadido
  nombre: string;
  categoria: string;
  stock: number;
  pendientes: number;
  estado: string;
}

export interface InventorySlice {
  productos: Product[]
  tabActiva: string
  
  // Agrupamos los filtros en un objeto para mayor orden
  filtros: {
    codigo: string;
    nombre: string;
    categoria: string;
  }
  
  // Acciones
  setTabActiva: (tab: string) => void
  setFiltro: (campo: 'codigo' | 'nombre' | 'categoria', valor: string) => void
}

export const createInventorySlice: StateCreator<InventorySlice> = (set) => ({
  productos: [], 
  tabActiva: 'general',
  
  filtros: {
    codigo: '',
    nombre: '',
    categoria: '',
  },

  setTabActiva: (tab) => set({ tabActiva: tab }),
  
  // Acción dinámica para actualizar cualquier filtro
  setFiltro: (campo, valor) => set((state) => ({
    filtros: {
      ...state.filtros,
      [campo]: valor
    }
  })),
})