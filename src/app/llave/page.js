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

    const enlaceusuarionuevo = async () => {

        console.log('Hola! 1');
        router.push('/llave/validacionrenapo');

    
    }


    const enlaceusuariosregistrado = async () => {

        console.log('Hola! 2');
        router.push('/buzon');

    
    }
    const dotStyle = { backgroundColor: 'rgb(25, 70, 187)' };


    return (
        <div style={containerStyle}>
          <Header />
    
          <div className="bg-white min-h-screen">
            <div className="container center-align">
              <div className="card card-login d-flex flex-column justify-content-center align-items-center margin-top-3">
                <h2 style={{ textAlign: 'center', marginTop: '10%' }}>Obteniendo información de llave</h2>
                <div className="dottedloader dottedloader--re">
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                </div>
                <div className="row col-12">
                  <div className="col-sm-12 col-md-6 my-2 text-center mx-auto">
                    <div className="center-container">
                      <Button
                        onClick={enlaceusuarionuevo}
                        text="Caso nuevo registro"
                        customStyle={{ width: '240px'}}
                        className="cta cta--guinda guinda margin-top-10"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 my-2 text-center mx-auto  ">
                    <div className="center-container ">
                      <Button
                        onClick={enlaceusuariosregistrado}
                        text="Usuario registrado"
                        customStyle={{ width: '240px'}}
                        className="cta cta--guinda guinda margin-top-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
 

export default Llave;