// api.ts

import axios, { AxiosResponse } from "axios";
import { Pokemon } from "../interface/pokemon";
import { ApiResponse } from "../interface/apiResponse";
import { baseURL } from "../util/global";

const api = axios.create({
  baseURL,
});

// Define functions to make API requests
export const fetchData = async (endpoint: string): Promise<Pokemon[]> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// You can add more API functions as needed

export default api;
