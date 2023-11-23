import React from 'react';
import FileInput from '@public/components/FileInput';
import Input from '@public/components/Input';

const PersonaForm = ({ personaType, handlePersonaTypeChange }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              

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
 

  </div>
  );
};



export default PersonaForm;