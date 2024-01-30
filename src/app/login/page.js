"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@public/components/Header';
import Button from '@public/components/Button';
import Input from '@public/components/Input';

import styles from './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden', // Deshabilita el scroll
  background: 'white',
};

function Login() {
  const [formData, setFormData] = useState({
    correo: 'cesarsantiagoguzman@gmail.com',
    clave_acceso: 'Pass1234%',
  });

  const [formComplete, setFormComplete] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    correo: '',
    clave_acceso: '',
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*_?&]{8,}$/.test(password);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    let errorMessage = '';

    if (fieldName === 'correo') {
      if (!validateEmail(value)) {
        errorMessage = 'Error en el formato del correo';
      }
    } else if (fieldName === 'clave_acceso') {
      if (!validatePassword(value)) {
        errorMessage =
          'La contraseña debe contener al menos una letra, un caracter especial, y tener un mínimo de 8 caracteres';
      }
    }

    setErrorMessages({
      ...errorMessages,
      [fieldName]: errorMessage,
    });

    const isEmailValid = validateEmail(formData.correo);
    const isPasswordValid = validatePassword(formData.clave_acceso);
    setFormComplete(isEmailValid && isPasswordValid);
  };

  const handleButtonClick = async () => {
    console.log(formData);
  };
  

  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen  ">
        <div className="container">
          <div className="card card-login justify-center margin-top-3">
            <div style={leftSectionStyle} className="row">
              {/* Logo */}
              <img
                src="https://ui.michoacan.gob.mx/static/media/LogoGobMich-Artboard1.21e8f905786dd1536f8c.png"
                alt="Logo"
                style={logoStyle}
              />
            </div>

            <div className="row width-form-content">
              <div className="col-12">
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
                 
              </div>
            </div>

            <div className="row width-form-content">
              <div className="col-12">
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
                 
              </div>
               
            </div>
            <div className="row width-form-content">

            {errorMessages.correo && (
                  <div className="bg-armarillo text-small text-guinda col-12">
                    {errorMessages.correo}
                  </div>
                )}

            {errorMessages.clave_acceso && (
                  <div className="bg-armarillo text-small text-guinda col-12">
                    {errorMessages.clave_acceso}
                  </div>
                )}
                            
            </div>

            <div className="row width-form-content">
              <div className="col-12"> 
                <a href="/recovery" className=" link-secondary me-2">
                  <u className="text-guinda">¿Olvidaste tu contraseña?</u>
                  </a>
                 
              </div>
            </div>

            <div className="row ">

            {formComplete ? (
                         <Button text="Continuar" customStyle={{ width: '140px', marginTop: '20px', marginBottom: '20px'}} className="cta cta--guinda guinda"   onClick={handleButtonClick}                          />
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
          <div></div>
        </div>
      </div>
    </div>
  );
}

const leftSectionStyle = {
  flex: '0 0 25%', // 25% del ancho
};

const logoStyle = {
  //height: '85px',
  padding: '10px',
  width: '450px',
};

export default Login;