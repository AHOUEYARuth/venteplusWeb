import api from "@/lib/util";

export const getServices = async () => {
    const response = await api.get('/services');
    return response.data
}