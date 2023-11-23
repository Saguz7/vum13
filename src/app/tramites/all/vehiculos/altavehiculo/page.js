 
"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';

import Input from '@public/components/Input';
import FileInput from '@public/components/FileInput'; // Corregir el import
import Button from '@public/components/Button';
import './style.css';
import Link from 'next/link';

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

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="card">

            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="d-flex justify-content-center w-100 form-select-type">
                 
              <div className="row ">
                <div className="col-12 d-flex justify-content-center align-items-center"> 
                  <a href="direccion" >
                  <Button text="Continuar"  customStyle={{ width: '140px'}}/>
                  </a>
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


