import { create } from "zustand";
import { getShops } from "../shopRequest/shopRequest";

type State = {
    name: string,
    location: string
}

type ShopActions = {
    showShopDetails: (name: string, location: string) => string
}

export const shopStore = create<State & ShopActions>((set) => ({
    name: "Amra Store",
    location: "cotonou, cadjehoun",
    showShopDetails(name, location) {
        return `La boutique ${name} est à ${location}`
    },
}))