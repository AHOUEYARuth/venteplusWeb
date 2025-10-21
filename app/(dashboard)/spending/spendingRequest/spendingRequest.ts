import api from "@/lib/util";

export const getSpendings = async () => {
    const response = await api.get('/spendings');
    return response.data;
}