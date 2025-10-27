import { HttpClient } from "@/lib/httpClient";

export const createSellingRequest = async (orderData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "orders",
    payload: orderData,
  });
};

export const deleteOrderRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `orders/${orderId}`,
  });
};

export const cancelOrderRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "PUT",
    url: `orders/cancel/${orderId}`,
  });
};

export const getSellingsRequest = async (shopId, isSale) => {
   const params = new URLSearchParams("");
   if (isSale != null) params.append("isSale", JSON.stringify(isSale));
  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/shop/${shopId}`,
    searchParams: params,
  });
};

export const getStatsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/statistics/${shopId}`,
  });
};

export const updateSellingRequest = async (orderId, payload) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `orders/${orderId}`,
    payload: payload,
  });
};