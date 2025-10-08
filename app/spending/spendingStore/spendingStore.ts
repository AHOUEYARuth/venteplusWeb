import { create } from "zustand";
import { getSpendings } from "../spendingRequest/spendingRequest";

type State = {
    name: string,
    date: Date
}

type SpendingActions = {
    showSpendingDetails: (name: string, date: Date) => string
}

export const spendingStore = create<State & SpendingActions>((set) => ({
    name: "Achat de deux cartons de petits poids",
    date: new Date(),
    showSpendingDetails(name, date) {
        return `Le ${date.toString()}, ${name}`;
    },
}))