/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import axios from "axios";
import { createCustomerRequest,filterCustomersRequest, deleteCustomerRequest, getCustomersRequest } from "../customerRequest/customerRequest";

type State = {
  customers: Array<any>
};

type CustomerActions = {
  customerAction: (customerFormData: any) => Promise<void>;
  getCustomersAction: (shopId: string) => Promise<void>;
  setCustomers: (customers: any) => void;
  filterCustomerAction: (
    shopId: string,
    name: string,
    dateFrom: string,
    dateTo: string
  ) => Promise<void>;
  deleteCustomersAction: (catId: string) => Promise<void>;
};

export const customerStore = create<State & CustomerActions>((set) => ({
  customers: [],
  customerAction: async (customerFormData) => {
    const response = await createCustomerRequest(customerFormData);
    return response;
  },
  getCustomersAction: async (shopId) => {
    const response = await getCustomersRequest(shopId);
    return response;
  },
  setCustomers(customers) {
    set({ customers: customers });
  },
  deleteCustomersAction: async (customerId) => {
    const response = await deleteCustomerRequest(customerId);
    return response;
  },
  filterCustomerAction: async (shopId, name, dateFrom, dateTo) => {
      if (!shopId) {
        return;
      }
  
      const response = await filterCustomersRequest(
        shopId,
        name,
        dateFrom,
        dateTo
      );
      return response;
    },
}));
