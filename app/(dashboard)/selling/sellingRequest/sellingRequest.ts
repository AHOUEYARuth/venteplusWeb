import { HttpClient } from "@/lib/httpClient";

export const createSellingRequest = async (orderData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "orders",
    payload: orderData,
  });
};

export const deleteSellingRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `orders/${orderId}`,
  });
};

export const getSellingsRequest = async (shopId, isPaid) => {
   const params = new URLSearchParams("");
   if (isPaid != null) params.append("isPaid", isPaid);
  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/shop/${shopId}`,
  });
};

export const updateSellingRequest = async (orderId, payload) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `orders/${orderId}`,
    payload: payload,
  });
};