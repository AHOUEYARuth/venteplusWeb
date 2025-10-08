import { create } from "zustand";
import { getUsers } from "../registerRequest/registerRequest";

type State = {
    nom: string,
    age: number
}

type RegisterActions = {
    showUser: (nom: string, age: number) => string
}

export const registerStore = create<State & RegisterActions>((set) => ({
  nom: "Ruth Amra",
  age: 10,
  showUser(nom, age) {
    return `Je m'appelle ${nom}, j'ai ${age} et je suis dev`;
  },
}));