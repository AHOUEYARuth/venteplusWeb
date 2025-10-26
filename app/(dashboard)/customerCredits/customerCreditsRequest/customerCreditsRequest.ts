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
