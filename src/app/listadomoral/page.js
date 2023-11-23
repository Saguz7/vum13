"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';
import Link from 'next/link';

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

const empresas = [
  { 
    id: 1, 
    nombre: 'Empresa 1', 
    rfc: 'XXXXXXXX1', 
    
  },
  { 
    id: 2, 
    nombre: 'Empresa 2', 
    rfc: 'XXXXXXXX2', 
  }, 
  // Agrega más oficinas según sea necesario
];
export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const router = useRouter();

  const openModal = () => {
    console.log("Abriendo modal..."); // Agrega un console.log
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);
  };

  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({
    estado: false,
    municipio: false
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let isFormComplete = true;
      setFormComplete(isFormComplete && selectedOffice !== null);
    }, 500);

    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formData, selectedOffice]);

  const handleSelectOffice = (officeId) => {
    setSelectedOffice(officeId === selectedOffice ? null : officeId);
  };

  const handleButtonClick = async () => {
    // Lógica para manejar el clic en el botón después de seleccionar una oficina
    console.log("Botón clickeado");

    router.push('/buzon');

  };

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
                    <p style={{ textAlign: 'center' }}>
                    Seleccione la empresa a la cual quiere entrar para visualizar su buzón tributario.
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ul className="navbar-nav d-flex align-items-center">
                      <li className="itemNav-header text">
                        <Link href="/registromoral" className="nav-link">
                          Nueva Persona Moral 
                        </Link> 
                      </li> 
                    </ul>
                  </div>
 
 
                  <div className="row">
                    <ul>
                      {empresas.map((empresa) => (
                        <div
                          key={empresa.id}
                          className={`row office-container ${empresa.id === selectedOffice ? 'selected' : ''}`}
                          onClick={() => handleSelectOffice(empresa.id)}
                        >
                          <div className="col s10">
                            <h3>{empresa.nombre}</h3>
                            <p>RFC: {empresa.rfc}</p>
                          </div>
                          <div className="col s2">
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="row ">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      {formComplete ? (
                        <Button text="Continuar" customStyle={{ width: '140px'}} className="cta cta--guinda guinda" onClick={handleButtonClick} />
                      ) : (
                        <Button text="Continuar" customStyle={{ width: '140px'}} disabled className="cta cta--disabled" />
                      )}
                    </div>
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