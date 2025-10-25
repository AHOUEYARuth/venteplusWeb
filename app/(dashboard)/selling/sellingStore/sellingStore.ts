/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createSellingRequest, deleteSellingRequest, getSellingsRequest, updateSellingRequest } from "../sellingRequest/sellingRequest";

type State = {
  orders: Array<any>;
  sellings: Array<any>;
  editedOrder: any;
};

type SellingAction = {
  activeMenu: string;
  /* fetchData: () => Promise<void>; */
  setActiveMenu: (activeMenu: string) => void;
  orderAction: (orderFormData: any) => Promise<void>;
  getOrdersAndSellingsAction: (
    shopId: string,
    isPaid: boolean
  ) => Promise<void>;
  setSellings: (orders: any) => void;
  deleteSellingsAction: (orderId: string) => Promise<void>;
  updateSellingAction: (orderId: string, payload: any) => Promise<void>;
  setOrders: (orders: any) => void;
  setEditingOrder: (editedOrder: any) => void;
};

export const useSellingStore = create<State & SellingAction>((set) => ({
  orders: [],
  sellings: [],
  activeMenu: "commandes",
  editedOrder: null,
  setActiveMenu: (activeMenu) => set({ activeMenu }),
  /* fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        commandes: response.data.commandes,
        ventes: response.data.ventes,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  }, */
  orderAction: async (orderFormData) => {
    const response = await createSellingRequest(orderFormData);
    return response;
  },
  getOrdersAndSellingsAction: async (shopId, isPaid) => {
    const response = await getSellingsRequest(shopId, isPaid);
    return response;
  },
  setSellings: (sellings) => {
    set({ sellings: sellings });
  },
  setOrders: (orders) => {
    set({ orders: orders });
  },
  deleteSellingsAction: async (orderId) => {
    const response = await deleteSellingRequest(orderId);
    return response;
  },
  updateSellingAction: async (orderId, payload) => {
    const response = await updateSellingRequest(orderId, payload);
    return response;
  },
  setEditingOrder: (editedOrder) => {
    set({ editedOrder: editedOrder });
  },
}));
