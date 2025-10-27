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
export const filterSpendingRequest = async (
  shopId,
  dateFrom,
  dateTo
) => {
  const params = new URLSearchParams("");
  if(dateFrom) params.append("dateFrom", dateFrom);
  if(dateTo) params.append("dateTo", dateTo);
  
  return HttpClient.makeRequest({
    method: "GET",
    url: `expenses/shop/${shopId}`,
    searchParams:params
  });
};
