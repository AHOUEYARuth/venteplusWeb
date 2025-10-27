/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getTopProductsRequest, getMonthSellingsRequest } from "../dashboardRequest/dashboardRequest";

type State = {
  topProducts: Array<any>;
  monthSelling:Array<any>;
 
};

type Action = {
  setTopProducts: (topProducts: any)=> void;
  setMonthSelling: (monthSelling: any)=> void;
  getTopProductsAction: (shopId: string)=> Promise<void>;
  getMonthSellingsAction:(shopId: string)=> Promise<void>;
};

export const useDashboardStore = create<State & Action>((set) => ({
  topProducts: [],
  monthSelling: [],

  setTopProducts:(topProducts) => set({topProducts}),
  setMonthSelling: (monthSelling) => set({ monthSelling }),
 
  getTopProductsAction: async (shopId) => {
    const response = await getTopProductsRequest(shopId);
    set({ topProducts: response.data });
    return response;
  },
  getMonthSellingsAction: async (shopId) => {
    const response = await getMonthSellingsRequest(shopId);
    set({ monthSelling: response.data });
    return response;
  }, 
}));
