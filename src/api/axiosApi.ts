import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
interface RequestParams {
    headers?: any;
    body?: any;
    params?: any;
  }
// Base function for all API requests
export const apiRequest = async (url: string, method: string = 'GET', { headers = {}, body = null, params = {} }: RequestParams = {}) => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params,
      data: body,
    };

    const response: AxiosResponse = await axios(config);

    return response.data; // Return response data directly

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};