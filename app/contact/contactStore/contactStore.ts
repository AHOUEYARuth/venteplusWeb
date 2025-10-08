import { create } from "zustand";
import { getContacts } from "../contactRequest/contactRequest";

type State = {
  name: string,
  firstName: string
}

type Actions = {
  getFullName: (name: string, firstName: string) => string
}

export const contactStore = create<State & Actions>((set) => ({
  name: "Agbo",
  firstName: "Aurore",
  getFullName(name, firstName) {
    return `Je suis ${name} ${firstName} et je suis sur la page de contact`
  },

}))