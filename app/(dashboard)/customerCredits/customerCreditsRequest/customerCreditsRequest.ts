import { HttpClient } from "@/lib/httpClient";


export const getCustomerCreditsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `customer-credits/shop/${shopId}`,
  });
};
