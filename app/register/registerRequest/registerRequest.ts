import api from "@/lib/httpclient";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
