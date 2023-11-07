 
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
                <div className="row col-12">
                <div className="col-6 my-2 text-center">
                    <input
                      type="radio"
                      id="radio2"
                      name="personaType"
                      value="fisica"
                      checked={personaType === 'fisica'}
                      onChange={handlePersonaTypeChange}
                    />
                    <label htmlFor="radio2">Persona Física</label>
                  </div>
                  <div className="col-6 my-2 text-center">
                    <input
                      type="radio"
                      id="radio1"
                      name="personaType"
                      value="moral"
                      checked={personaType === 'moral'}
                      onChange={handlePersonaTypeChange}
                    />
                    <label htmlFor="radio1">Persona Moral</label>
                  </div>
                   
                </div>
              </div>

              {personaType === 'fisica' && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content"> 
                    <div className="row">
                      <div className="col-12">
                      <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Constancia de CURP (*) </label>

                            </div>
                            <div className="col-12">
                            <FileInput />

                            </div>
                          </div>
                        </div> 
                        <div className="row">
                          <div className="col-6">
                            <div className="col-12">
                            <label >CURP (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>

                          </div>
                          <div className="col-6">
                          <div className="col-12">
                            <label >RFC (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-4">
                          <div className="col-12">
                            <label >Nombre (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-4">
                          <div className="col-12">
                            <label >Primer Apellido (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-4">
                          <div className="col-12">
                            <label >Segundo Apellido</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                          <div className="col-12">
                            <label >Correo eletrónico</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-6">
                          <div className="col-12">
                            <label >Confirmación correo eletrónico</label>

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
                        </div>


                         


                      </div>
                      </div>
                    </div>

                  </div> 
              )}
 
              {personaType === 'moral' && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content"> 
                    <div className="row">
                      <div className="col-12">
                      <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Constancia de Situación Fiscal (*) </label>

                            </div>
                            <div className="col-12">
                            <FileInput />

                            </div>
                          </div>
                        </div> 
                        <div className="row"> 
                          <div className="col-6">
                          <div className="col-12">
                            <label >RFC (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Razón Social (*)</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div> 
                        </div>

                        <div className="row">
                          <div className="col-6">
                          <div className="col-12">
                            <label >Correo eletrónico</label>

                            </div>
                            <div className="col-12">
                            <Input />

                            </div>
                          </div>
                          <div className="col-6">
                          <div className="col-12">
                            <label >Confirmación correo eletrónico</label>

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
                        </div>


                         


                      </div>
                      </div>
                    </div>

                  </div> 
              )}

              <div className="row padding-elements">
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
  );
} 


