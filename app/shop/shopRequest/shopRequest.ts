import api from "@/lib/httpclient";

export const getShops = async () => {
    const response = await api.get("/shop");
    return response.data
}