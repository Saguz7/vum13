"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../public/components/Header';
import Button from '../../../public/components/Button';
import Input from '../../../public/components/Input';
const endPointBack = process.env.NEXT_PUBLIC_END_POINT_BACK;
import axios from 'axios';
import Notificacion from '@public/components/Notificacion';

import styles from './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden', // Deshabilita el scroll
  background: 'white',
};

function Recovery() {
  const [formData, setFormData] = useState({
    correo: 'cesarsantiagoguzman@gmail.com',
    rfc_curp: 'SAGC940106HOCNZS00',

  });

 
  const [formComplete, setFormComplete] = useState(false);
  const [rfcCurpError, setRfcCurpError] = useState(false);
  const [formToShow, setFormToShow] = useState(true);
  const [notificacion, setNotificacion] = React.useState(null);


  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  
    if (!formToShow) {
      // Validaciones para clave_acceso y clave_acceso_repetida
      const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*_?&]{8,}$/.test(value);
      const arePasswordsEqual = formData.clave_acceso_repetida === value;
  
      setFormComplete(isPasswordValid && arePasswordsEqual);
    } else {
      // Validaciones para correo y rfc_curp
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.correo);
      const isRfcCurpValid = formData.rfc_curp.trim() !== ''; // Validación de campo obligatorio
  
      setFormComplete(isEmailValid && isRfcCurpValid);
      setRfcCurpError(!isRfcCurpValid);
    }
  };

  const handleCloseNotification = () => {
    setNotificacion(null); // Resetea la notificación cuando se cierra
  };

  const handleButtonClick = async () => {
 
    const formDataActual = { ...formData };

    if(formToShow){
        // Inicializar formDatainicial
        let formDatainicial = { 
          sort_key: formDataActual.rfc_curp || "",
          correo: formDataActual.correo || "",

        };


 

        try {
          // Realiza la petición POST con Axios
          const response = await axios.post('https://yxd2kb3ui7.execute-api.us-east-1.amazonaws.com/dev/validar-correo-restauracion-contrasena-vum', formDatainicial);
 
          var clave = Object.keys(response.data)[0];
 
          if(clave == 'Correo Valido'){
            setNotificacion({ tipo: 'success', mensaje: 'Correo Valido' });

            setFormToShow(false);
            setFormData({
              clave_acceso: 'Pass1234%',
              clave_acceso_repetida: 'Pass1234%',
              sort_key: formDataActual.rfc_curp || "",
              correo: formDataActual.correo || "",
            });
          }else{
            setNotificacion({ tipo: 'warning', mensaje: 'No existe correo asociado a la CURP / RFC suministrados' });

            setFormToShow(true);

          }

          // Redirige a otra página o realiza otras acciones según tu lógica
          // Puedes usar el router de Next.js para redirigir
          // import { useRouter } from 'next/router';
          // const router = useRouter();
          // router.push('/otra-pagina');
        } catch (error) {
          // Maneja los errores de la petición
          console.error('Error en la petición POST:', error);
          setNotificacion({ tipo: 'warning', mensaje: 'No existe correo asociado a la CURP / RFC suministrados' });

        }

     }else{
       let formDatainicial = { 
        sort_key: formDataActual.sort_key || "",
        contrasena: formDataActual.clave_acceso || "",

      };

       try {
        // Realiza la petición POST con Axios
        const response = await axios.post('https://gimu9ukych.execute-api.us-east-1.amazonaws.com/dev/update-contrasena-test-vum', formDatainicial);
         
 
  
        if(response.data == 'Contrasena actualizada correctamente'){ 
          setNotificacion({ tipo: 'success', mensaje: 'Contraseña actualizada' });

        }else{
          setNotificacion({ tipo: 'warning', mensaje: 'No se completo el proceso' });

        }
      } catch (error) {
        // Maneja los errores de la petición
        console.error('Error en la petición POST:', error);
      }
    }

     
    
  };
  

  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen  ">
        <div className="container">
          <div className="card card-login justify-center margin-top-3">
            <div style={leftSectionStyle} className="row">
              <img
                src="https://ui.michoacan.gob.mx/static/media/LogoGobMich-Artboard1.21e8f905786dd1536f8c.png"
                alt="Logo"
                style={logoStyle}
              />
            </div>
 
            <div>


               {/* Formulario Inicial */}
            {formToShow && (
              <div className="row ">
                <p className="instruction-text">
                  Vamos a validar que tenga una cuenta de correo electrónico asociada a una CURP / RFC. 
                </p>
                 <div className="col-12">
                  <label className="text_medium">Correo electrónico</label>
                </div>
                <div className="col-12">
                  <Input
                                      className="form-max"

                    id="correoInput"
                    value={formData.correo}
                    additionalClass="centered-input"
                    onChange={(value) => handleInputChange('correo', value)}
                  />
                </div>
         

               
                <div className="col-12">
                  <label className="text_medium">CURP / RFC</label>
                </div>
                <div className="col-12">
                  <Input
                                      className="form-max"

                    id="curprfcInput"
                    value={formData.rfc_curp}
                    additionalClass="centered-input"
                    onChange={(value) => handleInputChange('rfc_curp', value)}
                  />
                  {rfcCurpError && <div className="error-message">Campo obligatorio</div>}

                </div> 
           
            </div> 
            )}
            {/* Formulario de Contraseña */}
            {!formToShow && (
              <div className="row">
                <p className="instruction-text">
                Correo validado, favor de escribir su nueva contraseña. 
              </p>
                   <div className="col-12">
                    <label className="text_medium">Contraseña</label>
                  </div>
                  <div className="col-12">
                    <Input
                    className="form-max"

                      id="contrasenaInput"
                      value={formData.clave_acceso}
                      type="password"
                      additionalClass="centered-input"
                      onChange={(value) => handleInputChange('clave_acceso', value)}
                    />
                  </div>
                

                   <div className="col-12">
                    <label className="text_medium">Repetir Contraseña</label>
                  </div>
                  <div className="col-12">
                    <Input
                                        className="form-max"

                      id="contrasenaRepetidaInput"
                      value={formData.clave_acceso_repetida}
                      type="password"
                      additionalClass="centered-input"
                      onChange={(value) => handleInputChange('clave_acceso_repetida', value)}
                    />
                  </div> 
              </div>
            )} 
            </div> 
            <div className="row ">

              {formComplete ? (
                         <Button text="Continuar" customStyle={{ width: '140px', marginTop: '20px', marginBottom: '20px'}} className="cta cta--guinda guinda"   onClick={handleButtonClick}  />
                     ) : (
                      <Button
                        text="Continuar"
                        customStyle={{ width: '140px', marginTop: '20px', marginBottom: '20px'}}
                        disabled
                        className="cta cta--disabled"
                      />
                    )}
 
            </div>
          </div>
          {notificacion && (
            <Notificacion
              tipo={notificacion.tipo}
              mensaje={notificacion.mensaje}
              onClose={handleCloseNotification}
             />
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}

const leftSectionStyle = {
  flex: '0 0 25%',
};

const logoStyle = {
  padding: '10px',
  width: '450px',
};

export default Recovery;