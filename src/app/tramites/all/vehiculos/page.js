"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Sidebar from '@public/components/Sidebar';

import Header from '@public/components/Header'; 
import './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh', // Adjusted to occupy 80% of the viewport height
  justifyContent: 'space-between', // Vertically center and add space at the top and bottom
  alignItems: 'center', // Center horizontally
  overflow: 'hidden', // Disables scroll
  background: 'white',
};

export default function Page() {
  const [personaType, setPersonaType] = useState(''); // State to control the type of person
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handlePersonaTypeChange = (e) => {
    setPersonaType(e.target.value);
  };


  const handleButtonClick = async () => {
  };

  return (
    <div style={containerStyle}>
      <Header />
      {/* You may need to define isSidebarOpen and toggleSidebar */}
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
                                <input className="form-input-search" type="text" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row icon-card">
                            <div className="col-2"></div> {/* Space on the left */}
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
                            <div className="col-2"></div> {/* Space on the right */}
                          </div>

                          <div className="row title-card">
                            <div className="col-2"></div> {/* Space on the left */}
                            <div className="col-4">
                              <div className="text-center">
                                <div></div>
                                <h5>Vehículos</h5>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="text-center">
                                <div></div>
                                <h5>Nomina</h5>
                              </div>
                            </div>
                            <div className="col-2"></div> {/* Space on the right */}
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