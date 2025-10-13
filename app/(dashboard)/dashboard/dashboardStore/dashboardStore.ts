import { create } from "zustand";
import { getProduct } from "../dashboardRequest/dashboardRequest";


type State = {
    name: string,
}

type DashboardAtions = {
    showProduct: (name: string) => string
}

export const dashboardStore = create<State & DashboardAtions>((set) => ({
  name: "Yaourt Olé",
  showProduct(name) {
    return `${name} est stock faible`;
  },
}));