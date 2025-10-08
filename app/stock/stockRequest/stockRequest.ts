import api from "@/lib/httpclient";

export const getStocks = async () => {
    const response = await api.get("/stocks");
    return response.data
}