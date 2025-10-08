import api from "@/lib/httpclient";

export const getProviders = async () => {
  const response = await api.get("/providers");
  return response.data;
};
