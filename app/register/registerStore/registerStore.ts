import { create } from "zustand";
import { getUsers } from "../registerRequest/registerRequest";


type State = {
  nom: string;
  age: number;
  activeForm: number;
};

type RegisterActions = {
  showUser: (nom: string, age: number) => string;
  setActiveForm: (activeForm: string) => void;
};

export const registerStore = create<State & RegisterActions>((set) => ({
  nom: "Ruth Amra",
  age: 10,
  activeForm: 1,

  setActiveForm: (activeForm) => set({ activeForm: parseInt(activeForm) }),

  showUser(nom, age) {
    return `Je m'appelle ${nom}, j'ai ${age} ans et je suis dev`;
  },
}));
