import { HttpClient } from "@/lib/httpClient";


export const getTopProductsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `products/top-selling/${shopId}`,
  });
};
export const getMonthSellingsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/month-sales/${shopId}`,
  });
};
 
export const getStatRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `stats/dashboard/${shopId}`,
  });
};