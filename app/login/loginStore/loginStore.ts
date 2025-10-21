/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { getlog, loginRequest } from "../loginRequest/loginRequest";

type State = {
  name: string;
  user: any;
  shop: any;
};

type LoginAtions = {
  showLogin: (type: string) => string;
  loginActions: (userFormData: any) => Promise<void>;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setShop: (shop: any) => void;
};

export const loginStore = create<State & LoginAtions>((set) => ({
  name: "Detch",
  user: null,
  shop: null,
  setToken: (token: string) => {
    localStorage.setItem("access-token", token);
  },
  setUser: (user: any) => {
    set({ user: user });
  },
  setShop: (shop: any) => {
    set({ shop: shop });
  },
  showLogin(name) {
    return `First log: ${name}`;
  },
  loginActions: async (userFormData) => {
    const response = await loginRequest(userFormData);
    return response;
  }
}));
