import api from "@/lib/httpclient";

export const getlog = async () => {
  const response = await api.get("/users");
  return response.data;
};
