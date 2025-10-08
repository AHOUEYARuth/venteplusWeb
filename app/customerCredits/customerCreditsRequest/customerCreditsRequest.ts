import api from "@/lib/httpclient";

export const getPlans = async () => {
  const response = await api.get("/documents");
  return response.data;
};
