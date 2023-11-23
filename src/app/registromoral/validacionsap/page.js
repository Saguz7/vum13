"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
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

    const enlacedireccion = async () => {

        console.log('Hola! 1');
        router.push('/registromoral/finalizar');

    
    }
 
    const dotStyle = { backgroundColor: 'rgb(25, 70, 187)' };


  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen  ">
        <div className="container center-aling">
          <div className="card card-login d-flex flex-column justify-content-center align-items-center margin-top-3">
          <h2 style={{ textAlign: 'center', marginTop: '10%' }}>Validando en SAP</h2>
                <div className="dottedloader dottedloader--re">
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                </div>

                <div className="row col-12">
                  <div className="col-sm-12 col-md-6 my-2 text-center mx-auto">
                    <div className="center-container">
                      <Button
                        onClick={enlacedireccion}
                        text="Siguiente"
                        customStyle={{ width: '240px'}}
                        className="cta cta--guinda guinda"
                      />
                    </div>
                  </div> 
                </div>

          </div>
        <div>
          
      </div>
    </div>
 </div>
</div>
  );
}
 

export default Llave;