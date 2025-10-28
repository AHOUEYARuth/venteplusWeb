/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  getEmployeeRequest,
  validateEmployeeAccountRequest,
  blockedEmployeeAccountRequest,
  filterEmployeeRequest,
} from "../employeeRequest/employeeRequest";

type State = {
  employees: Array<any>;
};

type EmployeeAction = {
  getEmployeeAction: (shopId: string) => Promise<void>;
  setEmployees: (employees: any) => void;
  validateEmployeAccountAction: (
    traderId: string,
    shopId: string
  ) => Promise<void>;
  blockedEmployeeAction: (traderId: string, shopId: string) => Promise<void>;
  filterEmployeeAction: (
    shopId: string,
    name: string,
    dateFrom: string,
    dateTo: string
  ) => Promise<void>;
};

export const employeeStore = create<State & EmployeeAction>((set) => ({
  employees: [],
  getEmployeeAction: async (shopId) => {
    const response = await getEmployeeRequest(shopId);
    return response;
  },
  setEmployees(employees) {
    set({ employees: employees });
  },
  validateEmployeAccountAction: async (traderId, shopId) => {
    const response = await validateEmployeeAccountRequest(traderId, shopId);
    return response;
  },
  blockedEmployeeAction: async (traderId, shopId) => {
    const response = await blockedEmployeeAccountRequest(traderId, shopId);
    return response;
  },
  filterEmployeeAction: async (shopId, name, dateFrom, dateTo) => {
    if (!shopId) {
      return;
    }

    const response = await filterEmployeeRequest(
      shopId,
      name,
      dateFrom,
      dateTo
    );
    return response;
  },
}));
