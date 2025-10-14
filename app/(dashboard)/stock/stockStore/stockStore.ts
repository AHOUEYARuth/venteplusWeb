import { create } from "zustand";
import { getStocks } from "../stockRequest/stockRequest";

type State = {
    product: string,
    available: number,
}

type StockAtions = {
    showStockDetails: (product: string, available: number) => string
}

export const stockStore = create<State & StockAtions>((set) => ({
    product: "Yaourt olé",
    available: 200,
    showStockDetails(product, available) {
        return `Page stock: la quantité disponible de produit ${product} est : ${available}`
    }
}))