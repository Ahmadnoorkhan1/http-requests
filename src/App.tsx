import './App.css'
import React, { useEffect, useState } from 'react';
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
import { getRequest } from './services/axiosApiService';
import FetchContent from './components/FetchContent';
// import { getRequest } from './services/fetchApiServices';
function App() {
  const [getFetchData,setFetchData]=useState();
  const getMovies = async () => {
    try {
      const response = await getRequest('https://admin.gulfwaydelivery.com/api/v1/statistics/total-rider-commission')
      if(response){
        console.log(response)
        setFetchData(response);
      }
    } catch (error) {
      throw error
    }
  }
  
  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className='min-h-screen dark:bg-indigo-950 bg-indigo-100'>
      <div className='p-16 flex justify-center items-center flex-col '>
        <h1 className=' text-4xl dark:text-stone-50 text-slate-600'>API CALLS</h1>
        <p className='text-lg dark:text-stone-50 text-slate-600 py-4'>This website has the purpose to document popular ways to integrate apis in a react app.</p>
      </div>
      <FetchContent />
      <div className='p-8 flex flex-col justify-start items-start'>
        <h2 className=' text-2xl dark:text-stone-50 text-slate-600'>Axios Api</h2>
        <div className='text-sm dark:text-stone-50 text-slate-600 py-4 leading-6 tracking-wider font-serif'>
        Here's a description of how i am implementing axios api.To explain architecture i'm using a single function the `apiRequest` function to handle all kind of api requests.<br />
        Our `apiRequest` function is a versatile utility for making HTTP requests in JavaScript applications using axios.<br />
        Designed with flexibility and ease of use in mind, it supports various request methods, customizable headers, dynamic query parameters, and request bodies.
        Here's a breakdown of its key features:
        </div>
      </div>
    </div>
  )
}

export default App
