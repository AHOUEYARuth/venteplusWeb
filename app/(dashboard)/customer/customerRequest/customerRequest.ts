import { HttpClient } from "@/lib/httpClient";
import api from "@/lib/util";

export const createCustomerRequest = async (customerData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "customers",
    payload: customerData,
  });
};

export const deleteCustomerRequest = async (customerId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `customers/${customerId}`,
  });
};

export const getCustomersRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `customers/shop/${shopId}`,
  });
}