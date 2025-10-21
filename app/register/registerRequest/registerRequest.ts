/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/httpclient";
import { objectToFormData } from "@/lib/utils";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const registerUserRequest = async (userData: any) => {
  
  const response = await api.post(
    "/api/traders/register",
   userData
  );
  return response.data;
};
