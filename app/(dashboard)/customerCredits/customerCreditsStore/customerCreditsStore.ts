/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getCustomerCreditsRequest,createRecoveryRequest,filterCreditsRequest ,getRecoveryCreditRequest} from "../customerCreditsRequest/customerCreditsRequest";

type State = {
  customersCredits: Array<any>;
  recoveries: Array<any>;
};

type SellingAction = {
  setCustomersCredits: (customersCredits: Array<any>) => void;
  getCustomersCreditsAction: (shopId: string) => Promise<void>;
  getRecoveryCreditAction: (customerCreditId: string) => Promise<any>;
  setRecoveries: (recoveries: Array<any>) => void;
  filterCreditsAction: (
    shopId: string,
    name: string,
    dateFrom: string,
    dateTo: string
  ) => Promise<void>;
  createRecoveryAction: (payload: any) => Promise<any>;
};

export const useCustomerCreditsStore = create<State & SellingAction>((set) => ({
  customersCredits: [],
  recoveries: [],

  setCustomersCredits: (customersCredits) => set({ customersCredits }),
  setRecoveries: (recoveries) => set({ recoveries }),
  getCustomersCreditsAction: async (shopId) => {
    const response = await getCustomerCreditsRequest(shopId);
    set({ customersCredits: response.data });
    return response
  },
  getRecoveryCreditAction: async (customerCreditId) => {
    const response = await getRecoveryCreditRequest(customerCreditId);
    set({ recoveries: response.data });
    return response
  },
  createRecoveryAction: async (payload) => {
    const response = await createRecoveryRequest(payload);
    return response;
  },
  filterCreditsAction: async (shopId, name, dateFrom, dateTo) => {
        if (!shopId) {
          return;
        }
    
        const response = await filterCreditsRequest(
          shopId,
          name,
          dateFrom,
          dateTo
        );
        return response;
    },
}));
