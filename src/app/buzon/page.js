"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Header from "@public/components/Header";
import Table from "@public/components/Table";
import Filters from "@public/components/Filters";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import Sidebar from "@public/components/Sidebar";
import { useDarkMode } from "src/app/DarkModeContext";
import axios from "axios";
import Button from "@public/components/Button";
import Footer from "@public/components/Footer";
import getConfig from '@raiz/config';
import { useUser } from 'src/app/UserContext';

import "./style.css";

export default function Page() {

  const { END_POINT_BACK } = getConfig();
  const { userData } = useUser();

  
  const [buzonData, setBuzonData] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [data, setData] = useState([]); // Utilizar el estado para data

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


  const estatusData = [
    { codigo: null, estatus: 'INICIAL' },
    { codigo: '001', estatus: 'ASIGNAR CARTA INVITACIÓN' },
    { codigo: '002', estatus: 'RESULTADO DE CARTA' },
    { codigo: '005', estatus: 'OMISO' },
    { codigo: '010', estatus: 'ASIGNADO' },
    { codigo: '015', estatus: 'CITADO' },
    { codigo: '020', estatus: 'NOTIFICADO' },
    { codigo: '025', estatus: 'INCUMPLIDO' },
    { codigo: '030', estatus: 'ASIGNADO' },
    { codigo: '035', estatus: 'CITADO' },
    { codigo: '040', estatus: 'NOTIFICADO' },
    { codigo: '045', estatus: 'INCUMPLIDO' },
    { codigo: '050', estatus: 'ASIGNADO' },
    { codigo: '055', estatus: 'CITADO' },
    { codigo: '060', estatus: 'NOTIFICADO' },
    { codigo: '061', estatus: 'INCUMPLIDO' },
    { codigo: '062', estatus: 'MULTA ASIGNADA' },
    { codigo: '063', estatus: 'MULTA CITADA' },
    { codigo: '064', estatus: 'MULTA NOTIF' },
    { codigo: '065', estatus: 'NO LOCALIZADO' },
    { codigo: '070', estatus: 'IMPUGNADO' },
    { codigo: '075', estatus: 'CANCELADO' },
    { codigo: '080', estatus: 'EN ESPERA DE PAGO' },
    { codigo: '085', estatus: 'PAGADO' },
    { codigo: '090', estatus: 'TURNADO AUDITORIA' },
    { codigo: '095', estatus: 'TURNADO COBRANZA' },
    { codigo: '100', estatus: 'ESPERA DE TURNADO' },
    { codigo: '105', estatus: 'CONVENIDO' },
    { codigo: '110', estatus: 'NO TRABAJADO' },
  ];


  const obtenerEstatusPorCodigo = (codigo) => {
    console.log(codigo);
    const resultado = estatusData.find((item) => Number(item.codigo) === Number(codigo));
    console.log(resultado);

    return resultado ? resultado.estatus : 'INICIAL';
  };


  const obtenerUltimaFechaNotificacion = (currentItem) => {
    let ultimaFecha = null;
    
    for (let i = 1; i <= 3; i++) {
      const fechaNotif = currentItem[`fecha_notif_${i}`];
  
      if (fechaNotif) {
        ultimaFecha = fechaNotif;
      }
    }
  
    return ultimaFecha;
  };


  const obtenerUltimoIndiceFechaNotificacion = (currentItem) => {
    let ultimoIndice = null;
  
    for (let i = 1; i <= 3; i++) {
      const fechaNotif = currentItem[`fecha_notif_${i}`];
  
      if (fechaNotif) {
        ultimoIndice = i;
      }
    }
  
    return ultimoIndice;
  };


const formatearFecha = (fechaString) => {
  if (fechaString === null) {
    return "Fecha no disponible";
  }

  const [dia, mes, anio] = fechaString.split('.');
  return `${dia}-${mes}-${anio}`;
};

const obtenerNumeroAlFinal = (cadena) => {
  // Utilizamos una expresión regular para extraer el número al final de la cadena
  const match = cadena.match(/\d+$/);

  // Si hay un número al final, lo devolvemos; de lo contrario, devolvemos 1
  return match ? parseInt(match[0], 10) : 1;
};

const eliminarNumerosAlFinal = (cadena) => {
  // Utilizamos una expresión regular para eliminar los números al final de la cadena
  return cadena.replace(/\d+$/, '');
};



  const consultarBuzon = async () => {
    try {
      console.log(userData);
      console.log(userData.rfc);

    
      const response = await axios.post(
        'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/buzon-tributario/consultar',
        {
          rfc: userData.rfc
        }
      );

      // Aquí puedes manejar la respuesta del servidor según tus necesidades
      // setBuzonData(response.data);

      let newdata = [];
      let impuestosSet = new Set(); // Conjunto para almacenar valores únicos de tipo_obli
      let estatusSet = new Set(); // Conjunto para almacenar valores únicos de tipo_obli
      let tiposSet = new Set(); // Conjunto para almacenar valores únicos de tipo_obli

      console.log(response.data);

      for (let i = 0; i < response.data.length; i++) {
        
        // Realizar operaciones con cada elemento de response.data según sea necesario
        const currentItem = response.data[i];
        let estatus = currentItem.id_caso ? currentItem.desc_estatus  : "ENTREGADO"
        console.log(`Elemento ${i + 1}:`, currentItem);
        let tipo = currentItem.id_caso ? "Acto Administrativo" : "Carta Invitación"
        newdata.push([
          { tipo: "texto", contenido: currentItem.id_caso , align: "left" },
          { tipo: "texto", contenido: tipo, align: "left" },
          {
            tipo: "texto",
            contenido: eliminarNumerosAlFinal(estatus)   ,
            align: "left",
          },
          { tipo: "texto", contenido: currentItem.tipo_obli, align: "left" },
          { tipo: "texto", contenido: obtenerNumeroAlFinal(currentItem.desc_estatus), align: "center" },
          {
            tipo: "texto",
            contenido: formatearFecha( currentItem.fecha_notificacion) ,
            align: "left",
          },
          {
            tipo: "texto",
            contenido: formatearFecha(currentItem.fecha_vencimiento),
            align: "left",
          },
          { tipo: "pdf", contenido: currentItem.docu_pdf, align: "center" },
        ]);
        impuestosSet.add( currentItem.tipo_obli );
        estatusSet.add( obtenerEstatusPorCodigo(currentItem.estatus)  );
        tiposSet.add( tipo );

      }
      console.log('.............................');
      console.log(estatusSet);
      console.log('.............................');

      setData(newdata);
      const impuestosArray = Array.from(impuestosSet).map(elemento => ({ value: elemento, label: elemento }));
      const estatusArray = Array.from(estatusSet).map(elemento => ({ value: elemento, label: elemento }));
      const tiposArray = Array.from(tiposSet).map(elemento => ({ value: elemento, label: elemento }));

      console.log(impuestosArray);
      console.log('------------------');
      console.log(estatusArray);
      console.log('------------------');

      // Actualizar el estado de optionsimpuestos
      setOptionsImpuestos(impuestosArray);
      setOptionsEstatus(estatusArray);
      setOptionsTipos(tiposArray);
 

    } catch (error) {
      // Manejo de errores, puedes agregar lógica para notificar al usuario, por ejemplo
      console.error("Error al consultar el buzón tributario:", error);
    }
  };

  useEffect(() => {
    // Llamar a la función de consulta al cargar la página
    consultarBuzon();
  }, []); // El segundo argumento es un array de dependencias, en este caso, está vacío para que se ejecute solo una vez al montar el componente

  const options = [
    { value: "Acto Administrativo", label: "Acto Administrativo" },
    { value: "Carta Invitación", label: "Carta Invitación" },
    { value: "option3", label: "Opción 3" },
  ];
 
 
  const [optionsestatus, setOptionsEstatus] = useState([]);

  const [optionsimpuestos, setOptionsImpuestos] = useState([]);
  
  const [optionstipos, setOptionsTipos] = useState([]);


  const columns = [
    { contenido: "N°", style: "5%" },
    { contenido: "Tipo", style: "20%" },
    { contenido: "Estatus", style: "15%" },
    { contenido: "Impuesto", style: "10%" },
    { contenido: "N° Ciclo", style: "10%" },
    { contenido: "Fecha notificación", style: "15%" },
    { contenido: "Fecha vencimiento", style: "15%" },
    { contenido: "", style: "5%" },
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

  const openModal = () => {
    console.log("Abriendo modal..."); // Agrega un console.log
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleButtonClick = async () => {
    try {
      // Realizar la petición POST al endpoint de registro del buzón tributario
      await axios.post(
        //"https://s0xshwjl5b.execute-api.us-east-1.amazonaws.com/dev/registro-buzon-tributario-vum", 
        END_POINT_BACK + "registro-buzon-tributario-vum",
        {
          curp: "RUGE980719MDFZSS05",
          rfc: "RUGE9807196Q1",
          numero_caso: 1,
          numero_ciclo: 1,
          impuesto: "a tratar",
          fecha: "30-11-2023",
          asunto: "ninguno",
          mensaje: "prueba1",
          importancia: "prueba1",
          "acto administrativo": "ninguno",
          leido: true,
          activo: true,
          business_person: "001BM",
          cuenta_contrato: "prueba1",
          objeto_contrato: "prueba1",
          fecha_lectura: "30-11-2023",
          fecha_notificacion: "30-11-2023",
          fecha_vencimiento: "01-12-2023",
          fecha_creacion: "30-11-2023",
          fecha_modificacion: "30-11-2023",
          usuario_modifica: "si",
          observaciones: "esta es una prueba de buzón tributario",
        }
      );

      // Puedes agregar lógica adicional después de realizar la petición, por ejemplo, actualizar el estado
      console.log("Registro en el buzón tributario exitoso");

      // Luego, puedes realizar otras acciones según tus necesidades
    } catch (error) {
      // Manejo de errores, puedes agregar lógica para notificar al usuario, por ejemplo
      console.error("Error al registrar en el buzón tributario:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={contentContainerStyle}>
        <div className="min-h-screen">
          <div className="container">
            <div className="flex flex-col ">
              <div className="d-flex w-100 form-select-type">
                <div
                  className={`card card-filters ${
                    isDarkMode ? "dark-mode-card" : ""
                  }`}
                >
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-3">
                      <Select
                        options={optionstipos}
                        value={selectedTipo}
                        onChange={handleTipoChange}
                        placeholder="Filtrar por Tipo"
                        isClearable
                      />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-3">
                      <Select
                        options={optionsestatus}
                        value={selectedEstatus}
                        onChange={handleEstatusChange}
                        placeholder="Filtrar por Estatus"
                        isClearable
                      />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-3">
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
              <div className="d-flex w-100 form-select-type">

              <Table columns={columns} data={paginatedData}></Table>
           
                            </div>
                            <ReactPaginate
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
