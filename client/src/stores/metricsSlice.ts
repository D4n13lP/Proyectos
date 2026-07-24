import { type StateCreator } from 'zustand'

export interface MetricTableItem {
  id: number;
  producto: string;
  cantidad: number;
  importe?: number;
  tiempo?: string;
}

export interface MetricsSlice {
  // Datos de las tarjetas
  stats: {
    ventas: number;
    pedidos: number;
    rezagados: number;
  };
  // Datos de las tablas
  masVendidos: MetricTableItem[];
  recienLlegados: MetricTableItem[];
  productosRezagados: MetricTableItem[];
  ultimasVentas: MetricTableItem[];
}

export const createMetricsSlice: StateCreator<MetricsSlice> = (set) => ({
  stats: { ventas: 0, pedidos: 0, rezagados: 0 },
  masVendidos: [],
  recienLlegados: [],
  productosRezagados: [],
  ultimasVentas: [],
  // Aquí añadirás las funciones fetchMetrics() más adelante
})