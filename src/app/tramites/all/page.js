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

import Link from "next/link";
import Sidebar from "@public/components/Sidebar";

import "./style.css";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflow: "hidden", // Deshabilita el scroll
  background: "white",
};




export default function Page() {
  const [personaType, setPersonaType] = useState(""); // Estado para controlar el tipo de persona
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handlePersonaTypeChange = (e) => {
    setPersonaType(e.target.value);
  };

  const handleButtonClick = async () => {};
  const [searchTerm, setSearchTerm] = useState("");
  const [processedIndices, setProcessedIndices] = useState([]);

  const menuItems = [
    {
      link: "/tramites/all/vehiculos",
      icon: faCar,
      title: "Vehículos",
    },
    {
      link: "/tramites/all/notarios",
      icon: faTableList,
      title: "Notarios",
    },
    {
      link: "/tramites/all/hospedaje",
      icon: faBuilding,
      title: "Hospedaje",
    },
    {
      link: "/tramites/all/isan",
      icon: faCarSide,
      title: "ISAN",
    },
    {
      link: "/tramites/all/nominas",
      icon: faAddressBook,
      title: "Nomina",
    },
    // Puedes agregar más elementos según sea necesario
  ];

  const filteredMenuItems = menuItems.filter((menuItem) =>
    menuItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLinkClick = (index) => {
    setProcessedIndices([...processedIndices, index]);
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
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="container menu-icon"
                          style={{
                            
                            overflowY: "scroll", 
                            maxHeight: filteredMenuItems.length > 2 ? "60%" : "100%",
                          }}
                        >
                          {filteredMenuItems.map(
                            (menuItem, index) =>
                              // Saltar de dos en dos en la iteración del bucle
                              index % 2 === 0 && (
                                <div className="row icon-card" key={index}>
                                  <div className="col-6">
                                    <div
                                      className="card text-center"
                                      style={{ height: "260px" }}
                                    >
                                      <div style={{ marginTop: "80px" }}>
                                        <Link href={menuItem.link}>
                                          <button className="btn btn-primary">
                                            <FontAwesomeIcon
                                              icon={menuItem.icon}
                                              size="4x"
                                            />
                                          </button>
                                        </Link>
                                      </div>
                                      <h5 className="text-card-central">
                                        {menuItem.title}
                                      </h5>
                                    </div>
                                  </div>

                                  {index + 1 < filteredMenuItems.length && (
                                    <div className="col-6">
                                      <div
                                        className="card text-center"
                                        style={{ height: "260px" }}
                                      >
                                        <div style={{ marginTop: "80px" }}>
                                          <Link
                                            href={
                                              filteredMenuItems[index + 1].link
                                            }
                                          >
                                            <button className="btn btn-primary">
                                              <FontAwesomeIcon
                                                icon={
                                                  filteredMenuItems[index + 1]
                                                    .icon
                                                }
                                                size="4x"
                                              />
                                            </button>
                                          </Link>
                                        </div>
                                        <h5 className="text-card-central">
                                          {filteredMenuItems[index + 1].title}
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
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
      </div>
    </div>
  );
}
