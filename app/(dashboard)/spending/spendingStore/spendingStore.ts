import { create } from "zustand";
import { getSpendings } from "../spendingRequest/spendingRequest";
import axios from "axios";

type Spending = {
  id: number;
  label: string;
  amount: number;
  date: string;
  description: string;
};

type DataStore = {
    spendings: Spending[];
    fetchData: () => Promise<void>;
}

export const spendingStore = create<DataStore>((set) => ({
    spendings: [],
    fetchData: async () => {
        try {
            const response = await axios.get("/fakeData.json");
            set({
              spendings: response.data.spending,
            });
        } catch (error) {
            console.log("Erreur de chargement des données", error);
            
        }
    }
}))
