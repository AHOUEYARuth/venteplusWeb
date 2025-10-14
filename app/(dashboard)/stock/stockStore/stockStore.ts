import { create } from "zustand";
import { getStocks } from "../stockRequest/stockRequest";
import axios from "axios";

type State = {
  id: number;
  stockName: string;
  product: string;
  qteInStock: number;
  minQte: number;
};

type DataStore = {
  stocks: State[];
  fetchData: () => Promise<void>;
};

export const stockStore = create<DataStore>((set) => ({
  stocks: [],
  fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        stocks: response.data.stocks,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  },
}));
