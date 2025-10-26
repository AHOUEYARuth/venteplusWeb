/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getCustomerCreditsRequest } from "../customerCreditsRequest/customerCreditsRequest";

type State = {
  customersCredits: Array<any>;
};

type SellingAction = {
  setCustomersCredits: (customersCredits: Array<any>) => void;
  getCustomersCreditsAction: (
    shopId: string
  ) => Promise<void>;
  
};

export const useCustomerCreditsStore = create<State & SellingAction>((set) => ({
  customersCredits: [],
  setCustomersCredits: (customersCredits) => set({ customersCredits }),
  getCustomersCreditsAction: async (shopId) => {
    const response = await getCustomerCreditsRequest(shopId);
    set({ customersCredits: response.data });
    return response
  },
}));
