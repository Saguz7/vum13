"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Sidebar from '@public/components/Sidebar';
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import Header from '@public/components/Header'; 
import './style.css';

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflow: "hidden", // Deshabilita el scroll
  background: "white",
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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onClick={handleButtonClick}
      />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="row">
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="container">
                <div className="card card-iconos " >
                  <div className="row justify-content-center align-items-center">
                    <div className="row">
                      <div className="container justify-content-center align-items-center">
                      <div className="row">
                          <div className="row  ">
                            <div className="col-4">
                              <div className="col-12">
                                <input className="form-input-search" type="text" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container menu-icon" style={{ overflowY: "scroll" }}>
                          <div className="row icon-card">
                            <div className="col-2"></div>{" "}
                            {/* Espacio en blanco a la izquierda */}
                            <div className="col-4 col-sm-12 col-md-4">
                              <div
                                className="card text-center"
                                style={{ height: "260px" }}
                              >
                                <div style={{ marginTop: "80px" }}>
                                  <Link href="/tramites/all/vehiculos/altavehiculo">
                                    <button className="btn btn-primary">
                                      <FontAwesomeIcon icon={faPlus} size="4x" />
                                    </button>
                                  </Link>
                                </div>
                                <h5 className="text-card-central">Alta Vehículo</h5>

                              </div>
                            </div>
                            <div className="col-4 col-sm-12 col-md-4">
                              <div
                                className="card text-center"
                                style={{ height: "260px" }}
                              >
                                <div style={{ marginTop: "80px" }}>
                                  <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faMinus} size="4x" />
                                  </button>
                                </div>
                                <h5 className="text-card-central">Baja Vehículo</h5>

                              </div>
                            </div>
                            <div className="col-2"></div>{" "}
                            {/* Espacio en blanco a la derecha */}
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
