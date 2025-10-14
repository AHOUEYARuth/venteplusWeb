import api from "@/lib/httpclient";

export const getReports = async () => {
  const response = await api.get("/report");
  return response.data;
};
