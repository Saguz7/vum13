"use client"; // This is a client component 👈🏽
 

import React, { useState } from 'react';
import Header from '../../../public/components/Header';  
import Table from '../../../public/components/Table';  
import Filters from '../../../public/components/Filters';  
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

import './style.css';

const containerStyle = {
  height: '100vh',  // 100% de la altura del viewport
  overflow: 'hidden',  // Deshabilita el scroll
  background: 'white'
};

export default function Page() {
  const options = [
    { value: 'Acto Administrativo', label: 'Acto Administrativo' },
    { value: 'Carta Invitación', label: 'Carta Invitación' },
    { value: 'option3', label: 'Opción 3' },
  ];

  const optionstipos = [
    { value: 'Acto Administrativo', label: 'Acto Administrativo' },
    { value: 'Carta Invitación', label: 'Carta Invitación' },
  ];

  const optionsestatus = [
    { value: 'Notificado', label: 'Notificado' },
    { value: 'Pagado', label: 'Pagado' },
  ];

  const optionsimpuestos = [
    { value: 'Nomina', label: 'Nomina' },
    { value: 'Vehicular', label: 'Vehicular' },
    { value: 'Hospedaje', label: 'Hospedaje' },
  ];

  const columns = [
    { contenido: 'N°', style: '5%' },
    { contenido: 'Actos administrativos', style: '20%' },
    { contenido: 'Estatus', style: '10%' },
    { contenido: 'Impuesto', style: '10%' },
    { contenido: 'N° Ciclo', style: '10%' },
    { contenido: 'Fecha de notificación', style: '20%' },
    { contenido: 'Fecha vencimiento', style: '15%' },
    { contenido: '', style: '5%' },
  ];
  
  const data = [
    [
      { tipo: 'texto', contenido: '#2321', align: 'left' },
      { tipo: 'texto', contenido: 'Carta Invitación', align: 'left' },
      { tipo: 'texto', contenido: 'Notificado', align: 'left' },
      { tipo: 'texto', contenido: 'Hospedaje', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'center' },
      { tipo: 'texto', contenido: '10-05-2023', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#2321', align: 'left' },
      { tipo: 'texto', contenido: 'Acto Administrativo', align: 'left' },
      { tipo: 'texto', contenido: 'Pagado', align: 'left' },
      { tipo: 'texto', contenido: 'Vehicular', align: 'left' },
      { tipo: 'texto', contenido: '3', align: 'center' },
      { tipo: 'texto', contenido: '10-05-2023', align: 'left' },
      { tipo: 'texto', contenido: '10-09-2023', align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#2321', align: 'left' },
      { tipo: 'texto', contenido: 'Acto Administrativo', align: 'left' },
      { tipo: 'texto', contenido: 'Notificado', align: 'left' },
      { tipo: 'texto', contenido: 'Impuesto', align: 'left' },
      { tipo: 'texto', contenido: '1', align: 'center' },
      { tipo: 'texto', contenido: '10-05-2023', align: 'left' },
      { tipo: 'texto', contenido: '10-09-2023', align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#2321', align: 'left' },
      { tipo: 'texto', contenido: 'Carta Invitación', align: 'left' },
      { tipo: 'texto', contenido: 'Notificado', align: 'left' },
      { tipo: 'texto', contenido: 'Hospedaje', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'center' },
      { tipo: 'texto', contenido: '10-05-2023', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#5678', align: 'left' },
      { tipo: 'texto', contenido: 'Acto Administrativo', align: 'left' },
      { tipo: 'texto', contenido: 'Pagado', align: 'left' },
      { tipo: 'texto', contenido: 'Vehicular', align: 'left' },
      { tipo: 'texto', contenido: '3', align: 'center' },
      { tipo: 'texto', contenido: '15-07-2023', align: 'left' },
      { tipo: 'texto', contenido: '25-07-2023', align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#9876', align: 'left' },
      { tipo: 'texto', contenido: 'Acto Administrativo', align: 'left' },
      { tipo: 'texto', contenido: 'Notificado', align: 'left' },
      { tipo: 'texto', contenido: 'Impuesto', align: 'left' },
      { tipo: 'texto', contenido: '1', align: 'center' },
      { tipo: 'texto', contenido: '22-07-2023', align: 'left' },
      { tipo: 'texto', contenido: '30-07-2023', align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
    ],
    [
      { tipo: 'texto', contenido: '#2321', align: 'left' },
      { tipo: 'texto', contenido: 'Carta Invitación', align: 'left' },
      { tipo: 'texto', contenido: 'Notificado', align: 'left' },
      { tipo: 'texto', contenido: 'Hospedaje', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'center' },
      { tipo: 'texto', contenido: '10-05-2023', align: 'left' },
      { tipo: 'texto', contenido: null, align: 'left' },
      { tipo: 'boton', contenido: 'PDF', align: 'center' },
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
      (!selectedTipo || row[1].contenido === selectedTipo.value) &&
      (!selectedEstatus || row[2].contenido === selectedEstatus.value) &&
      (!selectedImpuesto || row[3].contenido === selectedImpuesto.value)
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
    <div style={containerStyle}>
      <Header />
      <div className="bg-white min-h-screen  ">
      <div className="container">
      <div className="text-big text-bold text-guinda text-center padding-elements ">Buzón tributario</div>

      <div className="card">
 
        <div className="bg-white flex flex-col ">
          <div className="d-flex w-100 form-select-type">
          <div className="card card-filters"> 
          <div className="row"> 
          <div className="col-3">
                      <Select
                        options={optionstipos}
                        value={selectedTipo}
                        onChange={handleTipoChange}
                        placeholder="Filtrar por Tipo"
                        isClearable
                      />
                    </div>
                    <div className="col-3">
                      <Select
                        options={optionsestatus}
                        value={selectedEstatus}
                        onChange={handleEstatusChange}
                        placeholder="Filtrar por Estatus"
                        isClearable
                      />
                    </div>
                    <div className="col-3">
                      <Select
                        options={optionsimpuestos}
                        value={selectedImpuesto}
                        onChange={handleImpuestoChange}
                        placeholder="Filtrar por impuesto"
                        isClearable
                      />
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
                previousLabel="<<"
                nextLabel=">>"
              />
          </div>


        </div>
        </div>

      </div>


     
    </div>
  );
}