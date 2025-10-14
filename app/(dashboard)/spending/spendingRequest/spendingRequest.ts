import api from "@/lib/httpclient";

export const getSpendings = async () => {
    const response = await api.get('/spendings');
    return response.data;
}