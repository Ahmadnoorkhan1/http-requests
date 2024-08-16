import './App.css'
import React, { useEffect, useState } from 'react';
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
import { apiRequest } from './api/fetchApiResponse';
function App() {
  const [getFetchData,setFetchData]=useState();
  const getMovies = async () => {
    const response = await apiRequest('https://covid-19-data.p.rapidapi.com/country/code?format=json&code=it','GET',
      {
        'x-rapidapi-key': 'c682d61f69mshabc2745d49ba6efp1c655cjsn79239aba6789',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
    ).then((res)=>res).catch((err) =>err);
    if(response){
      setFetchData(response);
    }
  }
  
  useEffect(() => {
    getMovies();
  },[])
  
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



  return (
    <div className='min-h-screen dark:bg-indigo-950 bg-indigo-100'>
      <div className='p-16 flex justify-center items-center flex-col '>
        <h1 className=' text-4xl dark:text-stone-50 text-slate-600'>API CALLS</h1>
        <p className='text-lg dark:text-stone-50 text-slate-600 py-4'>This website has the purpose to document popular ways to integrate apis in a react app.</p>
      </div>
      <div className='p-8 flex flex-col justify-start items-start'>
        <h2 className=' text-2xl dark:text-stone-50 text-slate-600'>Fetch Api</h2>
        <p className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
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

          {/* - **GET Request with Query Parameters**:
 "  ```javascript
  apiRequest('/api/items', 'GET', { params: { search: 'item', limit: 10 } })
    .then(data => console.log(data));
  ```" 

- **POST Request with Body Data**:
   ```javascript
  apiRequest('/api/items', 'POST', { body: { name: 'New Item', price: 100 } })
    .then(data => console.log(data));
  ``` 

- **PUT Request with Headers and Body**:
   ```javascript
  apiRequest('/api/items/123', 'PUT', {
    headers: { Authorization: 'Bearer your-token' },
    body: { name: 'Updated Item', price: 150 }
  }).then(data => console.log(data));
  ``` 
This function provides a robust and reusable approach to making API requests, enhancing your application's ability to communicate with server endpoints efficiently and effectively. */}

        </p>
        <div className='w-full h-[456px]'>

          {/* <Sandpack files={files} options={{visibleFiles:['/fetchApiResponse.ts'],activeFile:"/fetchApiResponse.ts"}} theme={amethyst}  /> */}
          <SandpackProvider className='h-full' files={files} options={{visibleFiles:['/fetchApiResponse.ts'],activeFile:"/fetchApiResponse.ts"}} theme={amethyst}>
            <SandpackLayout>
              {/* <SandpackPreview /> */}
              <SandpackCodeEditor />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
    </div>
  )
}

export default App
