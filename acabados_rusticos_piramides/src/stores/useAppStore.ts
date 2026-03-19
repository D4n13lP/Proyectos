import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createInventorySlice, type InventorySlice } from './inventorySlice'
import { createMetricsSlice, type MetricsSlice } from './metricsSlice'
import { createProductSlice, type ProductSlice } from './productSlice'
// ... otros imports de slices

// Combinamos todos los tipos de los Slices
type StoreState = InventorySlice & MetricsSlice & ProductSlice // Añadimos ProductSlice aquí

export const useAppStore = create<StoreState>()(devtools((...a) => ({
  ...createInventorySlice(...a),
  ...createMetricsSlice(...a),
  ...createProductSlice(...a),
  // ... esparce los otros slices aquí
})))