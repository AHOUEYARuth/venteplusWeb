import { create } from "zustand";
import { getPlans } from "../customerCreditsRequest/customerCreditsRequest";
import axios from "axios";

type State = {
  id: number;
  client: string;
  phoneNumber: string;
  email: string;
  product: string;
  quantity: number;
  taille: string;
  unitPrice: number;
  totalPrice: number;
  status: string;
  orderDate: string;
};

type DataStore = {
  customersCredits: State[];
  fetchData: () => Promise<void>;
};

export const customerCredits = create<DataStore>((set) => ({
  customersCredits: [],
  fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        customersCredits: response.data.dettes,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  },
})); 