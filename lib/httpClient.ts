import ky from 'ky';
import { VerbHttpType } from './utils';
export const baseURL = {
    serverProd: 'https://api.ylomi.bj/api/',
    local: 'http://127.0.0.1:4000/api/',
    serverTest: 'https://preprod.ylomi.bj/api/',
}
export const baseUrlNotApi = "http://127.0.0.1:4000/"
const httpRequest = ky.extend({
  prefixUrl: baseURL.local,
  timeout: false,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      (request, options) => {
        const token = localStorage.getItem("access-token");
        token ? request.headers.set("Authorization", `Bearer ${token}`) : null;
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response) {
          return await response.json();
        }
        return error;
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          localStorage.clear();
          // router.push("/login");
        }
      },
    ],
  },
});

interface RequestOptions {
    method: VerbHttpType;
    url: string;
    payload?: object | FormData | null;
    searchParams?: object | string | null;
}

export class HttpClient {

    static makeRequest({ method, url, payload = null, searchParams = null }: RequestOptions) {
        const requestMethod = method.toLowerCase();

        const requestOptions: { searchParams?: object | string, body?: FormData, json?: object } = {
            searchParams: searchParams != null ? searchParams : undefined
        };

        if (payload instanceof FormData) {
            requestOptions.body = payload;
        } else if (payload !== null) {
            requestOptions.json = payload;
        }
       
        return httpRequest[requestMethod](url, requestOptions).json();
    }

}
