import api from "@/lib/util";

export const getShops = async () => {
    const response = await api.get("/shop");
    return response.data
}