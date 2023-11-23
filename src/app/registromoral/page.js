 
"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';
import axios from 'axios';

import Input from '@public/components/Input';
import FileInput from '@public/components/FileInput'; // Corregir el import
import Button from '@public/components/Button';
import PersonaForm from '@public/components/PersonaForm'; // Ajusta la ruta
import Sidebar from '@public/components/Sidebar';
import Notificacion from '@public/components/Notificacion';
import './style.css';
import Link from 'next/link'; 
const endPointBack = process.env.NEXT_PUBLIC_END_POINT_BACK;
 import { useRouter } from 'next/navigation';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

export default function Page() {


  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [personaType, setPersonaType] = useState('');
  const [notificacion, setNotificacion] = React.useState(null);

  const [formData, setFormData] = useState({
    // Campos comunes a ambas personas
    rfc: 'SAGC940106BU3',
    correo: 'cesarsantiagoguzman@gmail.com',
    confirmacion_correo: 'cesarsantiagoguzman@gmail.com',
    telefono_celular: '9511819193',
    telefono_residencial: '9511819193',

    // Campos específicos de Persona Física (inicializados como vacíos)
    curp: 'SAGC940106HOCNZS00',
    nombre: 'CESAR',
    primer_apellido: 'SANTIAGO',
    segundo_apellido: 'GUZMAN',
    
    // Campos específicos de Persona Moral (inicializados como vacíos)
    razon_social: 'EMPRESA SA DE CV',
    clave_acceso: 'Pass1234%',
    clave_acceso_repetida: 'Pass1234%',
  });
  const [formComplete, setFormComplete] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handlePersonaTypeChange = (e) => {
    const newPersonaType = e.target.value;
    setPersonaType(newPersonaType);
  };

  const [errors, setErrors] = useState({
    rfc: false,
    razon_social: false,
    correo: false,
    confirmacion_correo: false,
    telefono_celular: false,
    telefono_residencial: false
  });

  const handleInputChange = (fieldName, value) => {

 
    // Validar según el campo
    let isValid = true;

    switch (fieldName) {
      case 'curp':
        isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,8}$/.test(value);
        break;
      case 'rfc':
        isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,3}$/.test(value);
        break;
      case 'razon_social':
        isValid = /^[A-Za-z\s]*$/.test(value);
        break;
      case 'nombre':
      case 'primer_apellido':
      case 'segundo_apellido':
        isValid = /^[A-Za-z\s]*$/.test(value);
        break;
      // Para correoElectronico y confirmacionCorreo
      case 'correo':
      case 'confirmacion_correo':
      //  isValid = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(value);

        break;

      case 'telefono_celular':
        case 'telefono_residencial':
        isValid = /^[\d\s()-]*$/.test(value);
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
      let isFormComplete;
   
         isFormComplete =
          /^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{3}$/.test(formData.rfc) &&
          /^[A-Za-z\s]*$/.test(formData.razon_social) &&
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(formData.correo) &&
          formData.confirmacion_correo !== '' &&
          /^[\d\s()-]*$/.test(formData.telefono_celular) && /^[\d\s()-]*$/.test(formData.telefono_residencial);
      
  
      setFormComplete(isFormComplete);
    }, 500); // Puedes ajustar el tiempo de espera según tus necesidades
  
    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formData, personaType]);



 


  const handleButtonClick = async () => {
   // setNotificacion({ tipo: 'success', mensaje: '¡Operación exitosa!' });
   // setNotificacion({ tipo: 'warning', mensaje: '¡Operación exitosa!' });

    setNotificacion({ tipo: 'success', mensaje: '¡Operación exitosa!' });
    router.push('/registromoral/direccion');

    /*
    setNotificacion({ tipo: 'success', mensaje: '¡Operación exitosa!' });

    const formDataActual = { ...formData };

    // Inicializar formDatainicial
    let formDatainicial = {
      part_key: "contribuyente",
      
    };
    
    // Agregar datos específicos según el tipo de persona
    if (personaType === 'fisica') {
      formDatainicial = {
        ...formDatainicial,
        tipo_persona: "F",
        rfc: formDataActual.rfc || "",
        sort_key: formDataActual.curp,
        correo: formDataActual.correo || "",
        confirmacion_correo: formDataActual.confirmacion_correo || "",
        telefono_celular: formDataActual.telefono_celular || "",
        telefono_residencial: formDataActual.telefono_residencial || "",
        curp: formDataActual.curp || "",
        nombre: formDataActual.nombre || "",
        primer_apellido: formDataActual.primer_apellido || "",
        segundo_apellido: formDataActual.segundo_apellido || "",
      };
    } else if (personaType === 'moral') {
      formDatainicial = {
        ...formDatainicial,
        tipo_persona: "M",
        sort_key: formDataActual.rfc,
        rfc: formDataActual.rfc || "",
        correo: formDataActual.correo || "",
        confirmacion_correo: formDataActual.confirmacion_correo || "",
        telefono_celular: formDataActual.telefono_celular || "",
        telefono_residencial: formDataActual.telefono_residencial || "",
        razon_social: formDataActual.razon_social || "",
      };
    }

    console.log(formDatainicial);
    
    console.log(endPointBack + 'vum-registro-test');

   
    try {
      // Realiza la petición POST con Axios
      const response = await axios.post(endPointBack + 'vum-registro-test', formDatainicial);
      
      // Maneja la respuesta según tus necesidades
      console.log('Respuesta del servidor:', response.data);
      console.log( response.data);

      // Redirige a otra página o realiza otras acciones según tu lógica
      // Puedes usar el router de Next.js para redirigir
      // import { useRouter } from 'next/router';
      // const router = useRouter();
      // router.push('/otra-pagina');
    } catch (error) {
      // Maneja los errores de la petición
      console.error('Error en la petición POST:', error);
    }

    */

   
    // Lógica que deseas ejecutar al hacer clic en el botón
    console.log('Botón clicado');
    // Puedes agregar más lógica aquí
  };
  

  const handleCloseNotification = () => {
    setNotificacion(null); // Resetea la notificación cuando se cierra
  };


  return (
    <div style={containerStyle}>
    <Header />
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onClick={handleButtonClick} />


      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="card margin-top-3">

            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
               
  
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
                          <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label >RFC (*)</label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.rfc}  onChange={(value) => handleInputChange('rfc', value)}/>

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-md-12">
                          <div className="col-12">
                            <label >Razón Social (*)</label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.razon_social}  onChange={(value) => handleInputChange('razon_social', value)}/>

                            </div>
                          </div> 
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label >Correo eletrónico</label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.correo}  onChange={(value) => handleInputChange('correo', value)}/>

                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label >Confirmación correo eletrónico</label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.confirmacion_correo}  onChange={(value) => handleInputChange('confirmacion_correo', value)}/>

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label >Teléfono Celular(*)</label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.telefono_celular}  onChange={(value) => handleInputChange('telefono_celular', value)}/>

                            </div>
                          </div>

                          <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label >Teléfono Residencial </label>

                            </div>
                            <div className="col-12">
                            <Input value={formData.telefono_residencial}  onChange={(value) => handleInputChange('telefono_residencial', value)}/>

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
                         <Button text="Continuar" customStyle={{ width: '140px'}} className="cta cta--guinda guinda"   onClick={handleButtonClick}                         />
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

            </div>

            {notificacion && (
            <Notificacion
              tipo={notificacion.tipo}
              mensaje={notificacion.mensaje}
              onClose={handleCloseNotification}
             />
          )}

          </div>
        </div>
        
      </div>
 
    </div>
  );
} 


