import api from "@/lib/util";

export const getPricings = async () => {
  const response = await api.get("/princings");
  return response.data;
};
