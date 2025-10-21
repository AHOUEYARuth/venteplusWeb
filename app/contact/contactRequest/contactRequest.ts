import api from "@/lib/util";


export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};
