import api from "@/lib/httpclient";

export const getPricings = async () => {
  const response = await api.get("/princings");
  return response.data;
};
