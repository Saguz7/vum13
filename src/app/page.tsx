"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Header from "@public/components/Header";
import Sidebar from "@public/components/Sidebar";
import axios from "axios";
import { useDarkMode } from "./DarkModeContext";
import Button from "@public/components/Button";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import Footer from "@public/components/Footer";

const containerStyle = {
  height: "100vh",
  overflow: "hidden",
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { isDarkMode } = useDarkMode();
  const [isLoader, setIsLoader] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeSidebar);

    return () => {
      document.removeEventListener("click", closeSidebar);
    };
  }, []);
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    /*

    axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/llave/obtener-usuario', 
    {
    code: codeParam
  })
  .then(response => { 
    console.log(response);

  })
  .catch(error => {
    // Manejar errores de la petición
    console.error('Error en la petición:', error);
    // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
  });

  */
 
 
  }, []);

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const dotStyle = { backgroundColor: "rgb(25, 70, 187)" };

  const enlaceusuarionuevo = async () => {
    router.push("/registro");
  };

  const enlacellave = async () => {
    router.push("https://10.8.7.96");
  };
  const logoStyle = {
    //height: '85px',
    padding: "10px",
    width: "450px",
    marginLeft: "60px",
  };
  const enlaceusuariosregistrado = async () => {
    updateUser({
      tipo_persona: "Fisica",
      nombre_persona: "Cesar Santiago Guzman",
      rol_persona: "contribuyente",
    });

    router.push("/buzon");
  };
  return (
    <div>
      <Header />

      <div className=" min-h-screen">
        <div className="container center-align">
          <div className=" min-h-screen">
            <div className="container center-align">
              <div
                className={`card card-login d-flex flex-column justify-content-center align-items-center margin-top-3 ${
                  isDarkMode ? "dark-mode-card" : ""
                }`}
              >
                <h2 style={{ textAlign: "center", marginTop: "10%" }}>
                Bienvenido a la Ventanilla Única Michoacán.
                </h2><br/> 

                <div >
                  {isDarkMode ? (
                    <img
                      src="https://michoacan.gob.mx/cdn/img/logo-blanco.png"
                      alt="Logo"
                      style={logoStyle}
                    />
                  ) : (
                    <img
                      src="https://michoacan.gob.mx/cdn/img/logo.png"
                      alt="Logo"
                      style={logoStyle}
                    />
                  )}
                </div>
                
                <text style={{  marginTop: "1rem",marginLeft: "1rem",marginRight: "1rem" }}>
                Por favor, inicie sesión utilizando la herramienta Llave 2.0.  
                </text>
                <text style={{  marginTop: "1rem",marginLeft: "1rem",marginRight: "1rem" }}>
                También tiene la opción de registrarse seleccionando la pestaña 'Registro' o siguiendo el enlace proporcionado a continuación.
                </text>
                
                

                <Button
                        onClick={enlacellave}
                        text="Llave 2.0"
                        customStyle={{ width: '240px',marginTop: '2rem', marginBottom: '2rem'}}
                        className="cta cta--guinda guinda"
                        disabled={false}
                        isLoading={false}
                      />

                  {isLoader && (
                          <div className="dottedloader dottedloader--re" style={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
                            <div className="dottedloader_dot" style={dotStyle}></div>
                            <div className="dottedloader_dot" style={dotStyle}></div>
                            <div className="dottedloader_dot" style={dotStyle}></div>
                          </div>
                        )}


                 
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}
