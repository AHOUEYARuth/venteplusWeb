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

export const getDaysStatsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/days-statistics/${shopId}`,
  });
};

export const updateSellingRequest = async (orderId, payload) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: `orders/${orderId}`,
    payload: payload,
  });
};


export const filterOrderAndSellingRequest = async (
  shopId,
  search,
  dateFrom,
  dateTo,
  status,
  isSale,
) => {
  const params = new URLSearchParams("");
  if (status) params.append("status", status);
  if (search) params.append("search", search);
  if (isSale) params.append("isSale", isSale);
  if (dateFrom) params.append("dateFrom", dateFrom);
  if (dateTo) params.append("dateTo", dateTo);


  return HttpClient.makeRequest({
    method: "GET",
    url: `orders/shop/${shopId}`,
    searchParams: params,
  });
};

export const confirmOrderRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "PUT",
    url: `orders/confirm/${orderId}`,
  });
};

export const paidOrderRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "PUT",
    url: `orders/pay/${orderId}`,
  });
};

export const deliverOrderRequest = async (orderId) => {
  return HttpClient.makeRequest({
    method: "PUT",
    url: `orders/delivered/${orderId}`,
  });
};

export const deliverSellingRequest = async (orderId, isSale) => {
  const params = new URLSearchParams("");
  if (isSale != null) params.append("isSale", JSON.stringify(isSale));
  return HttpClient.makeRequest({
    method: "PUT",
    url: `orders/deliver-selling/${orderId}`,
  });
};