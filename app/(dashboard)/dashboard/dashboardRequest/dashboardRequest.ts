import api from "@/lib/httpclient";

export const getProduct = async () => {
  const response = await api.get("/products");
  return response.data;
};
