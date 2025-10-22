/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { createCategory } from "../productRequest/productRequest";

type State = {
  open: boolean;
  categories: Array<string>;
};

type ProductActions = {
  setOpen: () => void;
  categoryAction: (categoryFormData: any) => Promise<void>;
};

export const productStore = create<State & ProductActions>((set) => ({
  open: false,
  categories: [],
  setOpen: () => set((state) => ({ open: !state.open })),
  categoryAction: async (categoryFormData) => {
    const response = await createCategory(categoryFormData);
    return response
  },
}));
