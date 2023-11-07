 
"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Header from '../../../public/components/Header';
import Footer from '../../../public/components/Footer';

import Input from '../../../public/components/Input';
import FileInput from '../../../public/components/FileInput'; // Corregir el import
import Button from '../../../public/components/Button';
import './style.css';

const containerStyle = {
  height: '100vh',
  overflow: 'hidden',
  background: 'white', // Corregir el nombre de la propiedad "background"
};

export default function Page() { 

  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="card">

            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content"> 
                  <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Comprobante de Domicilio </label>

                            </div>
                            <div className="col-12">
                            <FileInput />

                            </div>
                          </div>
                        </div> 
                    <div className="row">
                      
                      <div className="col-12">
                        <div className="row"> 
                          <div className="col-3">
                            <div className="col-12">
                              <label >Estado (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Municipio (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Localidad (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Colonia (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                        </div>

                        <div className="row"> 
                          <div className="col-3">
                            <div className="col-12">
                              <label >Código Postal (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Calle (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >N° Exterior (*)</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >N° Interior</label>

                            </div>
                            <div className="col-12">
                              <Input />

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Entre Calle</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                           
                        </div>


                        <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Referencia</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                           
                        </div>

                        <div className="row">
                          <div className="col-4">
                          <div className="col-12">
                            <label >Teléfono (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-4">
                          <div className="col-12">
                            <label >Celular (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-4">
                          <div className="col-12">
                            <label >Correo eletrónico (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                        </div>


                         


                      </div>
                      </div>
                    </div>

                  </div> 
               
 
              <div className="row padding-elements">
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <Button text="Finalizar" customStyle={{ width: '140px'}}/>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
 
    </div>
  );
} 


