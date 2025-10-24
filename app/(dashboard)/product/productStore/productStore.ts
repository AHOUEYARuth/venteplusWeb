/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { createCategoryRequest, createProductRequest, deleteCategoriesRequest, deleteProductRequest, getCategoriesRequest, getPoductsRequest, getProductsByCategoryRequest } from "../productRequest/productRequest";
 
type State = {
  open: boolean;
  categories: Array<any>;
  products: Array<any>;
  selectedCategory: string; 
  filteredProducts: Array<any>;
};

type ProductActions = {
  setOpen: () => void;
  categoryAction: (categoryFormData: any) => Promise<void>;
  getCategoriesAction: (shopId: string) => Promise<void>;
  setCategories: (categories: any) => void;
  deleteCategoryAction: (catId: string) => Promise<void>;
  createProductAction: (productFormData: any) => Promise<void>;
  getProductsActions: (shopId: string) => Promise<void>;
  setProducts: (products: any) => void;
  deleteProductAction: (productId: string) => Promise<void>;
  filterProductsByCategory: (categoryId: string) => Promise<void>;
  clearCategoryFilter: () => void;
  setSelectedCategory: (categoryId: string) => void;
};

export const useProductStore = create<State & ProductActions>((set) => ({
  open: false,
  categories: [],
  products: [],
  selectedCategory: "",
  filteredProducts: [],
  setOpen: () => set((state) => ({ open: !state.open })),
  categoryAction: async (categoryFormData) => {
    const response = await createCategoryRequest(categoryFormData);
    return response;
  },
  getCategoriesAction: async (shopId) => {
    const response = await getCategoriesRequest(shopId);
    return response;
  },
  setCategories(categories) {
    set({ categories: categories });
  },
  deleteCategoryAction: async (catId) => {
    const response = await deleteCategoriesRequest(catId);
    return response;
  },
  createProductAction: async (productFormData) => {
    const response = await createProductRequest(productFormData);
    return response;
  },
  getProductsActions: async (shopId) => {
    const response = await getPoductsRequest(shopId);
    return response;
  },
  setProducts: (products) => set((state) => ({ products: products })),

  deleteProductAction: async (productId) => {
    const response = await deleteProductRequest(productId);
    return response;
  },
  filterProductsByCategory: async (categoryId) => {
    if (!categoryId) {
      set({ filteredProducts: [], selectedCategory: "" });
      return;
    }

    try {
      const response = await getProductsByCategoryRequest(categoryId);
      set({
        filteredProducts: response.data,
        selectedCategory: categoryId,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  clearCategoryFilter: () => {
    set({
      filteredProducts: [],
      selectedCategory: "",
    });
  },

  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
}));

