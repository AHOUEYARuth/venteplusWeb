/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  createSellingRequest,
  getDaysStatsRequest,
  getStatsRequest,
  getSellingsRequest,
  updateSellingRequest,
  deleteOrderRequest,
  cancelOrderRequest,
  filterOrderAndSellingRequest,
  confirmOrderRequest,
  paidOrderRequest,
  deliverOrderRequest,
  deliverSellingRequest,
} from "../sellingRequest/sellingRequest";

type State = {
  orders: Array<any>;
  sellings: Array<any>;
  editedOrder: any;
  orderStatistics: any;
  stats: any;
  daysStats: any;
};

type SellingAction = {
  activeMenu: string;
  /* fetchData: () => Promise<void>; */
  setStats: (stats: any) => void;
  setDaysStats: (daysStats: any) => void;
  setActiveMenu: (activeMenu: string) => void;
  orderAction: (orderFormData: any) => Promise<void>;
  getStatsAction: (shopId: string) => Promise<void>;
  getDaysStatsAction: (shopId: string) => Promise<void>;
  getOrdersAndSellingsAction: (
    shopId: string,
    isSale: boolean
  ) => Promise<void>;
  setOrderStatistics: (orderStatistics: any) => void;
  setSellings: (orders: any) => void;
  cancelOrderAction: (orderId: string) => Promise<void>;
  deleteOrderAction: (orderId: string) => Promise<void>;
  updateSellingAction: (orderId: string, payload: any) => Promise<void>;
  setOrders: (orders: any) => void;
  setEditingOrder: (editedOrder: any) => void;
  filterOrderAndSellingAction: (
    shopId: string,
    search: string,
    dateFrom: string,
    dateTo: string,
    isSale: boolean,
    status: string
  ) => Promise<void>;
  confirmOrderAction: (orderId: string) => Promise<void>;
  paidOrderAction: (orderId: string) => Promise<void>;
  deliverOrderAction: (orderId: string) => Promise<void>;
  deliverSellingAction: (orderId: string) => Promise<void>;
};

export const useSellingStore = create<State & SellingAction>((set) => ({
  orders: [],
  sellings: [],
  stats: null,
  daysStats: null,
  activeMenu: "commandes",
  editedOrder: null,
  orderStatistics: null,
  setOrderStatistics: (orderStatistics) => set({ orderStatistics }),
  setActiveMenu: (activeMenu) => set({ activeMenu }),
  setStats: (stats) => set({ stats }),
  setDaysStats: (daysStats) => set({ daysStats }),
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
  getDaysStatsAction: async (shopId) => {
    const response = await getDaysStatsRequest(shopId);
    set({ daysStats: response.data });
    return response;
  },
  setSellings: (sellings) => {
    set({ sellings: sellings });
  },
  setOrders: (orders) => {
    set({ orders: orders });
  },
  cancelOrderAction: async (orderId) => {
    const response = await cancelOrderRequest(orderId);
    return response;
  },
  deleteOrderAction: async (orderId) => {
    const response = await deleteOrderRequest(orderId);
    return response;
  },
  updateSellingAction: async (orderId, payload) => {
    const response = await updateSellingRequest(orderId, payload);
    return response;
  },
  setEditingOrder: (editedOrder) => {
    set({ editedOrder: editedOrder });
  },

  filterOrderAndSellingAction: async (
    shopId,
    search,
    dateFrom,
    dateTo,
    status,
    isSale
  ) => {
    if (!shopId) {
      return;
    }

    const response = await filterOrderAndSellingRequest(
      shopId,
      search,
      dateFrom,
      dateTo,
      status,
      isSale
    );
    return response;
  },
  confirmOrderAction: async (orderId) => {
    const response = await confirmOrderRequest(orderId);
    return response;
  },
  paidOrderAction: async (orderId) => {
    const response = await paidOrderRequest(orderId);
    return response;
  },
  deliverOrderAction: async (orderId) => {
    const response = await deliverOrderRequest(orderId);
    return response;
  },
  deliverSellingAction: async (orderId) => {
    const response = await deliverOrderRequest(orderId,);
    return response;
  },
}));
