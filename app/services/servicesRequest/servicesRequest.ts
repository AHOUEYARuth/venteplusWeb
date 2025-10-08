import api from "@/lib/httpclient";

export const getServices = async () => {
    const response = await api.get('/services');
    return response.data
}