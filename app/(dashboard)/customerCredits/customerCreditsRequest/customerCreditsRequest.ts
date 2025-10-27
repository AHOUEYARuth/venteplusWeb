import { HttpClient } from "@/lib/httpClient";


export const getCustomerCreditsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `customer-credits/shop/${shopId}`,
  });
};

export const getRecoveryCreditRequest = async (customerCreditId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `recoveries/${customerCreditId}`,
  });
};

export const createRecoveryRequest = async (payload) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `recoveries`,
    payload,
  });
};
export const filterCreditsRequest = async (
  shopId,
  name,
  dateFrom,
  dateTo
) => {
  const params = new URLSearchParams("");
  if(name != "") params.append("name", name);
  if(dateFrom) params.append("dateFrom", dateFrom);
  if(dateTo) params.append("dateTo", dateTo);
  
  return HttpClient.makeRequest({
    method: "GET",
    url: `customer-credits/shop/${shopId}`,
    searchParams:params
  });
};