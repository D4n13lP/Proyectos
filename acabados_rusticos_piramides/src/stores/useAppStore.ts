import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createInventorySlice, type InventorySlice } from './inventorySlice'
// ... otros imports de slices

// Combinamos todos los tipos de los Slices
type StoreState = InventorySlice & any // Añade aquí los otros tipos como FavoritesSlice

export const useAppStore = create<StoreState>()(devtools((...a) => ({
  ...createInventorySlice(...a),
  
  // ... esparce los otros slices aquí
})))