import { create } from "zustand";
import axios from "axios";

type State = {
  id: number;
  name: string;
  firstName: string;
  role: string;
  phoneNumber: string;
  email: string;
  salary: number;
  hireDate: string;
};

type DataStore = {
  employees: State[];
  fetchData: () => Promise<void>;
};

export const employeeStore = create<DataStore>((set) => ({
  employees: [],
  fetchData: async () => {
    try {
      const response = await axios.get("/fakeData.json");

      set({
        employees: response.data.employees,
      });
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  },
}));
