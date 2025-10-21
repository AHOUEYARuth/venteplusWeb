/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { getlog, loginRequest } from "../loginRequest/loginRequest";

type State = {
  name: string;
};

type LoginAtions = {
  showLogin: (type: string) => string;
  loginActions: (userFormData: any) => Promise<void>;
};

export const loginStore = create<State & LoginAtions>((set) => ({
  name: "Detch",
  showLogin(name) {
    return `First log: ${name}`;
  },
  loginActions: async (userFormData) => {
    const response = await loginRequest(userFormData);
    return response;
  }
}));
