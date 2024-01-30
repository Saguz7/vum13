 
"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Header from '@public/components/Header'; 
import './style.css';
import Sidebar from '@public/components/Sidebar';

const containerStyle = {
  height: '100vh',
  overflow: 'hidden',
  background: 'white', // Corregir el nombre de la propiedad "background"
};

export default function Page() {
  const [personaType, setPersonaType] = useState(''); // Estado para controlar el tipo de persona

  const handlePersonaTypeChange = (e) => {
    setPersonaType(e.target.value);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
                  <div className="row">
                    <div className="col-2"></div> {/* Espacio en blanco a la izquierda */}
                    <div className="col-4">
                    <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                          
                        </div>
                        <h5>Título</h5>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                          
                        </div>
                        <h5>Título</h5>
                      </div>
                    </div>
                    <div className="col-2"></div> {/* Espacio en blanco a la derecha */}
                  </div>

                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-2"></div> {/* Espacio en blanco a la izquierda */}
                    <div className="col-4">
                    <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                          
                        </div>
                        <h5>Título</h5>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card text-center" style={{ height: '260px' }}>
                        <div style={{ marginTop: '80px' }}>
                          
                        </div>
                        <h5>Título</h5>
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


