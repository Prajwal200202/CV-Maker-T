import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
  <h1 className="text-6xl md:text-8xl text-center font-extrabold leading-tight text-gray-900">
    Create a Professional <br /> CV in Minutes
  </h1>
  <h4 className="text-2xl md:text-4xl font-medium text-center text-gray-700 mt-6">
    Easily Build & Edit Your CV with Our <br /> Simple and Powerful CV Maker
  </h4>
  <button onClick={()=> navigate('/profile')} className="mt-8 px-8 py-4 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300">
    Get Started
  </button>
</div>

  )
}

export default Home