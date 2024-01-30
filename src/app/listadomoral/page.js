"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';
import Footer from '@public/components/Footer';
import Link from 'next/link';
import Sidebar from '@public/components/Sidebar';
 
import Input from '@public/components/Input';
import FileInput from '@public/components/FileInput'; 
import Button from '@public/components/Button';

import ModalInfo from '@public/components/ModalInfo';  
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/UserContext';
import { useDarkMode } from '@/app/DarkModeContext';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
 
import './style.css';
import getConfig from '@raiz/config';

 

 export default function Page() {
  const { END_POINT_BACK } = getConfig();

  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const router = useRouter();
  const { updateUser } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { userData, logout } = useUser();
  const [empresas, setEmpresas] = useState([]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    minHeight: '100vh',
    overflow: 'hidden', // Deshabilita el scroll
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black' 

  };

  const contentContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
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

    return () => clearTimeout(timeoutId); 
  }, [formData, selectedOffice]);

  const handleSelectOffice = (officeId) => {
    console.log(officeId);

    setSelectedOffice(officeId === selectedOffice ? null : officeId);
  };

  const handleButtonClick = async () => { 
    console.log(selectedOffice);
       updateUser({ 
        persona_moral: selectedOffice.nombre 
      });
  
        router.push('/buzon'); 

  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDeleteClick = (e,  id) => {
    console.log(id);

    let envioenlace = {
      body: {
        rfc_representante: userData.rfc,
        rfc_representado: id
       }
      }
    axios.post(
     // 'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/representante/eliminar', 
     END_POINT_BACK + "/representante/eliminar",
      envioenlace)
      .then(response => {
        actualizardatos(); 
      })
      .catch(error => {
        console.error('Error en la petición inicial:', error);
      });

  };


  const actualizardatos = () => {
    let envioenlace = {
      body: {
        rfc: userData.rfc,
       }
      }
    axios.post(
      //'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/representante/listar', 
      END_POINT_BACK + "/representante/listar",
      envioenlace)
      .then(response => {
         
        const nuevasEmpresas = response.data.body.map(item => ({
          id: item.rfc,
          nombre: item.razon_social,
          rfc: item.rfc,
        }));

        setEmpresas(nuevasEmpresas);

         

      })
      .catch(error => {
        console.error('Error en la petición inicial:', error);
      });
  }

    


  useEffect(() => {
    actualizardatos();
  }, []); // El array de dependencias está vacío para que esta useEffect solo se ejecute una vez en la carga inicial


  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
      <div style={contentContainerStyle}>

      <div className="min-h-screen">
        <div className="container">
          <div className={`card margin-top-3 ${isDarkMode ? 'dark-mode-card' : ''}`}>
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
                          className={`row office-container ${empresa.id === selectedOffice?.id ? 'selected' : ''}`}
                          onClick={() => handleSelectOffice(empresa)}
                        >
                          <div className="col s10">
                            <h3>{empresa.nombre}</h3>
                            <p>RFC: {empresa.rfc}</p>
                          </div>
                          <div className="col s2 d-flex justify-content-end">
                          <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDeleteClick(e, empresa.id)} />

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

      <Footer />
 
    </div>
  );
}