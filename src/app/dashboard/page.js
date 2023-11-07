 

  import React from 'react';
import Header from '../../../public/components/Header';  
import Table from '../../../public/components/Table';  

const containerStyle = {
  height: '100vh',  // 100% de la altura del viewport
  overflow: 'hidden',  // Deshabilita el scroll
  backgroud: 'white'
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