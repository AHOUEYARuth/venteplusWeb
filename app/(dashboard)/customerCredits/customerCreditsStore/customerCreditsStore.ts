import { create } from "zustand";
import { getPlans } from "../customerCreditsRequest/customerCreditsRequest";

type State = {
  firstName: string,
  lastName: string
}

type Action = {
  getFullName: (firstName: string, lastName: string) => string
}

export const myStore = create<State & Action>((set) => ({
  firstName: 'Ruth',
  lastName: "Detch",
  getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
})) 