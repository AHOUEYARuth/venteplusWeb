/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { forgotPasswordRequest, loginRequest } from "../loginRequest/loginRequest";

type State = {
  user: any;
  shop: any;
  token: string | null;
 
};

type LoginActions = {
  showLogin: (type: string) => string;
  loginActions: (userFormData: any) => Promise<any>;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setShop: (shop: any) => void;
  logout: () => void;
  forgotPasswordAction: (data: any) => Promise<any>;
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

      logout: () => {
        set({ user: null, shop: null, token: null });
        localStorage.removeItem("access-token");
      },
      forgotPasswordAction: async(data) => {
        const response = await forgotPasswordRequest(data);
        return response
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
