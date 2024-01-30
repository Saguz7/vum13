"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Header from "@public/components/Header";
import Footer from "@public/components/Footer";

import Input from "@public/components/Input";
import FileInput from "@public/components/FileInput"; // Corregir el import
import Button from "@public/components/Button";
import Sidebar from "@public/components/Sidebar";

import ModalInfo from "@public/components/ModalInfo"; // Asegúrate de ajustar la ruta de importación
import { useDarkMode } from "@/app/DarkModeContext";

import { useRouter } from "next/navigation";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

 
export default function Page() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notificacion, setNotificacion] = React.useState(null);

   const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');


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


  const [errorMessages, setErrorMessages] = useState({
    estado: "",
    municipio: "",
    localidad: "",
    colonia: "",
    codigo_postal: "",
    calle: "",
    numero_exterior: "",
    numero_interior: "",
    entre_calle: "",
    referencia: "",
  });

  const [formData, setFormData] = useState({
    estado: "",
    municipio: "",
    localidad: "",
    colonia: "",
    codigo_postal: "",
    calle: "",
    numero_exterior: "",
    numero_interior: "",
    entre_calle: "",
    referencia: "",
  });

  const [errors, setErrors] = useState({
    estado: false,
    municipio: false,
    localidad: false,
    colonia: false,
    codigo_postal: false,
    calle: false,
    numero_exterior: false,
    numero_interior: false,
    entre_calle: false,
    referencia: false,
  });

  const { isDarkMode } = useDarkMode();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const actualizarFormData = (nuevosDatos) => {
    const errores = validarCampos(nuevosDatos);

    // Filtrar los nuevos datos para excluir aquellos que son nulos o vacíos
    const datosFiltrados = Object.fromEntries(
      Object.entries(nuevosDatos).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    // Actualizar formData solo si hay datos válidos en nuevosDatos
    if (Object.keys(datosFiltrados).length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...datosFiltrados,
      }));
    }
  };

  useEffect(() => {
    const informacionGuardada = JSON.parse(
      localStorage.getItem("informacionContribuyente")
    );

    actualizarFormData({
      estado: informacionGuardada.nombreEntidadFederativa,
      municipio: informacionGuardada.nombreMunicipio,
      localidad: informacionGuardada.nombreLocalidad,
      colonia: informacionGuardada.nombreColonia,
      codigo_postal: informacionGuardada.codigoPostal,
      calle: informacionGuardada.nombreVialidad,
      numero_exterior: informacionGuardada.numeroExterior,
      numero_interior: informacionGuardada.numeroInterior,
      entre_calle:
        informacionGuardada.entreCalle + " " + informacionGuardada.yCalle,
      referencia: "",
    });
    /*
    if (informacionGuardada) {
      setFormData(informacionGuardada);
    }
    */
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez cuando el componente se monte

  const handleInputChange = (fieldName, value) => {
    // Validar según el campo
    let isValid = true;
    let errorMessage = "";

    // Define los campos obligatorios
    const camposObligatorios = [
      "estado",
      "municipio",
      "localidad",
      "colonia",
      "codigo_postal",
      "calle",
      "numero_exterior",
    ];

    switch (fieldName) {
      case "estado":
      case "municipio":
      case "localidad":
      case "colonia":
        isValid = /^[A-Za-z\s]*$/.test(value);
        errorMessage = isValid ? "" : "Solo se permiten letras y espacios.";
        break;
      case "codigo_postal":
        isValid = /^\d{5}$/.test(value);
        errorMessage = isValid
          ? ""
          : "El código postal debe contener 5 dígitos.";
        break;
      case "calle":
      case "entre_calle":
      case "referencia":
        isValid = /^[A-Za-z0-9\s]*$/.test(value);
        errorMessage = isValid
          ? ""
          : "Solo se permiten letras, números y espacios.";
        break;
      case "numero_exterior":
      case "numero_interior":
        isValid = /^[A-Za-z0-9\s-]*$/.test(value);
        errorMessage = isValid
          ? ""
          : "Solo se permiten letras, números, espacios y guiones.";
        break;
      default:
        break;
    }

    // Verifica si el campo es obligatorio y está vacío
    if (camposObligatorios.includes(fieldName) && !value.trim()) {
      isValid = false;
      errorMessage = "Este campo es obligatorio.";
    }

    setErrors({
      ...errors,
      [fieldName]: !isValid,
    });

    // Actualizar el estado del formulario solo si el valor es válido
    // if (isValid) {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    // }

    // Devolver el mensaje de error para mostrar en el Input
    return errorMessage;
  };

  const validarCampos = (nuevosDatos) => {
    const errores = {};

    // Define los campos obligatorios
    const camposObligatorios = [
      "estado",
      "municipio",
      "localidad",
      "colonia",
      "codigo_postal",
      "calle",
      "numero_exterior",
    ];

    // Validar cada campo según su tipo
    Object.entries(nuevosDatos).forEach(([campo, valor]) => {
      let isValid = true;
      let errorMessage = "";

      switch (campo) {
        case "estado":
        case "municipio":
        case "localidad":
        case "colonia":
          isValid = /^[A-Za-z\s]*$/.test(valor);
          errorMessage = isValid ? "" : "Solo se permiten letras y espacios.";
          break;
        case "codigo_postal":
          isValid = /^\d{5}$/.test(valor);
          errorMessage = isValid
            ? ""
            : "El código postal debe contener 5 dígitos.";
          break;
        case "calle":
        case "entre_calle":
        case "referencia":
          isValid = /^[A-Za-z0-9\s]*$/.test(valor);
          errorMessage = isValid
            ? ""
            : "Solo se permiten letras, números y espacios.";
          break;
        case "numero_exterior":
        case "numero_interior":
          isValid = /^[A-Za-z0-9\s-]*$/.test(valor);
          errorMessage = isValid
            ? ""
            : "Solo se permiten letras, números, espacios y guiones.";
          break;
        default:
          break;
      }

      // Verifica si el campo es obligatorio y está vacío
      if (camposObligatorios.includes(campo) && !valor.trim()) {
        isValid = false;
        errorMessage = "Este campo es obligatorio.";
      }

      errores[campo] = !isValid;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errores,
    }));

    // Devolver el objeto de errores
    return errores;
  };

  useEffect(() => {
    // Verificar si todos los campos necesarios están completos después del tiempo de espera
    const timeoutId = setTimeout(() => {
      let updatedErrorMessages = { ...errorMessages };

      let isFormComplete =
        formData.estado.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.estado) &&
        formData.municipio.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.municipio) &&
        formData.localidad.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.localidad) &&
        formData.colonia.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.colonia) &&
        formData.codigo_postal.trim() !== "" &&
        /^\d{5}$/.test(formData.codigo_postal) &&
        formData.calle.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.calle) &&
        formData.numero_exterior.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.numero_exterior) &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.numero_interior) &&
        formData.entre_calle.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.entre_calle) &&
        //formData.referencia.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.referencia);

      updatedErrorMessages.estado =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.estado) &&
        formData.estado.trim() !== ""
          ? ""
          : "Mensaje de error para Estado (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.municipio =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.municipio) &&
        formData.municipio.trim() !== ""
          ? ""
          : "Mensaje de error para Municipio (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.localidad =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.localidad) &&
        formData.localidad.trim() !== ""
          ? ""
          : "Mensaje de error para Localidad (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.colonia =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.colonia) &&
        formData.colonia.trim() !== ""
          ? ""
          : "Mensaje de error para Colonia (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.codigo_postal =
        /^\d{5}$/.test(formData.codigo_postal) &&
        formData.codigo_postal.trim() !== ""
          ? ""
          : "Mensaje de error para Código Postal (debe contener 5 dígitos y no estar vacío)";

      updatedErrorMessages.calle =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.calle) &&
        formData.calle.trim() !== ""
          ? ""
          : "Mensaje de error para Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.numero_exterior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.numero_exterior) &&
        formData.numero_exterior.trim() !== ""
          ? ""
          : "Mensaje de error para Número Exterior (no debe estar vacío y puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.numero_interior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.numero_interior)
          ? ""
          : "Mensaje de error para Número Interior (puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.entre_calle =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.entre_calle) &&
        formData.entre_calle.trim() !== ""
          ? ""
          : "Mensaje de error para Entre Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.referencia =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formData.referencia) 
        //&& formData.referencia.trim() !== ""
          ? ""
          : "Mensaje de error para Referencia (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      setFormComplete(isFormComplete);
      setErrorMessages(updatedErrorMessages);
    }, 500); // Puedes ajustar el tiempo de espera según tus necesidades

    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formData, errorMessages]);

  const handleButtonClick = async () => {
    setNotificacion({ tipo: 'success', mensaje: 'Se ha guardado la dirección' });

    router.push("llave/terminos");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleFileChange = (file) => {
    // Maneja el archivo seleccionado como desees
    if (file) {
      loadPdfAndSearch(file);
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

  const actualizarDatos = (nuevosDatos) => {
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

        const personaType = localStorage.getItem("personaType");

        if (personaType === "fisica") {
          rfc = extraerInformacion(text, rfcPattern);
        } else {
          rfc = extraerInformacion(text, rfcPatternMoral);
        }
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

        actualizarFormData({
          estado: informacionContribuyente.nombreEntidadFederativa,
          municipio: informacionContribuyente.nombreMunicipio,
          localidad: informacionContribuyente.nombreLocalidad,
          colonia: informacionContribuyente.nombreColonia,
          codigo_postal: informacionContribuyente.codigoPostal,
          calle: informacionContribuyente.nombreVialidad,
          numero_exterior: informacionContribuyente.numeroExterior,
          numero_interior: informacionContribuyente.numeroInterior,
          entre_calle:
            informacionContribuyente.entreCalle +
            " " +
            informacionContribuyente.yCalle,
          referencia: "",
        });

        localStorage.setItem(
          "informacionContribuyente",
          JSON.stringify(informacionContribuyente)
        );
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="bg-white min-h-screen">
        <div className="container">
          <div className="card margin-top-3">
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="d-flex justify-content-center w-100 width-form">
                <div className="row width-form-content ">
                  <div className="row">
                    <div className="col-12">
                      <div className="col-12">
                        <label className="text-medium text-light-blue ">
                          Por favor, complete la información solicitada para
                          continuar.
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form">
                              Código Postal (*)
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Código Postal', 
                            '<label className="label-form">Es un código numérico o alfanumérico que complementa la dirección física y representa una zona geográfica del país.<br /><a href="https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx" target="_blank" rel="noopener noreferrer">Consulta tu Código Postal aquí</a></label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="codigo_postalInput"
                              value={formData.codigo_postal}
                              onChange={(value) =>
                                handleInputChange("codigo_postal", value)
                              }
                              error={
                                errors.codigo_postal
                                  ? "Por favor, ingrese un código postal válido."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form">Estado (*)</label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Estado', 
                            '<label className="label-form"> Selecciona tu estado según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="estadoInput"
                              value={formData.estado}
                              onChange={(value) =>
                                handleInputChange("estado", value)
                              }
                              error={
                                errors.estado
                                  ? "Por favor, ingrese un estado válido."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form">Municipio (*)</label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Municipio', 
                            '<label className="label-form"> Selecciona tu Municipio según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="municipioInput"
                              value={formData.municipio}
                              onChange={(value) =>
                                handleInputChange("municipio", value)
                              }
                              error={
                                errors.municipio
                                  ? "Por favor, ingrese un municipio válido."
                                  : ""
                              }
                            />
                          </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form">Localidad (*)</label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Localidad', 
                            '<label className="label-form"> Selecciona tu Localidad según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="localidadInput"
                              value={formData.localidad}
                              onChange={(value) =>
                                handleInputChange("localidad", value)
                              }
                              error={
                                errors.localidad
                                  ? "Por favor, ingrese una localidad válida."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form">Colonia (*)</label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Colonia', 
                            '<label className="label-form"> Selecciona tu Colonia según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="coloniaInput"
                              value={formData.colonia}
                              onChange={(value) =>
                                handleInputChange("colonia", value)
                              }
                              error={
                                errors.colonia
                                  ? "Por favor, ingrese una colonia válida."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-9">
                          <div className="col-12">
                            <label className="label-form text-guinda">
                              Calle (*)
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Calle', 
                            '<label className="label-form"> Escribe tu calle según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="calleInput"
                              className={"form-input--full"}
                              value={formData.calle}
                              onChange={(value) =>
                                handleInputChange("calle", value)
                              }
                              error={
                                errors.calle
                                  ? "Por favor, ingrese una calle válida."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form text-guinda">
                              N° Exterior (*)
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('N° Exterior', 
                            '<label className="label-form"> Escribe tu Número Exterior según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="numero_exteriorInput"
                              value={formData.numero_exterior}
                              onChange={(value) =>
                                handleInputChange("numero_exterior", value)
                              }
                              error={
                                errors.numero_exterior
                                  ? "Por favor, ingrese un número exterior válido."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-3">
                          <div className="col-12">
                            <label className="label-form text-guinda">
                              N° Interior
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('N° Interior', 
                            '<label className="label-form"> Escribe tu Número Interior según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="numero_interiorInput"
                              value={formData.numero_interior}
                              onChange={(value) =>
                                handleInputChange("numero_interior", value)
                              }
                              error={
                                errors.numero_interior
                                  ? "Por favor, ingrese un número interior válido."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-6">
                          <div className="col-12">
                            <label className="label-form text-guinda">
                              Entre Calle
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Entre Calle', 
                            '<label className="label-form"> Escribe el siguiente valor según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="entre_calleInput"
                              value={formData.entre_calle}
                              onChange={(value) =>
                                handleInputChange("entre_calle", value)
                              }
                              error={
                                errors.entre_calle
                                  ? "Por favor, ingrese una entre calle válida."
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12">
                          <div className="col-12">
                            <label className="label-form text-guinda">
                              Referencia
                            </label>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px', cursor: 'pointer' }}            onClick={() => openModal('Referencia', 
                            '<label className="label-form"> Escribe la Referencia según la constancia del SAT </label>'
                            )}/>
                          </div>
                          <div className="col-12">
                            <Input
                              id="referenciaInput"
                              value={formData.referencia}
                              onChange={(value) =>
                                handleInputChange("referencia", value)
                              }
                              error={
                                errors.referencia
                                  ? "Por favor, ingrese una referencia válida."
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

              <div className="d-flex justify-content-center w-100 width-form margin-top-messages-error">
                <div className="row width-form-content">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 bg-armarillo text-small text-guinda">
                          {errorMessages.estado && (
                            <p className="error-message">
                              {errorMessages.estado}
                            </p>
                          )}
                          {errorMessages.municipio && (
                            <p className="error-message">
                              {errorMessages.municipio}
                            </p>
                          )}
                          {errorMessages.localidad && (
                            <p className="error-message">
                              {errorMessages.localidad}
                            </p>
                          )}
                          {errorMessages.colonia && (
                            <p className="error-message">
                              {errorMessages.colonia}
                            </p>
                          )}
                          {errorMessages.codigo_postal && (
                            <p className="error-message">
                              {errorMessages.codigo_postal}
                            </p>
                          )}
                          {errorMessages.calle && (
                            <p className="error-message">
                              {errorMessages.calle}
                            </p>
                          )}
                          {errorMessages.numero_exterior && (
                            <p className="error-message">
                              {errorMessages.numero_exterior}
                            </p>
                          )}
                          {errorMessages.numero_interior && (
                            <p className="error-message">
                              {errorMessages.numero_interior}
                            </p>
                          )}
                          {errorMessages.entre_calle && (
                            <p className="error-message">
                              {errorMessages.entre_calle}
                            </p>
                          )}
                          {errorMessages.referencia && (
                            <p className="error-message">
                              {errorMessages.referencia}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row margin-top-button">
                <div className="col-12 d-flex justify-content-center align-items-center">
                  {formComplete ? (
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

              <ModalInfo
                show={showModal}
                onHide={closeModal}
                title="Título personalizado"
                content="Contenido personalizado del modal"
                closeButtonLabel="Cerrar"
                saveButtonLabel="Guardar cambios"
                showSaveButton={true}
              />

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
      </div>
    </div>
  );
}
