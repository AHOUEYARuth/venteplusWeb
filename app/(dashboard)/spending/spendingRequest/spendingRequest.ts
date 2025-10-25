import { HttpClient } from "@/lib/httpClient";

export const createExpenseRequest = async (expenseData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "expenses",
    payload: expenseData,
  });
};

export const deleteExpenseRequest = async (expenseId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `expenses/${expenseId}`,
  });
};

export const getExpensesRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `expenses/shop/${shopId}`,
  });
}

