import { create } from "zustand";
import { getServices } from "../servicesRequest/servicesRequest";

type State = {
    name: string,
    description: string
}

type ServicesActions = {
    showService: (name: string, description: string) => string
}

export const servicesStore = create<State & ServicesActions>((set) => ({
    name: "Gestion de stock",
    description: "Vente+ vous facilite la gestion de vos stocks de produits en vous offrant les possibilités de : ajouter, modifier et supprimer un produit",
    showService(name, description) {
        return `${name} : ${description}`
    },
}))