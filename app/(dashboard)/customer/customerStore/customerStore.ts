import { create } from "zustand";
import axios from "axios";

type State = {
  id: number;
  name: string;
  firstName: string;
    phoneNumber: string;
    createdDate: string;
};

type DataStore = {
  customers: State[];
  fetchData: () => Promise<void>;
};

export const customerStore = create<DataStore>((set) => ({
  customers: [],
  fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        customers: response.data.customers,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  },
}));
