import { z } from "zod";

// Esquema para una categoría individual
export const CategorySchema = z.string();

// Esquema para la respuesta de categorías
export const CategoriesAPIResponseSchema = z.array(CategorySchema);

// Esquema para un Producto (Adaptado de tu lógica de Recipe/Drink)
export const ProductSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  imagenes: z.array(z.string()).max(5), // Cambiado a arreglo de hasta 5
  precio: z.number(),
  categoria: z.string(),
  descripcion: z.string().optional()
});

// Tipos basados en los esquemas
export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.array(ProductSchema);

// Esquema para búsquedas (similar a SearchRecipeSchema)
export const SearchProductSchema = z.object({
  codigo: z.string(),
  nombre: z.string()
});
export type SearchProduct = z.infer<typeof SearchProductSchema>;