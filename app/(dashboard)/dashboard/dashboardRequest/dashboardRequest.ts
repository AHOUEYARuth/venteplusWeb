import api from "@/lib/util";

export const getProduct = async () => {
  const response = await api.get("/products");
  return response.data;
};
