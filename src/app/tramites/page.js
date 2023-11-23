"use client"; // This is a client component 👈🏽
 

import React, { useState, useEffect } from 'react';
import Header from '@public/components/Header';  
import Table from '@public/components/Table';  
import Filters from '@public/components/Filters';  
import Button from '@public/components/Button';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import Sidebar from '@public/components/Sidebar';

import './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

export default function Page() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', closeSidebar);

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, []);

  const handleButtonClick = (e) => { 
    e.stopPropagation();
  };

  const options = [
    { value: 'Alta Vehículo', label: 'Alta Vehículo' },
    { value: 'Notario', label: 'Notario' },
    { value: 'Hospedaje', label: 'Hospedaje' },
    { value: 'Nomina', label: 'Nomina' },
    { value: 'ISAN', label: 'ISAN' } 

  ];

  const optionstipos = [
    { value: 'Alta Vehículo', label: 'Alta Vehículo' },
    { value: 'Notario', label: 'Notario' },
    { value: 'Hospedaje', label: 'Hospedaje' },
    { value: 'Nomina', label: 'Nomina' },
    { value: 'ISAN', label: 'ISAN' } 
  ];

  const optionsestatus = [
    { value: 'Revisión', label: 'Revisión' },
    { value: 'Finalizado', label: 'Finalizado' },
    { value: 'Orden de pago generada', label: 'Orden de pago generada' },
    { value: 'Cita agendada', label: 'Cita agendada' },

  ];
 

  const columns = [
    { contenido: 'Nombre del trámite', style: '40%' },
    { contenido: 'Estatus', style: '15%' },
    { contenido: 'Comentario', style: '35%' },
    { contenido: '', style: '10%' }
  ];
  
  const data = [ 
    [
      { tipo: 'texto', contenido: 'Alta Vehículo', align: 'left' },
      { tipo: 'texto', contenido: 'Revisión', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'Notario', align: 'left' },
      { tipo: 'texto', contenido: 'Finalizado', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'Hospedaje', align: 'left' },
      { tipo: 'texto', contenido: 'Orden de pago generada', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'Nomina', align: 'left' },
      { tipo: 'texto', contenido: 'Cita agendada', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'ISAN', align: 'left' },
      { tipo: 'texto', contenido: 'Revisión', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'Notario', align: 'left' },
      { tipo: 'texto', contenido: 'Cita agendada', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'Alta Vehículo', align: 'left' },
      { tipo: 'texto', contenido: 'Orden de pago generada', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: 'ISAN', align: 'left' },
      { tipo: 'texto', contenido: 'Finalizado', align: 'left' },
      { tipo: 'texto', contenido: 'En proceso', align: 'left' },
      { tipo: 'boton', contenido: 'Detalles', align: 'center' },
    ]
  ];


  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedEstatus, setSelectedEstatus] = useState(null);
  const [selectedImpuesto, setSelectedImpuesto] = useState(null);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
 

  // Filtrar la tabla según las selecciones
  const filteredData = data.filter((row) => {
    if (
      (!selectedTipo || row[0].contenido === selectedTipo.value) &&
      (!selectedEstatus || row[1].contenido === selectedEstatus.value) 
    ) {
      return true;
    }
    return false;
  });
 
  

  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);

  const handleTipoChange = (selected) => {
    setSelectedTipo(selected);
  };

  const handleEstatusChange = (selected) => {
    setSelectedEstatus(selected);
  };

  const handleImpuestoChange = (selected) => {
    setSelectedImpuesto(selected);
  };
 
  return (
    <div style={containerStyle} className="main-content">
 
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onClick={handleButtonClick} />

      <div className="bg-white min-h-screen  ">
      <div className="container">
 
      <div className="card">

        <div className="bg-white flex flex-col ">
          <div className="d-flex w-100 form-select-type">
          <div className="card card-filters"> 
          <div className="row"> 
          <div className="col-sm-12 col-md-3">
                      <Select
                        options={optionstipos}
                        value={selectedTipo}
                        onChange={handleTipoChange}
                        placeholder="Filtrar por Tipo"
                        isClearable
                      />
                    </div>
                    <div className="col-sm-12 col-md-3">
                      <Select
                        options={optionsestatus}
                        value={selectedEstatus}
                        onChange={handleEstatusChange}
                        placeholder="Filtrar por Estatus"
                        isClearable
                      />
                    </div> 
                    <div className="col-sm-12 col-md-3">
                        <div className="col-12 d-flex justify-content-end align-items-center">
                          <a href="tramites/all">
                            <Button text="Iniciar Trámite" customStyle={{ width: '180px' }} />
                          </a>
                        </div>
                    </div> 

          </div>

           
          </div>

               
          </div>
         

 
          <Table columns={columns} data={paginatedData}></Table>
          <ReactPaginate
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                previousLabel="Anterior"
                nextLabel="Siguiente"
              />
          </div>


        </div>
        </div>

      </div>


     
    </div>
  );
}