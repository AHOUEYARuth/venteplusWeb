import { HttpClient } from "@/lib/httpClient";

export const getEmployeeRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `traders/shop/${shopId}`,
  });
};

export const validateEmployeeAccountRequest = async (traderId, shopId) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `traders/validate-employee/${traderId}`,
    payload: { shopId },
  });
};
 
export const blockedEmployeeAccountRequest = async (traderId, shopId) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `traders/blocked-employee/${traderId}`,
    payload: { shopId },
  });
};

export const filterEmployeeRequest = async (
  shopId,
  name,
  dateFrom,
  dateTo
) => {
  const params = new URLSearchParams("");
  if (name != "") params.append("name", name);
  if (dateFrom) params.append("dateFrom", dateFrom);
  if (dateTo) params.append("dateTo", dateTo);

  return HttpClient.makeRequest({
    method: "GET",
    url: `traders/shop/${shopId}`,
    searchParams: params,
  });
};

