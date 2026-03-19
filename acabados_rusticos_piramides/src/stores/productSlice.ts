import type { StateCreator } from 'zustand'
import type { Category, Product } from '../types'

export interface ProductSlice {
  products: Product[]
  categories: Category[]
  selectedCategory: Category | null
  isModalOpen: boolean
  selectedProduct: Product | null // Usamos el tipo Product de tu index.ts
  updateProductImage: (index: number, newUrl: string) => void
  // Acciones
  setProducts: (products: Product[]) => void
  setCategories: (categories: Category[]) => void
  setSelectedCategory: (category: Category | null) => void
  openModal: (product: Product) => void
  closeModal: () => void
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  categories: [],
  selectedCategory: null,
  isModalOpen: false,
  selectedProduct: null,

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  openModal: (product) => set({ isModalOpen: true, selectedProduct: product }),
  closeModal: () => set({ isModalOpen: false, selectedProduct: null }),

  // Acción para actualizar una imagen específica en el store (simulación BD)
  updateProductImage: (index: number, newUrl: string) => set((state) => {
    if (!state.selectedProduct) return state;
    const nuevasImagenes = [...state.selectedProduct.imagenes];
    nuevasImagenes[index] = newUrl;
    return {
      selectedProduct: { ...state.selectedProduct, imagenes: nuevasImagenes }
    };
  }),
})