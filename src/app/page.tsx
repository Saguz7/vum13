"use client"; // This is a client component 👈🏽


import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';  
import Sidebar from '@public/components/Sidebar';

const containerStyle = {
  height: '100vh',
  overflow: 'hidden',
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', closeSidebar);

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, []);

  const handleButtonClick = (e) => {
    console.log('Hola Mundo');
    console.log(e);

    e.stopPropagation();
  };

  return (
    <div style={containerStyle}>
      <Header />
 

      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="bg-crimson-700 text-white p-8 rounded-lg">
        
 
        </div>
      </div>
    </div>
  );
}