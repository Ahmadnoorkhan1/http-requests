interface ApiRequestOptions {
    headers?: any;
    body?: any; // Replace `any` with a more specific type if known
    params?: any;
}

export const apiRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    { headers = {}, body = null, params = {} }: ApiRequestOptions = {}
): Promise<any> => {
    // Construct query parameters if provided
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // Configure request
    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    // Add body if present (and not for GET/HEAD methods)
    if (body && (method !== 'GET')) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Handle different content types if needed (e.g., JSON, text)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
