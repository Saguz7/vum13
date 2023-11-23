"use client"; // This is a client component 👈🏽

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Header from '@public/components/Header';
import Button from '@public/components/Button';
import Input from '@public/components/Input';

import styles from './style.css';
import { useRouter } from 'next/navigation';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden', // Deshabilita el scroll
  background: 'white',
};


function Llave() {

  const router = useRouter();


  const [showButton, setShowButton] = useState(false);
  const [scrollClass, setScrollClass] = useState('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleButtonClick = () => {
    // Lógica para manejar el clic del botón
    router.push('/buzon');

  };
 
  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen">
        <div className="container center-aling">
        <div className="card card-login d-flex flex-column justify-content-center align-items-center margin-top-3">
        <div className={`card card-general margin-top-3`} > 
          <div class="text-big text-bold text-guinda text-center border-bottom--rosa">
            Finalización del registro
          </div>
          <div class="mt-3 bg-gray-10 p-3 text-small rounded " > 
          <p style={{  textAlign: 'center', marginTop: '5%',marginBottom: '5%'  }}> 
          Se ha completado el registro de sus datos, ya puede usar el buzón tributario

          </p>
          
               </div>
               <div className="row ">
              <div className="col-12 d-flex justify-content-center align-items-center" style={{  marginTop: '5%',marginBottom: '5%'  }}>
                <Button text="Finalizar" customStyle={{ width: '140px'}} className="cta cta--guinda guinda" onClick={handleButtonClick} />

              </div>
            </div>
            </div>

 
            

             
          </div>

          <div>{/* ... (más contenido) */}</div>
        </div>
      </div>
    </div>
  );
}

export default Llave;

 