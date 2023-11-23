 
"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';

import Input from '@public/components/Input';
import FileInput from '@public/components/FileInput'; // Corregir el import
import Button from '@public/components/Button';

import ModalInfo from '@public/components/ModalInfo'; // Asegúrate de ajustar la ruta de importación

import { useRouter } from 'next/navigation';

import './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};


export default function Page() {
  
  const router = useRouter();


  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const openModal = () => {
    console.log("Abriendo modal..."); // Agrega un console.log
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);
  };


  const [formData, setFormData] = useState({
    estado: 'Michoacán',
    municipio: 'Morelia',
    localidad: 'Centro',
    colonia: 'La Palma',
    codigo_postal: '58000',
    calle: 'Avenida Benito Juárez',
    numero_exterior: '123',
    numero_interior: '2B',
    entre_calle: 'Calle Hidalgo y Calle Madero',
    referencia: 'Frente al parque principal',
  });


  const [errors, setErrors] = useState({
    estado: false,
    municipio: false,
    localidad: false,
    colonia: false,
    codigo_postal: false,
    calle: false,
    numero_exterior: false,
    numero_interior: false,
    entre_calle: false,
    referencia: false,
    
  });

  const handleInputChange = (fieldName, value) => {
    // Validar según el campo
    let isValid = true;
  
    switch (fieldName) {
      case 'estado':
      case 'municipio':
      case 'localidad':
      case 'colonia':
        isValid = /^[A-Za-z\s]*$/.test(value);
        break;
      case 'codigo_postal':
        isValid = /^\d{5}$/.test(value);
        break;
      case 'calle':
      case 'entre_calle':
      case 'referencia':
        isValid = /^[A-Za-z0-9\s]*$/.test(value);
        break;
      case 'numero_exterior':
      case 'numero_interior':
        isValid = /^[A-Za-z0-9\s-]*$/.test(value);
        break;
      // Puedes agregar más validaciones según sea necesario
      default:
        break;
    }
    
  
    // Actualizar el estado del formulario solo si el valor es válido
    if (isValid) {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  useEffect(() => {
    // Verificar si todos los campos necesarios están completos después del tiempo de espera
    const timeoutId = setTimeout(() => {
      let isFormComplete = true;
      /*
      let isFormComplete =
          /^[A-Za-z\s]*$/.test(formData.estado) &&
          /^[A-Za-z\s]*$/.test(formData.municipio) &&
          /^[A-Za-z\s]*$/.test(formData.localidad) &&
          /^[A-Za-z\s]*$/.test(formData.colonia) &&
          /^\d{5}$/.test(formData.codigo_postal) &&
          /^[A-Za-z0-9\s]*$/.test(formData.calle) &&
          /^[A-Za-z0-9\s-]*$/.test(formData.numero_exterior) &&
          /^[A-Za-z0-9\s-]*$/.test(formData.numero_interior) &&
          /^[A-Za-z0-9\s]*$/.test(formData.entre_calle) &&
          /^[A-Za-z0-9\s]*$/.test(formData.referencia);
*/
          console.log(isFormComplete);
  
      setFormComplete(isFormComplete);
    }, 500); // Puedes ajustar el tiempo de espera según tus necesidades
  
    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formData]);

  const handleButtonClick = async () => {
 
    router.push('/registromoral/validacionsap');


  }


  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="card margin-top-3">

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
                              <label >Código Postal (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="codigo_postalInput" value={formData.codigo_postal} onChange={(value) => handleInputChange('codigo_postal', value)}/>

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Estado (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="estadoInput" value={formData.estado} onChange={(value) => handleInputChange('estado', value)}/>

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Municipio (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="municipioInput" value={formData.municipio} onChange={(value) => handleInputChange('municipio', value)}/>

                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >Localidad (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="localidadInput" value={formData.localidad} onChange={(value) => handleInputChange('localidad', value)} />

                            </div>
                          </div>
                           
                        </div>

                        <div className="row"> 
                        <div className="col-3">
                            <div className="col-12">
                              <label >Colonia (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="coloniaInput" value={formData.colonia} onChange={(value) => handleInputChange('colonia', value)}/>

                            </div>
                          </div>
                          <div className="col-9">
                            <div className="col-12">
                              <label >Calle (*)</label>

                            </div>
                            <div className="col-12">
                              <Input id="calleInput" className={"form-input--full"}  value={formData.calle} onChange={(value) => handleInputChange('calle', value)}/>

                            </div>
                          </div>
                           
                        </div>

                        <div className="row">
                           <div className="col-3">
                              <div className="col-12">
                                <label >N° Exterior (*)</label>

                              </div>
                              <div className="col-12">
                                <Input id="numero_exteriorInput" value={formData.numero_exterior} onChange={(value) => handleInputChange('numero_exterior', value)}/>

                              </div>
                           </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label >N° Interior</label>

                            </div>
                            <div className="col-12">
                              <Input id="numero_interiorInput" value={formData.numero_interior} onChange={(value) => handleInputChange('numero_interior', value)} />

                            </div>
                          </div>
                          <div className="col-6">
                              <div className="col-12">
                              <label >Entre Calle</label>

                              </div>
                              <div className="col-12">
                              <Input id="entre_calleInput" value={formData.entre_calle} onChange={(value) => handleInputChange('entre_calle', value)}/>

                              </div>

  
 
                         </div>
                        </div>
                            


                        <div className="row">
                          <div className="col-12">
                          <div className="col-12">
                            <label >Referencia</label>

                            </div>
                            <div className="col-12">
                            <Input id="referenciaInput" value={formData.referencia} onChange={(value) => handleInputChange('referencia', value)}/>

                            </div>
                          </div>
                           
                        </div>

                         


                         


                      </div>
                      </div>
                    </div>

                  </div> 
                



              <div className="row ">
                <div className="col-12 d-flex justify-content-center align-items-center">  
                {formComplete ? (
                         <Button text="Continuar" customStyle={{ width: '140px'}} className="cta cta--guinda guinda"   onClick={handleButtonClick}                       />
                     ) : (
                      <Button
                        text="Continuar"
                        customStyle={{ width: '140px'}}
                        disabled
                        className="cta cta--disabled"
                      />
                    )}
                </div>
              </div>

              <ModalInfo   
              show={showModal}
              onHide={closeModal}
              title="Título personalizado"
              content="Contenido personalizado del modal"
              closeButtonLabel="Cerrar"
              saveButtonLabel="Guardar cambios"
              showSaveButton={true}  />


            </div>
          </div>
        </div>

      </div>
 
    </div>
  );
} 


