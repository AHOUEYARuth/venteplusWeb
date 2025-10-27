/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getUsers, registerEmployeeRequest, registerUserRequest } from "../registerRequest/registerRequest";
import { use } from "react";

type State = {
  activeForm: number;
};

type Actions = {
  registerAction: (userFormData: any) => Promise<void>;
  setActiveForm: (activeForm: string) => void;
  employeeRegisterAction: (employeeData: any, role: string) => Promise<void>;
};

export const registerStore = create<State & Actions>((set) => ({
  activeForm: 1,
  registerAction: async (userFormData) => {
    const response = await registerUserRequest(userFormData);
    return response;
  },
  setActiveForm: (activeForm) => set({ activeForm: parseInt(activeForm) }),

  employeeRegisterAction: async (employeeData, role) => {
    const response = await registerEmployeeRequest(employeeData, role);
    return response;
  },
}));
