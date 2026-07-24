import { useState, useMemo } from 'react'
import { type Product, type Category } from '../types'

export function useProductFilter(initialProducts: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchCode, setSearchCode] = useState('')
  const [searchName, setSearchName] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Prioridad: Filtrar por Categoría
    if (selectedCategory) {
      result = result.filter(p => p.categoria === selectedCategory)
    } 
    // 2. Si no hay categoría, habilitar búsqueda por Código y Nombre
    else {
      if (searchCode) {
        result = result.filter(p => 
          p.id.toLowerCase().includes(searchCode.toLowerCase())
        )
      }
      if (searchName) {
        result = result.filter(p => 
          p.nombre.toLowerCase().includes(searchName.toLowerCase())
        )
      }
    }

    // 3. Ordenamiento por nombre
    result.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.nombre.localeCompare(b.nombre) 
        : b.nombre.localeCompare(a.nombre)
    })

    return result
  }, [initialProducts, selectedCategory, searchCode, searchName, sortOrder])

  return {
    // Estados
    selectedCategory,
    searchCode,
    searchName,
    sortOrder,
    // Resultados
    filteredProducts,
    // Funciones para actualizar
    setSelectedCategory,
    setSearchCode,
    setSearchName,
    toggleSortOrder: () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }
}