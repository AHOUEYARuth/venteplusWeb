import api from "@/lib/httpclient";

export const getSellings = async () => {
  const response = await api.get("/sellings");
  return response.data;
};