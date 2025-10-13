import { create } from "zustand";

type State = {
  open: boolean;
};

type ProductActions = {
  setOpen: () => void;
};

export const productStore = create<State & ProductActions>((set) => ({
  open: false, 
  setOpen: () => set((state) => ({ open: !state.open })),
}));
