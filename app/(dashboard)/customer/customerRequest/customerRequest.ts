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


export const filterCustomersRequest = async (
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
    url: `customers/shop/${shopId}`,
    searchParams:params
  });
};
