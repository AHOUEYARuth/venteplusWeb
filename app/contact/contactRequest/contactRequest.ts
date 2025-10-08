import api from "@/lib/httpclient";


export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};
