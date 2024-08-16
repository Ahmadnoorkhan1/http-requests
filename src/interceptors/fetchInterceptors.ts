// Request Interceptor
const requestInterceptor = (url: string, options: RequestInit): { url: string; options: RequestInit } => {
    // Modify the request here (e.g., add headers, log requests)
    options.headers = {
        ...options.headers,
        Authorization: 'Bearer your-token', // Example: Adding authorization header
    };
    console.log('Request Interceptor:', url, options);
    return { url, options };
};

// Response Interceptor
const responseInterceptor = async (response: Response): Promise<any> => {
    // Check for any custom logic like token expiry, logging, etc.
    if (!response.ok) {
        // Handle errors globally
        const error = await response.text();
        console.error('Response Interceptor Error:', error);
        throw new Error(error);
    }

    console.log('Response Interceptor:', response);
    return response;
};
