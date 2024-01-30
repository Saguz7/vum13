"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Header from "@public/components/Header";
import Footer from "@public/components/Footer";
import axios from "axios";

import Input from "@public/components/Input";
import FileInput from "@public/components/FileInput"; // Corregir el import
import Button from "@public/components/Button";
import Sidebar from "@public/components/Sidebar";
import Notificacion from "@public/components/Notificacion";
import "./style.css";
import Link from "next/link";

 import { useRouter } from "next/navigation";
import { pdfjs } from "react-pdf";
import { useDarkMode } from "src/app/DarkModeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import getConfig from '@raiz/config';

import ModalInfo from "@public/components/ModalInfo"; // Asegúrate de ajustar la ruta de importación

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Page() {

  const { END_POINT_BACK } = getConfig();


  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificacion, setNotificacion] = React.useState(null);
  const [errorMessages, setErrorMessages] = useState({
    constancia_situacion_fiscal: "",
    certificado: "",
    clave_privada: "",
    contrasenia_clave_privada: "",
  });

  const [formData, setFormData] = useState({
    constancia_situacion_fiscal: "",
    certificado: "",
    clave_privada: "",
    contrasenia_clave_privada: "",
  });

  const [formComplete, setFormComplete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [requiredFilesLoaded, setRequiredFilesLoaded] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);


  const openModal = (title, content) => {
    console.log("Abriendo modal...");
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };


  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);
  };


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
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({
    constancia_situacion_fiscal: false,
    certificado: false,
    clave_privada: false,
    contrasenia_clave_privada: false,
  });

  const handleButtonClick = async () => {
    router.push("/registro");
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

  const validarCampos = (nuevosDatos) => {
    const errores = {};

    Object.entries(nuevosDatos).forEach(([campo, valor]) => {
      let isValid = true;
      let errorMessage = "";

      const camposObligatorios = [
        "curp",
        "rfc",
        "razon_social",
        "nombre",
        "primer_apellido",
        "segundo_apellido",
        "correo",
        "confirmacion_correo",
        "telefono_celular",
        "telefono_residencial",
        "clave_acceso",
        "clave_acceso_repetida",
      ];

      switch (campo) {
        case "curp":
          isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,8}$/.test(valor);
          errorMessage = isValid ? "" : "Formato de CURP no válido.";
          break;
        case "rfc":
          if (valor.trim() === "") {
            isValid = false;
            errorMessage = "Este campo es obligatorio.";
          } else {
            isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,3}$/.test(valor);
            errorMessage = isValid ? "" : "Formato de RFC no válido.";
          }
          break;
        case "razon_social":
        case "nombre":
        case "primer_apellido":
        case "segundo_apellido":
          isValid = /^[A-Za-z\s]*$/.test(valor);
          errorMessage = isValid ? "" : "Solo se permiten letras y espacios.";
          break;
        case "correo":
        case "confirmacion_correo":
          // Agrega la lógica de validación para el correo electrónico si es necesario
          // isValid = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(valor);
          break;
        case "telefono_celular":
          isValid = /^\d{10}$/.test(valor);
          errorMessage = isValid
            ? ""
            : "Formato de número de teléfono no válido.";
          break;
        case "telefono_residencial":
          if (valor.trim() === "" || /^\d{10}$/.test(valor)) {
            isValid = true;
            errorMessage = "";
          } else {
            isValid = false;
            errorMessage =
              "El número de teléfono residencial debe contener 9 dígitos.";
          }
          break;
        case "clave_acceso":
        case "clave_acceso_repetida":
          // Agrega la lógica de validación para las claves de acceso si es necesario
          // Puedes definir las reglas según tus requisitos
          break;
        default:
          break;
      }

      if (camposObligatorios.includes(campo) && !valor.trim()) {
        isValid = false;
        errorMessage = "Este campo es obligatorio.";
      }

      errores[campo] = !isValid;
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...errores,
      }));
    });

    return errores;
  };

  const actualizarDatos = (nuevosDatos) => {
    const errores = validarCampos(nuevosDatos);

    setFormData((prevFormData) => {
      // Filtrar solo los campos que no sean null o undefined
      const datosActualizados = Object.fromEntries(
        Object.entries(nuevosDatos).filter(
          ([_, valor]) => valor !== null && valor !== undefined
        )
      );

      // Actualizar el estado solo si hay datos para actualizar
      return Object.keys(datosActualizados).length > 0
        ? { ...prevFormData, ...datosActualizados }
        : prevFormData;
    });
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

        actualizarDatos({
          rfc: informacionContribuyente.rfc,
          curp: informacionContribuyente.curp,
          nombre: informacionContribuyente.nombre,
          primer_apellido: informacionContribuyente.primerApellido,
          segundo_apellido: informacionContribuyente.segundoApellido,
        });

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
      /*
      const response = await axios.post(END_POINT_BACK + 'vum-curp-test/consultar', objenvido);
      console.log(response);

      */

      setSearchResults(results);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotificacion(null); // Resetea la notificación cuando se cierra
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
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="d-flex justify-content-center w-100 width-form">
                <div className="row width-form-content">
                  <div className="row">
                    <div className="col-12">
                      <div className="col-12">
                        <label className="text-medium text-light-blue">
                          Por favor, complete la información solicitada para
                          continuar.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-top-messages-error">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <label className="label-form">
                              Constancia de Situación Fiscal (.pdf) (*){" "} 
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Constancia de Situacion Fiscal', 
                            '<label className="label-form">Es una carta que da a conocer en qué estatus (situación laboral) te encuentras para el Servicio de Administración Tributaria.<br /><a href="https://www.sat.gob.mx/aplicacion/53027/genera-tu-constancia-de-situacion-fiscal" target="_blank" rel="noopener noreferrer">Genera tu constancia de situación fiscal aquí</a></label>'
                            )}/>

                          </div>
                          <div className="col-12">
                            <FileInput
                              onChange={(file) =>
                                handleFileChange(
                                  file,
                                  "constancia_situacion_fiscal"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <label className="label-form">
                              Certificado (.cer) (*){" "}
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => openModal('Certificado (.cer)', 
                            '<label className="label-form">Contiene el certificado digital que verifica  la autenticidad del firmante y la Firma Electrónica Avanzada.<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                            )}/>

                          </div>
                          <div className="col-12">
                            <FileInput
                              accept=".req"
                              onChange={(file) =>
                                handleFileChange(file, "certificado")
                              }
                            />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <label className="label-form">
                              Clave privada (.key) (*){" "}
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => openModal('Clave privada (.key)', 
                            '<label className="label-form">Cuenta con una llave privada que es generada únicamente por el firmante y con la cual puede descifrar mensajes de datos y generar la firma electrónica avanzada.<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <FileInput
                              accept=".key"
                              onChange={(file) =>
                                handleFileChange(file, "clave_privada")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="col-12">
                            <label className="label-form">
                              Contraseña de clave privada (*)
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => openModal('Contraseña de clave privada', 
                            '<label className="label-form">Al generar tu firma Electrónica, se agrega una contraseña definida por la persona, favor de intruducir la contraseña (No es la de Llave 2.0).<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="clave_acceso_repetidaInput"
                              type="password"
                              iconClass="icon-container-registro"
                              value={formData.clave_acceso_repetida}
                              error={
                                errors.clave_acceso_repetida
                                  ? "Por favor, ingrese una contraseña válida."
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

              <div className="row ">
                <div className="col-12 d-flex justify-content-center align-items-center">
                  {requiredFilesLoaded ? (
                    <Button
                      text="Continuar"
                      customStyle={{ width: "140px" }}
                      className="cta cta--guinda guinda"
                      onClick={handleButtonClick}
                    />
                  ) : (
                    <Button
                      text="Continuar"
                      customStyle={{ width: "140px" }}
                      disabled
                      className="cta cta--disabled"
                    />
                  )}
                </div>
              </div>
            </div>
            {notificacion && (
              <Notificacion
                tipo={notificacion.tipo}
                mensaje={notificacion.mensaje}
                onClose={handleCloseNotification}
              />
            )}
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
        </div>
      </div>
    </div>
  );
}
