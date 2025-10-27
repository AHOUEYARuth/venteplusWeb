/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createSellingRequest, deleteSellingRequest, getStatsRequest,getSellingsRequest, updateSellingRequest } from "../sellingRequest/sellingRequest";

type State = {
  orders: Array<any>;
  sellings: Array<any>;
  editedOrder: any;
  orderStatistics:any;
  stats:any;
};

type SellingAction = {
  activeMenu: string;
  /* fetchData: () => Promise<void>; */
  setStats: (stats: any)=> void;
  setActiveMenu: (activeMenu: string) => void;
  orderAction: (orderFormData: any) => Promise<void>;
  getStatsAction:(shopId:string)=> Promise<void>;
  getOrdersAndSellingsAction: (
    shopId: string,
    isSale: boolean
  ) => Promise<void>;
  setOrderStatistics:(orderStatistics:any) => void;
  setSellings: (orders: any) => void;
  deleteSellingsAction: (orderId: string) => Promise<void>;
  updateSellingAction: (orderId: string, payload: any) => Promise<void>;
  setOrders: (orders: any) => void;
  setEditingOrder: (editedOrder: any) => void;
};

export const useSellingStore = create<State & SellingAction>((set) => ({
  orders: [],
  sellings: [],
  stats:null,
  activeMenu: "commandes",
  editedOrder: null,
  orderStatistics:null,
  setOrderStatistics:(orderStatistics) => set({orderStatistics}),
  setActiveMenu: (activeMenu) => set({ activeMenu }),
  setStats: (stats)=> set({stats}),
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
  getOrdersAndSellingsAction: async (shopId, isSale) => {
    const response = await getSellingsRequest(shopId, isSale);
    set({ orderStatistics: response.statistics });
    return response;
  },
  getStatsAction: async (shopId) => {
    const response = await getStatsRequest(shopId);
    set({ stats: response.data });
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
