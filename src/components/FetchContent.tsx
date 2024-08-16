import React from 'react'
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
const FetchContent = () => {
    const files ={
        '/fetchApiResponse.ts':`interface ApiRequestOptions {
            headers?: Record<string, string>;
            body?: any; 
            params?: any;
        }
      
        const apiRequest = async (
            url: string,
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
            { headers = {}, body = null, params = {} }: ApiRequestOptions = {}
        ): Promise<any> => {
            // Construct query parameters if provided
            const queryString = new URLSearchParams(params).toString();
            const fullUrl = queryString ? url+'?'+queryString : url;
      
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
                    throw new Error('Error: '+'response.status');
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
        `,
        }
    const fetchApiServiceFile = {
        '/fetchApiService.ts': `import { apiRequest } from "../api/fetchApiResponse";
    export const getRequest = async (url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}) => {
        return apiRequest(url, 'GET', { headers, params });
    };
    
    export const postRequest = async (url: string, body: Record<string, any>, headers: Record<string, string> = {}) => {
        return apiRequest(url, 'POST', { headers, body });
    };
        `
        }
    const usageFile = {
        '/app.ts':`import { getRequest, postRequest } from './api/fetchApiService';
    
    // Making a GET request
    getRequest('https://api.example.com/data', { queryParam: 'value' })
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
    // Making a POST request
    postRequest('https://api.example.com/data', { key: 'value' })
    .then(response => console.log(response))
    .catch(error => console.error(error));
    `
        }
      
  return (
  <div className='p-8 flex flex-col justify-start items-start'>
    <h2 className=' text-2xl dark:text-stone-50 text-slate-600'>Fetch Api</h2>
    <div className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
      Here's a description of how i am implementing fetch api.To explain architecture i'm using a single function the `apiRequest` function to handle all kind of api requests.<br />
      Our `apiRequest` function is a versatile utility for making HTTP requests in JavaScript applications.<br />
      Designed with flexibility and ease of use in mind, it supports various requ est methods, customizable headers, dynamic query parameters, and request bodies.
      Here's a breakdown of its key features:
      <ul>
        <li className='py-2 tracking-wide'>
          - <strong>Method Support:</strong> Whether you need to perform a `GET`, `POST`, `PUT`, or any other HTTP request method, the function handles it seamlessly.
        </li>
        <li className='py-2 tracking-wide'>
          - <strong>Dynamic Query Parameters:</strong> Easily append query parameters to your URL by passing them in the `params` object. The function constructs the query string and appends it to the request URL.
        </li>
        <li className='py-2 tracking-wide'>
          - <strong>Customizable Headers:</strong> Add or override HTTP headers by providing them in the `headers` object. This is particularly useful for including authentication tokens or setting content types.
        </li>
        <li className='py-2 tracking-wide'>
          - <strong>Request Body Handling:</strong> For methods that require a request body, such as `POST` and `PUT`, you can pass the body data in the `body` object. The function automatically serializes it to JSON.
        </li>
        <li className='py-2 tracking-wide'>
          - <strong>Content-Type Detection:</strong> The function intelligently handles different content types in the response. It checks the `Content-Type` header and parses the response accordingly, whether it's JSON or plain text.
        </li>
        <li className='py-2 tracking-wide'>
          - <strong>Error Handling:</strong> Built-in error handling ensures that any issues with the request are caught and logged, allowing you to handle errors gracefully in your application.
        </li>
      </ul>
    </div>
    <div className='w-full h-[456px]'>
      <SandpackProvider className='h-full' files={files} options={{visibleFiles:['/fetchApiResponse.ts']}} theme={amethyst}>
        <SandpackLayout>
          <SandpackCodeEditor />
        </SandpackLayout>
      </SandpackProvider>
    </div>
    <div className=''>
      <p className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
      Then just to make use of fetchApiResponse.ts We make a fetchApiServices.ts to make functions to make our approach better.
      </p>
      <h2 className='text-2xl dark:text-stone-50 text-slate-600'>Benefits:</h2> 
      <ul>
        <li className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
          <strong>Code Reusability:</strong> You have a single apiRequest function in fetchApiResponse.ts that handles the core logic. This allows you to reuse the same logic across multiple request types without duplicating code. This is particularly useful if you need to add more request types (e.g., PUT, DELETE) in the future.
        </li>
        <li className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
          <strong>Simplified Usage:</strong>By creating specific functions like getRequest and postRequest in fetchApiService.ts, you're simplifying the way you make API calls in other parts of your codebase. Instead of needing to pass method types and construct options every time, you just call the relevant function with the required parameters.
        </li>
        <li className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
          <strong>Abstraction:</strong>You've abstracted the complexity of API requests into a service layer. This makes your code cleaner and easier to maintain. When other parts of your application need to make an API call, they can rely on these simple helper functions rather than dealing with the underlying logic.
        </li>
        <li className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
          <strong>Centralized Error Handling:</strong>With the apiRequest function managing all API calls, you only need to handle errors in one place. This reduces the chance of bugs and makes it easier to update your error handling if needed.
        </li>
        <li className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
          <strong>Extensibility:</strong>This pattern makes it easy to add new types of requests (like PUT, DELETE) or add common behavior to all requests (like authentication tokens, logging, etc.) by extending the service functions without altering existing code.
        </li>
      </ul>
    </div>
    <div className='w-full h-[456px]'>
      <SandpackProvider className='h-full' files={fetchApiServiceFile} options={{visibleFiles:['/fetchApiService.ts']}} theme={amethyst}>
        <SandpackLayout>
          <SandpackCodeEditor />
        </SandpackLayout>
      </SandpackProvider>
    </div>
    <div className='py-4'>
      <h2 className='text-2xl dark:text-stone-50 text-slate-600'>Usage:</h2> 
      <p className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
      This approach allows developers to handle API calls in a clear, concise manner while keeping the codebase clean and maintainable. Whether you're building a small project or scaling up, this service is designed to make interacting with APIs as smooth as possible.
      </p>
    </div>
    <div className='w-full h-[456px]'>
      <SandpackProvider className='h-full' files={usageFile} options={{visibleFiles:['/app.ts']}} theme={amethyst}>
        <SandpackLayout>
          <SandpackCodeEditor />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  </div>
    
  )
}

export default FetchContent