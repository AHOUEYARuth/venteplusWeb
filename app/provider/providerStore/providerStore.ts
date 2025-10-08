import { create } from "zustand";
import { getProviders } from "../providerRequest/providerRequest";

type State = {
    name: string,
    address: string
}

type ProviderActions = {
    showProvider: (name: string, address: string) => string
}

export const providerStore = create<State & ProviderActions>((set) => ({
    name: "Maurille Four",
    address: "Calavi, kpota",
    showProvider(name, address) {
        return `Le fournisseur ${name}, réside à ${address}`
    },
}))