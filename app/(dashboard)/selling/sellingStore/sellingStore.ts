import { create } from "zustand";
import axios from "axios";

type Commande = {
  id: number;
  client: string;
  phoneNumber: string;
  email: string;
  product: string;
  quantity: number;
  taille: string;
  unitPrice: number;
  totalPrice: number;
  deliveryAddress: string;
  status: string;
  orderDate: string;
};

type Vente = {
  id: number;
  product: string;
  quantitySold: number;
  taille: string;
  unitPrice: number;
  purchasePrice: number;
  totalRevenue: number;
  totalProfit: number;
  saleDate: string;
};

type DataStore = {
  commandes: Commande[];
  ventes: Vente[];
  activeMenu: string;
  fetchData: () => Promise<void>;
  setActiveMenu: (activeMenu: string) => void;
};

export const sellingStore = create<DataStore>((set) => ({
  commandes: [],
  ventes: [],
  activeMenu: "commandes",
  setActiveMenu: (activeMenu) => set({ activeMenu }),
  fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        commandes: response.data.commandes,
        ventes: response.data.ventes,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  },
}));
