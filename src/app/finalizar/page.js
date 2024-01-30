"use client"; // This is a client component 👈🏽

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';

import Button from '@public/components/Button';
import Input from '@public/components/Input';

import styles from './style.css';
import { useRouter } from 'next/navigation';
import { useUser } from 'src/app/UserContext';
import Sidebar from '@public/components/Sidebar';
import { useDarkMode } from 'src/app/DarkModeContext';
import axios from "axios";
import getConfig from '@raiz/config';


function Llave() {
  const { END_POINT_BACK } = getConfig();

  const router = useRouter();
  const { userData,updateUser } = useUser();
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const [scrollClass, setScrollClass] = useState('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const { isDarkMode } = useDarkMode(); 
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden', // Deshabilita el scroll
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black' 

  };
  const handleButtonClick = () => {
    const informacionGuardada = JSON.parse(
      localStorage.getItem("informacionContribuyente")
    );

    axios.post(
      // 'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/contribuyente'
      END_POINT_BACK + "/contribuyente", {
       //body: {
         rfc: informacionGuardada.rfc
       //}
     })
       .then(response => {  
 
         if (Array.isArray(response.data)) {
    
          } else if (typeof response.data === 'object' && response.data !== null) {
 
           console.log(response.data);
          
             updateUser({
             tipo_persona: 'Fisica',
             nombre_persona: response.data.nombre + ' ' + response.data.primer_apellido + ' ' + response.data.segundo_apellido,
             rol_persona: 'contribuyente',
             rfc: response.data.rfc
           });
       
             router.push('/buzon');
          }  
 
        })
       .catch(error => {
         console.error('Error en la petición:', error);
       }); 

      router.push('/buzon');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />

      <div className=" min-h-screen">
        <div className="container center-aling">
        <div className={`d-flex flex-column justify-content-center align-items-center margin-top-3 ${isDarkMode ? 'dark-mode-card' : ''}`}>
        <div className={`card card-general width-terms margin-top-3  ${isDarkMode ? 'dark-mode-card' : ''}`} > 
          <div className="text-big text-bold text-guinda text-center border-bottom--rosa">
            Finalización del registro
          </div>
          <div className="mt-3 bg-gray-10 p-3 text-small rounded " > 
          <p style={{  textAlign: 'center', marginTop: '5%',marginBottom: '5%', color: 'black'  }}> 
          De acuerdo con la situación actual en SAP, su registro a quedado completado

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
      <Footer />

       
    </div>
  );
}

export default Llave;

 