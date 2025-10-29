import { HttpClient } from "@/lib/httpClient";
import api from "@/lib/util";
import { objectToFormData } from "@/lib/utils";

export const getlog = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const loginRequest = async (userData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "auth/login",
    payload: userData,
  });
}

export const updateFcmTokenRequest = async (userData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "auth/update-fcm-token",
    payload: userData,
  });
}

export const postPasswordRequest = async (data) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "auth/forgot-password",
    payload: data,
  });
};

export const postOtpRequest = async (data) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "auth/verify-otp",
    payload: data,
  });
};

export const postNewPasswordRequest = async (data) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "auth/reset-password",
    payload: data,
  });
};