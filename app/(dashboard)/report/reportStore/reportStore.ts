import { create } from "zustand";
import { getReports } from "../reportRequest/reportRequest";

type State = {
    title: string,
    details: string
}

type ReportActions = {
    showReportDetails: (title: string, details: string) => string
}

export const reportStore = create<State & ReportActions>((set) => ({
  title: "Rapport de la semaine du 30",
  details: "Vente de : 10 boîtes de lait concenté, 1 sac de riz",
  showReportDetails(title, details) {
    return `${title} : ${details}`;
  },
}));