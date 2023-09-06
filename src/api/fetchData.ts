import axios, { AxiosResponse } from "axios";
import { Pokemon } from "../interface/pokemon";
import { ApiResponse } from "../interface/apiResponse";
import { baseURL } from "../util/global";

const api = axios.create({
  baseURL,
});

export const fetchData = async (endpoint: string): Promise<Pokemon[]> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default api;
