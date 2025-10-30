/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getTopProductsRequest, getMonthSellingsRequest, getStatRequest } from "../dashboardRequest/dashboardRequest";

type State = {
  topProducts: Array<any>;
  monthSelling:Array<any>;
  monthSaleTotal:any;
  monthSaleProfitTotal: any;
  stats: Array<any>;
};

type Action = {
  setTopProducts: (topProducts: any) => void;
  setMonthSelling: (monthSelling: any) => void;
  getTopProductsAction: (shopId: string) => Promise<void>;
  getMonthSellingsAction: (shopId: string) => Promise<void>;
  getStatsAction: (shopId: string) => Promise<any>;
  setStats: (stats: any) => void;
};

export const useDashboardStore = create<State & Action>((set) => ({
  topProducts: [],
  monthSelling: [],
  monthSaleTotal: 0,
  monthSaleProfitTotal: 0,
  stats: [],
  setTopProducts: (topProducts) => set({ topProducts }),
  setMonthSelling: (monthSelling) => set({ monthSelling }),
  setStats: (stats) => set({ stats }),

  getTopProductsAction: async (shopId) => {
    const response = await getTopProductsRequest(shopId);
    set({ topProducts: response.data });
    return response;
  },
  getMonthSellingsAction: async (shopId) => {
    const response = await getMonthSellingsRequest(shopId);
    set({ monthSelling: response.data });
    let monthSellingTotal = 0;
    let monthTotalProfit = 0;
    response.data.forEach((sale: any) => {
      monthSellingTotal += sale?.totalAmount;
      monthTotalProfit += sale?.profit;
    });
    set({ monthSaleTotal: monthSellingTotal });
    set({ monthSaleProfitTotal: monthTotalProfit });
    return response;
  },
  getStatsAction: async (shopId) => {
    const response = await getStatRequest(shopId);
    return response
  },
}));
