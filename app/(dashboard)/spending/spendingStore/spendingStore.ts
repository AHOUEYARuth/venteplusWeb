/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import axios from "axios";
import { createExpenseRequest, getExpensesRequest } from "../spendingRequest/spendingRequest";

type Sate = {
  spendings: Array<any> ;
};

type ExpenseAction = {
  expenseActions: (expenseFormData: any) => Promise<void>;
  getExpenseAction: (shopId: string) => Promise<void>;
  setExpenses: (spendings: any) => void;
};

export const spendingStore = create<Sate & ExpenseAction>((set) => ({
  spendings: [],
  expenseActions: async (expenseFormData) => {
    const response = await createExpenseRequest(expenseFormData);
    return response;
  },
  getExpenseAction: async (shopId) => {
    const response = await getExpensesRequest(shopId);
    return response;
  },
  setExpenses(spendings) {
    set({ spendings: spendings });
  },
}));
