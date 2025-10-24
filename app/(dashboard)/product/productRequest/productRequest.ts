import { HttpClient } from "@/lib/httpClient";
import api from "@/lib/util";
import { objectToFormData } from "@/lib/utils";


export const createCategoryRequest = async (categoryData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "categories",
    payload: categoryData,
  });
};
export const getCategoriesRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `categories/shop/${shopId}`,
  });
};
export const deleteCategoriesRequest = async (catId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `categories/${catId}`,
  });
};

export const createProductRequest = async (productData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "products",
    payload: objectToFormData(productData),
  });
};

export const getPoductsRequest = async (shopId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `products/shop/${shopId}`,
  });
};

export const deleteProductRequest = async (productId) => {
  return HttpClient.makeRequest({
    method: "DELETE",
    url: `products/${productId}`,
  });
};

export const getProductsByCategoryRequest = async (categoryId) => {
  return HttpClient.makeRequest({
    method: "GET",
    url: `products/category/${categoryId}`,
  });
};
