"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import Header from "@public/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from '@public/components/Button';
import Footer from "@public/components/Footer";
import { useDarkMode } from "src/app/DarkModeContext";

import Link from "next/link";
import Sidebar from "@public/components/Sidebar";

import "./style.css";

 
export default function Page() {
  const [personaType, setPersonaType] = useState(""); // Estado para controlar el tipo de persona
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { isDarkMode } = useDarkMode();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handlePersonaTypeChange = (e) => {
    setPersonaType(e.target.value);
  };

  const handleButtonClick = async () => {};
  const [searchTerm, setSearchTerm] = useState("");
  const [processedIndices, setProcessedIndices] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleMouseEnter = (index, subIndex) => {
    const uniqueIndex = `${index}_${subIndex}`;
    setHoveredIndex(uniqueIndex);
    setShowAdditionalInfo(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setShowAdditionalInfo(false);
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  
  const contentContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };
  const menuItems = [
    {
      link: "/tramites/all/vehiculos",
      icon: faCar,
      title: "Vehículos",
      subtramites: [
        {
          link: "/tramites/all/vehiculos/altavehiculo",
          icon: faPlus,
          title: "Alta de vehículo",
          descripcion: "El alta de vehículos deberá hacerse dentro de los 15 días hábiles posteriores a la factura, de lo contrario se aplica una multa por extemporaneidad."
        },
        {
          link: "/tramites/all/vehiculos/altavehiculo",
          icon: faMinus,
          title: "Baja de vehículo",
          descripcion: ""

        },
      ],
    },
    {
      link: "/tramites/all/notarios",
      icon: faTableList,
      title: "Notarios",
      subtramites: [
        {
          link: "/tramites/all/notarios/altanotario",
          icon: faPlus,
          title: "Alta de Notario",
          descripcion: ""

        },
      ],
    },
    {
      link: "/tramites/all/hospedaje",
      icon: faBuilding,
      title: "Hospedaje",
      subtramites: [
        {
          link: "/tramites/all/hospedaje/altahospedaje",
          icon: faPlus,
          title: "Alta de Hospedaje",
          descripcion: ""

        },
      ],
    },
    {
      link: "/tramites/all/isan",
      icon: faCarSide,
      title: "ISAN",
      subtramites: [
        {
          link: "/tramites/all/isan/altaisan",
          icon: faPlus,
          title: "Alta de ISAN",
          descripcion: ""

        },
      ],
    },
    {
      link: "/tramites/all/nominas",
      icon: faAddressBook,
      title: "Nomina",
      subtramites: [
        {
          link: "/tramites/all/nominas/altanomina",
          icon: faPlus,
          title: "Alta de Nomina",
          descripcion: ""

        },
      ],
    },
    // Puedes agregar más elementos según sea necesario
  ];

  const filteredMenuItems = menuItems.filter((menuItem) =>
    menuItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLinkClick = (index) => {
    setProcessedIndices([...processedIndices, index]);
  };

  const renderSubMenuItems = (index,subtramites) => {
    return (
      <div className="subtramites-container">
        {subtramites.map((subtramite, subIndex) => (
          <div key={subIndex} className="subtramite-item" onMouseEnter={() => handleMouseEnter(index, subIndex)}
          onMouseLeave={handleMouseLeave}>
            <div  key={subIndex} 
            className={`subtramite-item ${hoveredIndex === `${index}_${subIndex}` ? "hovered" : ""}`}
             >
              <Link href={subtramite.link}>
              <div className="circle-container">
                <FontAwesomeIcon
                  icon={subtramite.icon}
                  size="1x"
                  style={{
                    cursor: "pointer",
                    color: "white", // Color del icono
                  }}
                />
              </div>
              <span  >
        {subtramite.title}
      </span> 
       
              </Link>
            </div>
            
            {hoveredIndex === `${index}_${subIndex}` && showAdditionalInfo && subtramite.descripcion !== "" && (
              <div className="bg-armarillo card-width80 border-bottom--rosa center-menu-items " style={{ margin: "10px" }}>
                                <p style={{ margin: "10px" }}>{subtramite.descripcion}</p>

              </div>
             )}
 

          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onClick={handleButtonClick}
      />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="row">
            <div className="d-flex flex-column justify-content-center align-items-center mt-4  ">
              <div className="container">
                <div className="card card-iconos ">
                  <div className="row justify-content-center align-items-center ">
                    <div className="row">
                      <div className="container justify-content-center align-items-center">
                        <div className="row">
                          <div className="row  ">
                            <div className="col-4">
                              <div className="col-12">
                                <input
                                  className="form-input-search"
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  placeholder="Ingrese el nombre del trámite que desee buscar"

                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="container menu-icon"
                          style={{ 
                            overflowY: "scroll", 
                            maxHeight: "450px",
                          }}
                        >
                          <div className="timeline card">
                            <ul>
                              {filteredMenuItems.map((menuItem, index) => (
                                <li className="marginCard card-size-92">
                                  <div className="grid grid-nogutter">
                                    <div className="col-fixed align-self-top">
                                      <div className="icon-container-dashboard">
                                        <FontAwesomeIcon
                                          icon={filteredMenuItems[index].icon}
                                          size="2x"
                                          style={{
                                            marginTop: "8px",
                                            cursor: "pointer",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col card card-size-80">
                                    <div className="event-owner-container">
                                        <div className="event-owner">
                                          {filteredMenuItems[index].title}
                                        </div>
                                        <div className=" event-owner-right">
                                        <Button
                                            text="Trámite en Línea"
                                            customStyle={{ width: '200px' }}
                                            className="pill" // Agrega clase btn-sm para botones responsivos
                                          />
                                         </div>
                                      </div>

                                      
                                      <div className="col">
                                        {menuItem.subtramites &&
                                          renderSubMenuItems(
                                            index,menuItem.subtramites
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
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
