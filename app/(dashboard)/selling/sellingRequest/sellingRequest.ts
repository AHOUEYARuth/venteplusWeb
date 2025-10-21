import api from "@/lib/util";

export const getSellings = async () => {
  const response = await api.get("/sellings");
  return response.data;
};