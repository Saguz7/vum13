"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";

import Header from "@public/components/Header";
import Sidebar from "@public/components/Sidebar";
import Input from "@public/components/Input";
import FileInput from "@public/components/FileInput"; // Corregir el import
import Notificacion from "@public/components/Notificacion";

import { pdfjs } from "react-pdf";
import { useDarkMode } from "@/app/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "@public/components/Footer";

import ModalInfo from "@public/components/ModalInfo"; // Asegúrate de ajustar la ruta de importación

import ModalTelefonoValidacion from "@public/components/ModalTelefonoValidacion"; // Asegúrate de ajustar la ruta de importación
import axios from "axios";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import "./style.css";

const SteppedProgressBar = () => {
  const stepsArray = ["Documentación", "Datos Vehiculo","Datos Extras", "Datos Adicionales"];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [personaType, setPersonaType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [requiredFilesLoaded, setRequiredFilesLoaded] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [showModalTelefono, setShowModalTelefono] = useState(false);
  const [notificacion, setNotificacion] = React.useState(null);

  const [isLoading, setIsLoading] = useState(false);


  const [formCompleteValidaciones, setFormCompleteValidaciones] =
    useState(false);

  const router = useRouter();

  const handleCloseNotification = () => {
    setNotificacion(null); // Resetea la notificación cuando se cierra
  };
  const [errorMessagesRegistro, setErrorMessages] = useState({
    rfc: "",
    correo: "",
    confirmacion_correo: "",
    telefono_celular: "",
    telefono_residencial: "",
    curp: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    razon_social: "",
    clave_acceso: "",
    clave_acceso_repetida: "",
  });

  const handleComprobar = (formData) => {
    setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });

    closeModalDatos();
    setCurrentStep(3); 
  };
 

  const [formDataValidaciones, setFormDataValidaciones] = useState({
    correo: "",
    telefono_celular: "",
  });

  const [formDataRegistro, setFormDataRegistro] = useState({
    n_serie: "",
    n_motor: "",
    clave: "",
    digito_identificador: "",
    marca: "",
    linea: "",
    version: "",
    modelo: "",
    clase: "",
    //segunda parte
    tipo: "",
    puertas: "",
    llantas: "",
    combustible: "",
    cm3: "",
    capacidad: "",
    pasajeros: "",
    peso_bruto: "",
    cilindros: "",
    carga_camioneta: "",
    //tercera parte
    tipo_baja: "",
    fecha_baja: "",
    pais_origen: "",
    placa_especial: "",
    exento: "",
    blindado: "",
        //tercer parte
    servicio: "",
    uso: "",
    procedencia: "",
    documento: "",
    fecha_cambio_servicio: "",
    concecion: "",
    n_documento: "",
    fecha_documento: "",
    impt_documento: "",
    constancia_repuve: "",
    n_repuve: "",
 



  });

  const [errorsRegistro, setErrorsRegistro] = useState({
    n_serie: false,
    n_motor: false,
    clave: false,
    digito_identificador: false,
    marca: false,
    linea: false,
    version: false,
    modelo: false,
    clase: false,
    tipo: false,
    puertas: false,
    llantas: false,
    combustible: false,
    cm3: false,
    capacidad: false,

  });

  const handleInputChangeRegistro = (fieldName, value) => {
    // Validar según el campo
    let isValid = true;
    let errorMessageRegistro = "";

    setErrorsRegistro({
      ...errorMessagesRegistro,
      [fieldName]: !isValid,
    });
    setFormDataRegistro({
      ...formDataRegistro,
      [fieldName]: value,
    });
    return errorMessageRegistro;
  };
   
  const [formCompleteRegistro, setFormComplete] = useState(false);

  const [formDataDocumentacion, setFormDataDocumentacion] = useState({
    identificacion_vigente: "",
    factura_vehiculo: "",
    comprobante_de_domicilio: "",
    comprobante_de_pago: "",
  });

  const openModal = (title, content) => {
    console.log("Abriendo modal...");
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModalDatos = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModalTelefono(false);
  };

  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);
  };

  const handleFileChange = (file, fileType) => {
    // Maneja el archivo seleccionado como desees
    if (file && fileType === "constancia_situacion_fiscal") {
      loadPdfAndSearch(file);
    }
    if (
      fileType === "constancia_situacion_fiscal" ||
      fileType === "certificado" ||
      fileType === "clave_privada"
    ) {
      setRequiredFilesLoaded(true);
    } 
    setFormDataDocumentacion({
      ...formDataDocumentacion,
      [fileType]: file,
    });
  };

  const loadPdfAndSearch = async (file) => {
    try {
      const pdfFile = URL.createObjectURL(file);
      const pdf = await pdfjs.getDocument({ url: pdfFile }).promise;

      handleSearch(pdf);
    } catch (error) {
      console.error("Error al cargar el archivo PDF:", error);
    }
  };

  const handleSearch = async (pdf) => {
    try {
      if (!pdf) {
        console.error("No se ha seleccionado ningún archivo.");
        return;
      }
      const numPages = pdf.numPages;
      const informacionContribuyente = {
        rfc: "",
        curp: "",
        nombre: "",
        razonSocial: "",
        primerApellido: "",
        segundoApellido: "",
        fechaInicioOperaciones: "",
        estatusEnPadron: "",
        fechaUltimoCambioEstado: "",
        nombreComercial: "",
        codigoPostal: "",
        tipoVialidad: "",
        nombreVialidad: "",
        numeroExterior: "",
        numeroInterior: "",
        nombreColonia: "",
        nombreLocalidad: "",
        nombreMunicipio: "",
        nombreEntidadFederativa: "",
        entreCalle: "",
        yCalle: "",
      };
      const results = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((s) => s.str).join("");

        const regexCurp = /[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}/;

        const regexCedula = /CÉDULA DE IDENTIFICACIÓN FISCAL/i;
        const curpEncontrada = text.match(regexCurp);
        const rfcPattern = /RFC:(.*?)CURP:(.*?)/;
        const rfcPatternMoral = /RFC:(.*?)Denominación\/Razón Social:(.*?)/;
        const rfcPatternRazonSocial =
          /Denominación\/Razón Social:(.*?)Régimen Capital:(.*?)/;

        const curpPattern = /CURP:(.*?)Nombre \(s\):(.*?)/;
        const nombrePattern = /Nombre \(s\):(.*?)Primer Apellido:(.*?)/;
        const primerApellidoPattern =
          /Primer Apellido:(.*?)Segundo Apellido:(.*?)/;
        const segundoApellidoPattern =
          /Segundo Apellido:(.*?)Fecha inicio de operaciones:(.*?)/;
        const fechaInicioOperacionesPattern =
          /Fecha inicio de operaciones: (.+?)\b/;
        const estatusEnPadronPattern = /Estatus en el padrón: (.+?)\b/;
        const fechaUltimoCambioEstadoPattern =
          /Fecha de último cambio de estado: (.+?)\b/;
        const nombreComercialPattern = /Nombre Comercial: (.+?)\b/;
        const codigoPostalPattern = /Código Postal:(.*?)Tipo de Vialidad:(.*?)/;
        const tipoVialidadPattern =
          /Tipo de Vialidad:(.*?)Nombre de Vialidad:(.*?)/;
        const nombreVialidadPattern =
          /Nombre de Vialidad:(.*?)Número Exterior:(.*?)/;
        const numeroExteriorPattern =
          /Número Exterior:(.*?)Número Interior:(.*?)/;
        const numeroInteriorPattern =
          /Número Interior:(.*?)Nombre de la Colonia:(.*?)/;
        const nombreColoniaPattern =
          /Nombre de la Colonia:(.*?)Nombre de la Localidad:(.*?)/;
        const nombreLocalidadPattern =
          /Nombre de la Localidad:(.*?)Nombre del Municipio o Demarcación Territorial:(.*?)/;
        const nombreMunicipioPattern =
          /Nombre del Municipio o Demarcación Territorial:(.*?)Nombre de la Entidad Federativa:(.*?)/;
        const nombreEntidadFederativaPattern =
          /Nombre de la Entidad Federativa:(.*?)Entre Calle:(.*?)/;
        const entreCallePattern = /Entre Calle: (.+?)\b/;
        const yCallePattern = /Y Calle: (.+?)\b/;

        // Función para extraer información usando un patrón
        const extraerInformacion = (text, patron) => {
          const coincidencias = text.match(patron);
          return coincidencias ? coincidencias[1].trim() : null;
        };

        // Extraer la información

        let rfc;

        rfc = extraerInformacion(text, rfcPattern);

        const razonSocial = extraerInformacion(text, rfcPatternRazonSocial);

        const curp = extraerInformacion(text, curpPattern);
        const nombre = extraerInformacion(text, nombrePattern);

        const primerApellido = extraerInformacion(text, primerApellidoPattern);
        const segundoApellido = extraerInformacion(
          text,
          segundoApellidoPattern
        );
        const fechaInicioOperaciones = extraerInformacion(
          text,
          fechaInicioOperacionesPattern
        );
        const estatusEnPadron = extraerInformacion(
          text,
          estatusEnPadronPattern
        );
        const fechaUltimoCambioEstado = extraerInformacion(
          text,
          fechaUltimoCambioEstadoPattern
        );
        const nombreComercial = extraerInformacion(
          text,
          nombreComercialPattern
        );
        const codigoPostal = extraerInformacion(text, codigoPostalPattern);
        const tipoVialidad = extraerInformacion(text, tipoVialidadPattern);
        const nombreVialidad = extraerInformacion(text, nombreVialidadPattern);
        const numeroExterior = extraerInformacion(text, numeroExteriorPattern);
        const numeroInterior = extraerInformacion(text, numeroInteriorPattern);
        const nombreColonia = extraerInformacion(text, nombreColoniaPattern);
        const nombreLocalidad = extraerInformacion(
          text,
          nombreLocalidadPattern
        );
        const nombreMunicipio = extraerInformacion(
          text,
          nombreMunicipioPattern
        );
        const nombreEntidadFederativa = extraerInformacion(
          text,
          nombreEntidadFederativaPattern
        );
        const entreCalle = extraerInformacion(text, entreCallePattern);
        const yCalle = extraerInformacion(text, yCallePattern);

        const actualizarInformacionContribuyente = (clave, valor) => {
          if (valor !== null && valor.trim() !== "") {
            informacionContribuyente[clave] = valor.trim();
          }
        };

        actualizarInformacionContribuyente("rfc", rfc);
        actualizarInformacionContribuyente("curp", curp);

        if (curpEncontrada && curpEncontrada.length > 0) {
          actualizarInformacionContribuyente("curp", curpEncontrada[0]);
        }

        actualizarInformacionContribuyente("nombre", nombre);
        actualizarInformacionContribuyente("razonSocial", razonSocial);

        actualizarInformacionContribuyente("primerApellido", primerApellido);
        actualizarInformacionContribuyente("segundoApellido", segundoApellido);
        actualizarInformacionContribuyente(
          "fechaInicioOperaciones",
          fechaInicioOperaciones
        );
        actualizarInformacionContribuyente("estatusEnPadron", estatusEnPadron);
        actualizarInformacionContribuyente(
          "fechaUltimoCambioEstado",
          fechaUltimoCambioEstado
        );
        actualizarInformacionContribuyente("nombreComercial", nombreComercial);
        actualizarInformacionContribuyente("codigoPostal", codigoPostal);
        actualizarInformacionContribuyente("tipoVialidad", tipoVialidad);
        actualizarInformacionContribuyente("nombreVialidad", nombreVialidad);
        actualizarInformacionContribuyente("numeroExterior", numeroExterior);
        actualizarInformacionContribuyente("numeroInterior", numeroInterior);
        actualizarInformacionContribuyente("nombreColonia", nombreColonia);
        actualizarInformacionContribuyente("nombreLocalidad", nombreLocalidad);
        actualizarInformacionContribuyente("nombreMunicipio", nombreMunicipio);
        actualizarInformacionContribuyente(
          "nombreEntidadFederativa",
          nombreEntidadFederativa
        );
        actualizarInformacionContribuyente("entreCalle", entreCalle);
        actualizarInformacionContribuyente("yCalle", yCalle); 
        localStorage.setItem(
          "informacionContribuyente",
          JSON.stringify(informacionContribuyente)
        );
      }

      let objenvido = {
        body: {
          curp: informacionContribuyente.curp,
        },
      }; 
      setSearchResults(results);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
 
  const handleButtonClick = async () => {};
 
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
  const totalSteps = 4;
 

  const handleNextStep = async () => {
    if (currentStep === 1) {

      setCurrentStep(2);
    }
    if (currentStep === 2) {
      
      setCurrentStep(3);
    }
    if (currentStep === 3) {
      setCurrentStep(4); 
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } 
  };

  const actualizarFormDataRegistro = (nuevosDatos) => {
     const datosFiltrados = Object.fromEntries(
      Object.entries(nuevosDatos).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

     if (Object.keys(datosFiltrados).length > 0) {
      setFormDataRegistro((prevFormData) => ({
        ...prevFormData,
        ...datosFiltrados,
      }));
    }
  };
 

  const dotStyle = { backgroundColor: 'rgb(25, 70, 187)' };


  const setProgressBar = (currentStep) => {
    const percent = (100 / totalSteps) * currentStep;
    return percent.toFixed();
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
       
          <div className="card margin-top-3">
           
            <form id="form">
              <ul id="progressbar">
                {stepsArray.map((step, index) => (
                  <li
                    key={index}
                    className={currentStep === index + 1 ? "active" : ""}
                  >
                    <strong>{`${step}`}</strong>
                  </li>
                ))}
              </ul>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${setProgressBar(currentStep)}%` }}
                ></div>
              </div>
              <br />

              {currentStep === 1 && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content">
                    <div className="row margin-top-messages-error">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                              Identificación oficial vigente de la persona que realiza el trámite. (.pdf) (*){" "}
                              </label>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  fontSize: "1rem", // Ajusta el tamaño inicial según tus necesidades
                                }}
                                onClick={() =>
                                  openModal(
                                    "Constancia de Situacion Fiscal",
                                    '<label className="label-form">Es una carta que da a conocer en qué estatus (situación laboral) te encuentras para el Servicio de Administración Tributaria.<br /><a href="https://www.sat.gob.mx/aplicacion/53027/genera-tu-constancia-de-situacion-fiscal" target="_blank" rel="noopener noreferrer">Genera tu constancia de situación fiscal aquí</a></label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                onChange={(file) =>
                                  handleFileChange(
                                    file,
                                    "constancia_situacion_fiscal"
                                  )
                                }
                                value={
                                  formDataDocumentacion.identificacion_vigente 
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                              Factura del vehículo (.pdf) (*){" "}
                              </label>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  fontSize: "1rem", // Ajusta el tamaño inicial según tus necesidades
                                }}
                                onClick={() =>
                                  openModal(
                                    "Certificado (.cer)",
                                    '<label className="label-form">Contiene el certificado digital que verifica  la autenticidad del firmante y la Firma Electrónica Avanzada.<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                accept=".cer"
                                onChange={(file) =>
                                  handleFileChange(file, "factura_vehiculo")
                                }
                                value={formDataDocumentacion.factura_vehiculo}
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                              Comprobante de domicilio no mayor a 90 días. (.pdf) (*){" "}
                              </label>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  fontSize: "1rem", // Ajusta el tamaño inicial según tus necesidades
                                }}
                                onClick={() =>
                                  openModal(
                                    "Clave privada (.key)",
                                    '<label className="label-form">Cuenta con una llave privada que es generada únicamente por el firmante y con la cual puede descifrar mensajes de datos y generar la firma electrónica avanzada.<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                accept=".key"
                                onChange={(file) =>
                                  handleFileChange(file, "comprobante_de_domicilio")
                                }
                                value={formDataDocumentacion.comprobante_de_domicilio}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                              Comprobante de pago por enajenación de vehículos (cambio de propietario). (.pdf) (*){" "}
                              </label>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  fontSize: "1rem", // Ajusta el tamaño inicial según tus necesidades
                                }}
                                onClick={() =>
                                  openModal(
                                    "Clave privada (.key)",
                                    '<label className="label-form">Cuenta con una llave privada que es generada únicamente por el firmante y con la cual puede descifrar mensajes de datos y generar la firma electrónica avanzada.<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                accept=".key"
                                onChange={(file) =>
                                  handleFileChange(file, "comprobante_de_pago")
                                }
                                value={formDataDocumentacion.comprobante_de_pago}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content">
                    <div className="row width-form-content">
                      <div className="row margin-top-messages-error">
                        <div className="col-12">
                          
                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">N° de Serie (*)</label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "CURP",
                                      '<label className="label-form">La Clave Única de Registro de Población, mejor conocida como CURP, es un instrumento que sirve para registrar en forma individual a todos los habitantes de México, nacionales y extranjeros, así como a las mexicanas y mexicanos que radican en otros países. La CURP contiene 18 elementos de un código alfanumérico; 16 de ellos son la primer letra y primer vocal interna del primer apellido, primer letra del segundo apellido, primer letra del primer nombre, año, mes y día de la fecha de nacimiento; género, las dos letras del lugar de nacimiento de acuerdo al código de la Entidad Federativa.<br /><a href="https://www.gob.mx/curp/" target="_blank" rel="noopener noreferrer">Consulta tu CURP aquí</a></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="curpInput"
                                  value={formDataRegistro.n_serie}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("n_serie", value)
                                  }
                                  error={
                                    errorsRegistro.n_serie
                                      ? "Por favor, ingrese un CURP válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">N° de Motor (*)</label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "RFC ",
                                      '<label className="label-form">El Registro Federal de Contribuyentes, mejor conocido como RFC, es una clave compuesta alfanumérica que el gobierno utiliza para identificar a las personas físicas y morales que practican alguna actividad económica en nuestro país.<br /><a href="https://www.sat.gob.mx/aplicacion/29073/verifica-si-estas-registrado-en-el-rfc" target="_blank" rel="noopener noreferrer">Consulta tu RFC aquí</a></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="rfcInput"
                                  value={formDataRegistro.n_motor}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("n_motor", value)
                                  }
                                  error={
                                    errorsRegistro.rfc
                                      ? "Por favor, ingrese un RFC válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">Clave (*)</label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "RFC ",
                                      '<label className="label-form">El Registro Federal de Contribuyentes, mejor conocido como RFC, es una clave compuesta alfanumérica que el gobierno utiliza para identificar a las personas físicas y morales que practican alguna actividad económica en nuestro país.<br /><a href="https://www.sat.gob.mx/aplicacion/29073/verifica-si-estas-registrado-en-el-rfc" target="_blank" rel="noopener noreferrer">Consulta tu RFC aquí</a></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="rfcInput"
                                  value={formDataRegistro.clave}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("clave", value)
                                  }
                                  error={
                                    errorsRegistro.rfc
                                      ? "Por favor, ingrese un RFC válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">Digito identificador (*)</label>
                              </div>
                              <div className="col-12">
                                <Input
                                  id="nombreInput"
                                  value={formDataRegistro.digito_identificador}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("nombre", value)
                                  }
                                  error={
                                    errorsRegistro.digito_identificador
                                      ? "Por favor, ingrese un Nombre válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Marca (*)
                                </label>
                              </div>
                              <div className="col-12">
                                <Input
                                  id="primer_apellidoInput"
                                  value={formDataRegistro.marca}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "marca",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.marca
                                      ? "Por favor, ingrese un Primer Apellido válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Línea (*)
                                </label>
                              </div>
                              <div className="col-12">
                                <Input
                                  id="segundo_apellidoInput"
                                  value={formDataRegistro.linea}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "segundo_apellido",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.linea
                                      ? "Por favor, ingrese un Segundo Apellido válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Versión (*)
                                </label>
                              </div>
                              <div className="col-12">
                                <Input
                                  id="segundo_apellidoInput"
                                  value={formDataRegistro.version}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "segundo_apellido",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.version
                                      ? "Por favor, ingrese un Segundo Apellido válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Modelo (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Modelo",
                                      '<label className="label-form">Introduce tu dirección de correo electrónico. Este es un identificador único que utilizas para recibir mensajes y notificaciones en línea. <br />Ejemplo: tuCorreo@ejemplo.com<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="correoInput"
                                  value={formDataRegistro.modelo}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("modelo", value)
                                  }
                                  error={
                                    errorsRegistro.modelo
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Clase (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Repetir correo electrónico",
                                      '<label className="label-form">Introduce tu dirección de correo electrónico por segunda vez, debe ser igual.<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="confirmacion_correoInput"
                                  value={formDataRegistro.clase}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "Clase",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.clase
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Tipo (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Repetir correo electrónico",
                                      '<label className="label-form">Introduce tu dirección de correo electrónico por segunda vez, debe ser igual.<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="confirmacion_correoInput"
                                  value={formDataRegistro.tipo}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "Clase",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.tipo
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Puertas (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Repetir correo electrónico",
                                      '<label className="label-form">Introduce tu dirección de correo electrónico por segunda vez, debe ser igual.<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="confirmacion_correoInput"
                                  value={formDataRegistro.puertas}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "Clase",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.puertas
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>

                           

                           
                        </div>
                      </div>
                    </div>

                     
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content">
                    <div className="row width-form-content">
                      <div className="row margin-top-messages-error">
                        <div className="row">
                          <div className="col-12">
                            
                          <div className="row">
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Llantas (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Celular",
                                      '<label className="label-form">Ingresa tu número de teléfono celular.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_celularInput"
                                  value={formDataRegistro.llantas}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "telefono_celular",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.llantas
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Combustible(*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_residencialInput"
                                  value={formDataRegistro.combustible}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "combustible",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.combustible
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  CM3(*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_residencialInput"
                                  value={formDataRegistro.cm3}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "combustible",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.cm3
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Capacidad (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_residencialInput"
                                  value={formDataRegistro.capacidad}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "capacidad",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.capacidad
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>




                          <div className="row">
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Pasajeros (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Celular",
                                      '<label className="label-form">Ingresa tu número de teléfono celular.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_celularInput"
                                  value={formDataRegistro.pasajeros}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "pasajeros",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.pasajeros
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Peso Bruto(*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_residencialInput"
                                  value={formDataRegistro.peso_bruto}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "peso_bruto",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.peso_bruto
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Cilindros(*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="cilindros"
                                  value={formDataRegistro.cilindros}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "combustible",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.cilindros
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                              <div className="col-12">
                                <label className="label-form">
                                  Carga Camioneta (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Teléfono Residencial",
                                      '<label className="label-form">Ingresa tu número de teléfono residencial.<br />Ejemplo:  1234567890 (10 números)<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="telefono_residencialInput"
                                  value={formDataRegistro.carga_camioneta}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "carga_camioneta",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.carga_camioneta
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                            <div className="row">
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form">
                                    Tipo Baja (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Colonia",
                                        '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="coloniaInput"
                                    value={formDataRegistro.tipo_baja}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "tipo_baja",
                                        value
                                      )
                                    }
                                    error={
                                      errorsRegistro.tipo_baja
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Fecha Baja (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.fecha_baja}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("fecha_baja", value)
                                    }
                                    error={
                                      errorsRegistro.fecha_baja
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Pais origen (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.pais_origen}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("pais_origen", value)
                                    }
                                    error={
                                      errorsRegistro.pais_origen
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                            </div>


                             

                             

                             
                             
                             
                             
                          </div>
                        </div>
                      </div>
                    </div>

                     
                  </div>
                </div>
              )}

{currentStep === 4 && (
                <div className="d-flex justify-content-center w-100 width-form">
                  <div className="row width-form-content">
                    <div className="row width-form-content">
                      <div className="row margin-top-messages-error">
                        <div className="row">
                          <div className="col-12">
                            

                             
                            <div className="row">
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form">
                                    Placa Especial (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Colonia",
                                        '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="coloniaInput"
                                    value={formDataRegistro.placa_especial}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "placa_especial",
                                        value
                                      )
                                    }
                                    error={
                                      errorsRegistro.placa_especial
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Exento (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.exento}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("exento", value)
                                    }
                                    error={
                                      errorsRegistro.exento
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Blindado (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.blindado}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("blindado", value)
                                    }
                                    error={
                                      errorsRegistro.blindado
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                            </div>


                            <div className="row">
                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Servicio (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Colonia",
                                        '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="coloniaInput"
                                    value={formDataRegistro.servicio}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "servicio",
                                        value
                                      )
                                    }
                                    error={
                                      errorsRegistro.servicio
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Uso (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.uso}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("uso", value)
                                    }
                                    error={
                                      errorsRegistro.uso
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Procedencia (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.procedencia}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("procedencia", value)
                                    }
                                    error={
                                      errorsRegistro.procedencia
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>


                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Documento (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.documento}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("documento", value)
                                    }
                                    error={
                                      errorsRegistro.documento
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                            </div>


                            <div className="row">
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form">
                                    Fecha cambio servicio 
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Colonia",
                                        '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="coloniaInput"
                                    value={formDataRegistro.fecha_cambio_servicio}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "fecha_cambio_servicio",
                                        value
                                      )
                                    }
                                    error={
                                      errorsRegistro.fecha_cambio_servicio
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Conceción (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.concecion}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("concecion", value)
                                    }
                                    error={
                                      errorsRegistro.concecion
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-4">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    N° Documento (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.n_documento}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("n_documento", value)
                                    }
                                    error={
                                      errorsRegistro.n_documento
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>


                               

                            </div>

                             
                            <div className="row">
                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Fecha Documento 
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Colonia",
                                        '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="coloniaInput"
                                    value={formDataRegistro.fecha_documento}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "fecha_documento",
                                        value
                                      )
                                    }
                                    error={
                                      errorsRegistro.fecha_documento
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    Impt. Documento (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "impt_documento",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.impt_documento}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("impt_documento", value)
                                    }
                                    error={
                                      errorsRegistro.impt_documento
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    C. REPUVE (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Calle",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.constancia_repuve}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("constancia_repuve", value)
                                    }
                                    error={
                                      errorsRegistro.constancia_repuve
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>


                              <div className="col-xs-12 col-sm-3">
                                <div className="col-12">
                                  <label className="label-form text-guinda">
                                    N° REPUVE (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "n_repuve",
                                        '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="calleInput"
                                    className={"form-input--full"}
                                    value={formDataRegistro.n_repuve}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("n_repuve", value)
                                    }
                                    error={
                                      errorsRegistro.n_repuve
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>


                               

                            </div>
                             
                          </div>
                        </div>
                      </div>
                    </div>

                     
                  </div>
                </div>
              )}
              {Array.from({ length: totalSteps }).map((_, index) => (
                <fieldset
                  key={index}
                  style={{
                    display: currentStep === index + 1 ? "block" : "none",
                    width: "70%",
                    marginLeft: "15%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{ visibility: index > 0 ? "visible" : "hidden" }}
                    >
                      <input
                        type="button"
                        name="previous-step"
                        className="cta cta--purple"
                        value="Anterior"
                        onClick={handlePrevStep}
                      />
                    </div>
                    {index === totalSteps - 1 ? (
                      <div>
                        <input
                          type="button"
                          name="complete-step"
                          className={`cta cta--guinda`}
                          value="Completar"
                          onClick={handleNextStep}
                        />
                      </div>
                    ) : (
                      <div>
                         {currentStep === 1 && (
                           <input
                           type="button"
                           name="next-step"
                           className={`cta cta--guinda`}
                           value={isLoading ? "Cargando..." : "Siguiente"}
                           onClick={handleNextStep}
                          />

                        )}
                        { (currentStep === 2|| currentStep === 3)  && (
                          <input
                            type="button"
                            name="next-step"
                            className={`cta cta--guinda`}
                            value="Siguiente"
                            onClick={handleNextStep}
                           />
                        )}
                      </div>
                    )}
                  </div>
                </fieldset>
              ))}
            </form>
          </div>
        </div>

        <ModalInfo
          show={showModal}
          onHide={closeModal}
          title={modalTitle}
          content={modalContent}
          closeButtonLabel="Cerrar"
          saveButtonLabel="Guardar cambios"
          showSaveButton={false}
        />

        <ModalTelefonoValidacion
          show={showModalTelefono}
          onHide={closeModalDatos}
          formData={formDataValidaciones}
          handleComprobar={handleComprobar}
        />
      </div>
      {notificacion && (
        <Notificacion
          tipo={notificacion.tipo}
          mensaje={notificacion.mensaje}
          onClose={handleCloseNotification}
        />
      )}
            <Footer />

    </div>
  );
};

export default SteppedProgressBar;
