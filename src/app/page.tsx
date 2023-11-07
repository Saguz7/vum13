import React from 'react';
import Header from '../../public/components/Header'; 
import Link from 'next/link';
import Button from '../../public/components/Button'; 

const containerStyle = {
  height: '100vh',  // 100% de la altura del viewport
  overflow: 'hidden',  // Deshabilita el scroll
};

export default function Home() {
 
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