 
"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Header from '../../../../public/components/Header';
import Footer from '../../../../public/components/Footer';

import Input from '../../../../public/components/Input';
import FileInput from '../../../../public/components/FileInput'; // Corregir el import
import Button from '../../../../public/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

 import './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

export default function Page() {
  const [personaType, setPersonaType] = useState(''); // Estado para controlar el tipo de persona

  const handlePersonaTypeChange = (e) => {
    setPersonaType(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onClick={handleButtonClick} />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="row">

            <div className="d-flex flex-column justify-content-center align-items-center mt-4">

              

            <div className="container">
 
              <div className="card card-iconos ">
                 

                <div className="row justify-content-center align-items-center">
                <div className="row"> 
                <div className="container justify-content-center align-items-center">
                <div className="row">
                  <div className="row"> 
                  <div className="col-4">  
                    <div className="col-12 ">
                    <input className="form-input-search"
                      type="text" 
                    />
                       
                      </div>
                  </div> 

                  </div>
                </div>
                <div className="container">
                  <div className="row icon-card">
                    <div className="col-2"></div> {/* Espacio en blanco a la izquierda */}
                    <div className="col-4">
                    <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                        <Link href="/tramites/all/vehiculos">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faCar} size="4x" />
                        </button>
                        </Link>
                        </div>
                       </div>
                    </div>
                    <div className="col-4">
                      <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faCar} size="4x" />
                        </button>
                        </div>
                       </div>
                    </div>
                    <div className="col-2"></div> {/* Espacio en blanco a la derecha */}
                  </div>


                  <div className="row title-card">
                    <div className="col-2"></div> {/* Espacio en blanco a la izquierda */}
                    <div className="col-4">
                    <div className="text-center">
                        <div>
                          
                        </div>
                        <h5>Vehículos</h5>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-center" >
                        <div>
                          
                        </div>
                        <h5>Nomina</h5>
                      </div>
                    </div>
                    <div className="col-2"></div> {/* Espacio en blanco a la derecha */}
                  </div>
 
                </div>

                </div>
                </div>

                </div>




              </div> 
            </div> 


  

               

            </div>
          </div>
        </div>

      </div>
 
    </div>
  );
} 


