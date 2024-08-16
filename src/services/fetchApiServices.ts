import { apiRequest } from "../api/fetchApi";

export const getRequest = async (url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'GET', { headers, params });
  };
  
  export const postRequest = async (url: string, body: Record<string, any>, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'POST', { headers, body });
  };