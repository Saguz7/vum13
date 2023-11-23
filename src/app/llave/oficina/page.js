"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';

import Input from '@public/components/Input';
import FileInput from '@public/components/FileInput'; // Corregir el import
import Button from '@public/components/Button';

import ModalInfo from '@public/components/ModalInfo'; // Asegúrate de ajustar la ruta de importación

import './style.css';
import { useRouter } from 'next/navigation';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

const oficinas = [
  { 
    id: 1, 
    nombre: 'Dirección de Ingresos de la Secretaría de Finanzas y Administración', 
    direccion: 'C. Ortega y Montañes 290, Centro histórico de Morelia, 58000 Morelia, Mich.', 
    coordenadas: { latitud: 19.4326, longitud: -99.1332 },
    imagen: 'url_de_la_imagen_oficina_a.jpg'
  },
  { 
    id: 2, 
    nombre: 'Secretaria de Finanzas y Administración del Gobierno del Estado de Michoacán', 
    direccion: 'Calz. Ventura Puente 112, Chapultepec Nte., 58260 Morelia, Mich.', 
    coordenadas: { latitud: 20.6736, longitud: -103.3447 },
    imagen: 'url_de_la_imagen_oficina_b.jpg'
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

    router.push('/llave/terminos');

    // Lógica para manejar el clic en el botón después de seleccionar una oficina
    console.log("Botón clickeado");
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
                      Se acuerdo a su dirección dada, favor de seleccionar la oficina a la cual hará sus trámites.
                    </p>
                  </div>

                  <div className="row">
                    <ul>
                      {oficinas.map((oficina) => (
                        <div
                          key={oficina.id}
                          className={`row office-container ${oficina.id === selectedOffice ? 'selected' : ''}`}
                          onClick={() => handleSelectOffice(oficina.id)}
                        >
                          <div className="col s10">
                            <h3>{oficina.nombre}</h3>
                            <p>Dirección: {oficina.direccion}</p>
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