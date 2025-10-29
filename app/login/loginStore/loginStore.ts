/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { loginRequest, postNewPasswordRequest, postOtpRequest, postPasswordRequest, updateFcmTokenRequest } from "../loginRequest/loginRequest";

type State = {
  user: any;
  shop: any;
  token: string | null;
 
};

type LoginActions = {
  showLogin: (type: string) => string;
  loginActions: (userFormData: any) => Promise<any>;
  setFcmTokenActions: (userFormData: any) => Promise<any>;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setShop: (shop: any) => void;
  logout: () => void;
  forgotPasswordAction: (data: any) => Promise<any>;
  postOtpCodeAction: (data: any) => Promise<any>;
  postNewPasswordAction: (data: any) => Promise<any>;
};

export const useLoginStore = create<State & LoginActions>()(
  persist(
    (set) => ({
      user: null,
      shop: null,
      token: null,
      isHydrated: false,

      setToken: (token: string) => set({ token }),
      setUser: (user: any) => set({ user }),
      setShop: (shop: any) => set({ shop }),

      showLogin: (name) => `First log: ${name}`,

      loginActions: async (userFormData) => {
        const response = await loginRequest(userFormData);
        return response;
      },
      setFcmTokenActions: async (userFormData) => {
        const response = await updateFcmTokenRequest(userFormData);
        return response;
      },
      logout: () => {
        set({ user: null, shop: null, token: null });
        localStorage.removeItem("access-token");
      },
      forgotPasswordAction: async (data) => {
        const response = await postPasswordRequest(data);
        return response;
      },
      postOtpCodeAction: async (data) => {
        const response = await postOtpRequest(data);
        return response;
      },
      postNewPasswordAction: async (data) => {
        const response = await postNewPasswordRequest(data);
        return response;
      },
    }),
    {
      name: "login-storage", // clé dans localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        shop: state.shop,
        token: state.token,
      }),
    }
  )
);
