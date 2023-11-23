"use client"; // This is a client component 👈🏽


import React from 'react';
import Header from '@public/components/Header';  
 
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

export default function Page() {
 
  return (
    <div style={containerStyle}>
      <Header />
      <div className="bg-white min-h-screen  ">
      <div className="container">
      <div className="card">

        <div className="bg-white flex flex-col items-center justify-center">
         
          </div>


        </div>
        </div>

      </div>


     
    </div>
  );
}