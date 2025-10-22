import { HttpClient } from "@/lib/httpClient";
import api from "@/lib/util";
import { objectToFormData } from "@/lib/utils";


export const createCategory = async (categoryData) => {
  return HttpClient.makeRequest({
    method: "POST",
    url: "/categories",
    payload: categoryData,
  });
};
