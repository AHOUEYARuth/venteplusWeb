import api from "@/lib/util";

export const getReports = async () => {
  const response = await api.get("/report");
  return response.data;
};
