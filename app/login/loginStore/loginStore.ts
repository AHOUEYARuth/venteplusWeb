import { create } from "zustand";
import { getlog } from "../loginRequest/loginRequest";


type State = {
    name: string,
}

type LoginAtions = {
    showLogin: (type: string) => string
}

export const loginStore = create<State & LoginAtions>((set) => ({
  name: "Detch",
  showLogin(name) {
    return `First log: ${name}`;
  },
}));