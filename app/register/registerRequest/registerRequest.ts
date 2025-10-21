/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from "@/lib/httpClient";
import api from "@/lib/util";
import { objectToFormData, objectToFormDataWithArray } from "@/lib/utils";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const registerUserRequest = async (userData: any) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "traders/register",
    payload: objectToFormData(userData),
  });
};
