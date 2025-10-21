import api from "@/lib/util";

export const getStocks = async () => {
    const response = await api.get("/stocks");
    return response.data
}