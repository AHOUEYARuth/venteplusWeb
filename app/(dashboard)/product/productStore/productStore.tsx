/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { createCategoryRequest, createProductRequest, deleteCategoriesRequest, getCategoriesRequest, getPoductsRequest } from "../productRequest/productRequest";
 
type State = {
  open: boolean;
  categories: Array<string>;
  products: any;
};

type ProductActions = {
  setOpen: () => void;
  categoryAction: (categoryFormData: any) => Promise<void>;
  getCategoriesAction: (shopId: string) => Promise<void>;
  setCategories: (categories: any) => void;
  deleteCategoriesAction: (catId: string) => Promise<void>;
  createProductAction: (productFormData: any) => Promise<void>;
  getProductsActions: (shopId: string) => Promise<void>;
  setProducts: (products: any) => void;
};

export const useProductStore = create<State & ProductActions>((set) => ({
  open: false,
  categories: [],
  products: [],
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
  deleteCategoriesAction: async (catId) => {
    const response = await deleteCategoriesRequest(catId);
    return response;
  },
  createProductAction: async (productFormData) => {
    const response = await createProductRequest(productFormData);
    return response
  },
  getProductsActions: async(shopId) => {
    const response = await getPoductsRequest(shopId);
    return response;
  },
  setProducts: (products) => set((state) => ({ products: products })),
 
}));

