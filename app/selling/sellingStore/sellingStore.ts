import { create } from "zustand";
import { getSellings } from "../sellingRequest/sellingRequest";

type State = {
    name: string,
    details: string
}

type SellingActions = {
    showSellingsDetails: (name: string, details: string) => string
}

export const sellingStore = create<State & SellingActions>((set) => ({
    name: "Vente du jour",
    details: "Vente de 10 boîtes de lait concenté",
    showSellingsDetails(name, details) {
      return `${name} : ${details}`
    },
}));