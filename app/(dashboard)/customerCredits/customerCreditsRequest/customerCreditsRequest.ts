import api from "@/lib/util";

export const getPlans = async () => {
  const response = await api.get("/documents");
  return response.data;
};
