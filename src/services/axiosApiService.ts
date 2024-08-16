import { apiRequest } from "../api/axiosApi";

// Convenience function for GET request
export const getRequest = async (url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'GET', { headers, params });
  };
  
  // Convenience function for POST request
  export const postRequest = async (url: string, body: Record<string, any>, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'POST', { headers, body });
  };
  
  // Convenience function for PUT request
  export const putRequest = async (url: string, body: Record<string, any>, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'PUT', { headers, body });
  };
  
  // Convenience function for DELETE request
  export const deleteRequest = async (url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}) => {
    return apiRequest(url, 'DELETE', { headers, params });
  };