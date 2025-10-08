import { create } from "zustand";
import { getPricings } from "../pricingRequest/princingRequest";

type State = {
    type: string,
    price: number,
}

type PrincingAtions = {
    showPrincing: (type: string, price: number) => string
}

export const princingStore = create<State & PrincingAtions>((set) => ({
  type: "Premium",
  price: 10,
  showPrincing(type, price) {
    return `Vente+ ${type} : ${price}`;
  },
}));