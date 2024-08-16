import axios from 'axios';

// Global configuration
axios.defaults.baseURL = 'https://your-api-url.com';
axios.defaults.timeout = 10000; // Set timeout of 10 seconds
axios.defaults.headers.common['Authorization'] = 'Bearer your-token-here'; // Set a default token (if required)

// Example of adding a request interceptor
// Request Interceptor
axios.interceptors.request.use(
    (config) => {
      // Modify the request config before sending it
      console.log('Request Interceptor: ', config);
      
      // Add a token or other headers if needed
      const token = 'your-auth-token';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

// Example of adding a response interceptor
// Response Interceptor
axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      console.log('Response Interceptor: ', response);
      return response;
    },
    (error) => {
      // Handle response error
      console.error('Response Error: ', error.response || error.message);
      return Promise.reject(error);
    }
  );
