"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";

import Header from "@public/components/Header";
import Sidebar from "@public/components/Sidebar";
import Input from "@public/components/Input";
import FileInput from "@public/components/FileInput"; // Corregir el import
import Notificacion from "@public/components/Notificacion";
import Footer from "@public/components/Footer";

import { pdfjs } from "react-pdf";
import { useDarkMode } from "@/app/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/app/UserContext";

import ModalInfo from "@public/components/ModalInfo"; // Asegúrate de ajustar la ruta de importación

import ModalTelefonoValidacion from "@public/components/ModalTelefonoValidacion"; // Asegúrate de ajustar la ruta de importación
import axios from "axios";

import { useRouter } from "next/navigation";
import getConfig from '@raiz/config';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
 
import "./style.css";

const FormularioRegistroMoral = () => {

  const { END_POINT_BACK } = getConfig();

  const stepsArray = ["Documentación", "Datos Generales", "Datos de Domicilio"];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [personaType, setPersonaType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [requiredFilesLoaded, setRequiredFilesLoaded] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const { userData, logout } = useUser();

  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [showModalTelefono, setShowModalTelefono] = useState(false);
  const [notificacion, setNotificacion] = React.useState(null);

  const [formCompleteValidaciones, setFormCompleteValidaciones] =
    useState(false);

  const handleCloseNotification = () => {
    setNotificacion(null); // Resetea la notificación cuando se cierra
  };
  const [errorMessagesRegistro, setErrorMessages] = useState({
    rfc: "",
    correo: "",
    confirmacion_correo: "",
    telefono_celular: "",
    telefono_residencial: "",
    razon_social: "",
  });

  const handleComprobar = (formData) => {
    axios
      .post(
       // "https://5vx83d9dgk.execute-api.us-east-1.amazonaws.com/validar-telefono-vum/validar",
       END_POINT_BACK + "validar-telefono-vum/validar",
        {
          body: {
            tipo: "telefono",
            telefono: formDataRegistro.telefono_celular,
            codigo_validacion: formData.telefono,
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data.statusCode == 400) {
          setNotificacion({ tipo: "warning", mensaje: "Codigo no valido" });
        }

        if (response.data.statusCode == 200) {
          setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });

          closeModalDatos();
          setCurrentStep(3);
        }
      })
      .catch((error) => {
        // Manejar errores de la petición
        console.error("Error en la petición:", error);
        // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
      });
  };

  const router = useRouter();

  const [formDataValidaciones, setFormDataValidaciones] = useState({
    correo: "",
    telefono_celular: "",
  });

  const [formDataRegistro, setFormDataRegistro] = useState({
    rfc: "",
    correo: "",
    confirmacion_correo: "",
    telefono_celular: "",
    telefono_residencial: "",
    razon_social: "",
  });

  const [errorsRegistro, setErrorsRegistro] = useState({
    rfc: false,
    razon_social: false,
    correo: false,
    confirmacion_correo: false,
    telefono_celular: false,
    telefono_residencial: false,
  });

  const handleInputChangeRegistro = (fieldName, value) => {
    // Validar según el campo
    let isValid = true;
    let errorMessageRegistro = "";

    // Define los campos obligatorios
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
      "clave_acceso",
      "clave_acceso_repetida",
    ];

    switch (fieldName) {
      case "curp":
        isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,8}$/.test(value);
        errorMessageRegistro = isValid ? "" : "Formato de CURP no válido.";
        break;
      case "rfc":
        isValid = /^[A-Za-z]{0,4}[0-9]{0,6}[A-Za-z0-9]{0,3}$/.test(value);
        errorMessageRegistro = isValid ? "" : "Formato de RFC no válido.";
        break;
      case "razon_social":
      case "nombre":
      case "primer_apellido":
      case "segundo_apellido":
        isValid = /^[A-Za-z\s]*$/.test(value);
        errorMessageRegistro = isValid
          ? ""
          : "Solo se permiten letras y espacios.";
        break;
      case "correo":
      case "confirmacion_correo":
        // Agrega la lógica de validación para el correo electrónico si es necesario
        // isValid = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(value);
        break;
      case "telefono_celular":
        isValid = /^\d{10}$/.test(value);
        errorMessageRegistro = isValid
          ? ""
          : "Formato de número de teléfono no válido.";
        break;
      case "telefono_residencial":
        if (value.trim() === "") {
          isValid = true; // Permitir campo vacío
          errorMessage = "";
        } else {
          isValid = /^\d{10}$/.test(value);
          errorMessageRegistro = isValid
            ? ""
            : "El número de teléfono residencial debe contener 9 dígitos.";
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

    // Verifica si el campo es obligatorio y está vacío
    if (camposObligatorios.includes(fieldName) && !value.trim()) {
      isValid = false;
      errorMessageRegistro = "Este campo es obligatorio.";
    }

    setErrorsRegistro({
      ...errorMessagesRegistro,
      [fieldName]: !isValid,
    });

    // Actualizar el estado del formulario solo si el valor es válido
    // if (isValid) {
    setFormDataRegistro({
      ...formDataRegistro,
      [fieldName]: value,
    });
    // }

    // Devolver el mensaje de error para mostrar en el Input
    return errorMessageRegistro;
  };

  useEffect(() => {
    // Verificar si todos los campos necesarios están completos después del tiempo de espera
    const timeoutId = setTimeout(() => {
      let isFormComplete;
      let updatedErrorMessages = { ...errorMessagesRegistro };

      isFormComplete =
        /^[A-Za-z]{3}\d{3}[A-Za-z0-9]{6}$/.test(formDataRegistro.rfc) &&
        /^[A-Za-z\s]*$/.test(formDataRegistro.razon_social) &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
          formDataRegistro.correo
        ) &&
        formDataRegistro.confirmacion_correo !== "" &&
        formDataRegistro.telefono_celular.length === 10 &&
        /^[\d\s()-]*$/.test(formDataRegistro.telefono_celular) &&
        (formDataRegistro.telefono_residencial.trim() === "" ||
          (formDataRegistro.telefono_residencial.length === 10 &&
            /^[\d\s()-]*$/.test(formDataRegistro.telefono_residencial)));

      updatedErrorMessages.rfc =
        /^[A-Za-z]{3}\d{3}[A-Za-z0-9]{6}$/.test(formDataRegistro.rfc) &&
        formDataRegistro.rfc.trim() !== ""
          ? ""
          : "Mensaje de error para RFC (no debe estar vacío y debe cumplir el formato)";

      updatedErrorMessages.razon_social =
        /^[A-Za-z\s]*$/.test(formDataRegistro.razon_social) &&
        formDataRegistro.razon_social.trim() !== ""
          ? ""
          : "Mensaje de error para Razón Social (no debe estar vacío y solo debe contener letras y espacios)";

      updatedErrorMessages.correo =
        formDataRegistro.correo.trim() !== "" &&
        /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(
          formDataRegistro.correo
        )
          ? ""
          : "Mensaje de error para Correo (no debe estar vacío y debe ser una dirección de correo válida)";

      updatedErrorMessages.confirmacion_correo =
        formDataRegistro.confirmacion_correo.trim() ===
        formDataRegistro.correo.trim()
          ? ""
          : "Mensaje de error para Confirmación de Correo (debe coincidir con el correo principal)";

      updatedErrorMessages.telefono_celular =
        /^[\d\s()-]*$/.test(formDataRegistro.telefono_celular) &&
        formDataRegistro.telefono_celular.trim() !== ""
          ? ""
          : "Mensaje de error para Teléfono Celular (no debe estar vacío y solo debe contener dígitos, espacios y paréntesis)";

      updatedErrorMessages.telefono_residencial =
        formDataRegistro.telefono_residencial.trim() === "" ||
        /^[\d\s()-]*$/.test(formDataRegistro.telefono_residencial)
          ? ""
          : "Mensaje de error para Teléfono Residencial (solo debe contener dígitos, espacios y paréntesis)";

      if (
        Object.values(updatedErrorMessages).some((message) => message !== "")
      ) {
        isFormComplete = false;
      }
      setFormComplete(isFormComplete);
      setErrorMessages(updatedErrorMessages);
    }, 500); // Puedes ajustar el tiempo de espera según tus necesidades

    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formDataRegistro, personaType, errorMessagesRegistro]);

  const [formCompleteDomicilio, setFormCompleteDomicilio] = useState(false);

  const [errorMessagesDomicilio, setErrorMessagesDomicilio] = useState({
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

  const [formDataDomicilio, setFormDataDomicilio] = useState({
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

  const [errorsDomicilio, setErrorsDomicilio] = useState({
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

  const handleInputChangeDomicilio = (fieldName, value) => {
    // Validar según el campo
    let isValid = true;
    let errorMessageDomicilio = "";

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
        errorMessageDomicilio = isValid
          ? ""
          : "Solo se permiten letras y espacios.";
        break;
      case "codigo_postal":
        isValid = /^\d{5}$/.test(value);
        errorMessageDomicilio = isValid
          ? ""
          : "El código postal debe contener 5 dígitos.";
        break;
      case "calle":
      case "entre_calle":
      case "referencia":
        isValid = /^[A-Za-z0-9\s]*$/.test(value);
        errorMessageDomicilio = isValid
          ? ""
          : "Solo se permiten letras, números y espacios.";
        break;
      case "numero_exterior":
      case "numero_interior":
        isValid = /^[A-Za-z0-9\s-]*$/.test(value);
        errorMessageDomicilio = isValid
          ? ""
          : "Solo se permiten letras, números, espacios y guiones.";
        break;
      default:
        break;
    }

    // Verifica si el campo es obligatorio y está vacío
    if (camposObligatorios.includes(fieldName) && !value.trim()) {
      isValid = false;
      errorMessageDomicilio = "Este campo es obligatorio.";
    }

    setErrorsDomicilio({
      ...errorsDomicilio,
      [fieldName]: !isValid,
    });

    // Actualizar el estado del formulario solo si el valor es válido
    // if (isValid) {
    setFormDataDomicilio({
      ...formDataDomicilio,
      [fieldName]: value,
    });
    // }

    // Devolver el mensaje de error para mostrar en el Input
    return errorMessageDomicilio;
  };

  useEffect(() => {
    // Verificar si todos los campos necesarios están completos después del tiempo de espera
    const timeoutId = setTimeout(() => {
      let updatedErrorMessages = { ...errorMessagesDomicilio };

      let isFormComplete =
        formDataDomicilio.estado.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.estado) &&
        formDataDomicilio.municipio.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.municipio) &&
        formDataDomicilio.localidad.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.localidad) &&
        formDataDomicilio.colonia.trim() !== "" &&
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.colonia) &&
        formDataDomicilio.codigo_postal.trim() !== "" &&
        /^\d{5}$/.test(formDataDomicilio.codigo_postal) &&
        formDataDomicilio.calle.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.calle) &&
        formDataDomicilio.numero_exterior.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.numero_exterior
        ) &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.numero_interior
        ) &&
        formDataDomicilio.entre_calle.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.entre_calle
        ) &&
        //formData.referencia.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.referencia);

      updatedErrorMessages.estado =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.estado) &&
        formDataDomicilio.estado.trim() !== ""
          ? ""
          : "Mensaje de error para Estado (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.municipio =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.municipio) &&
        formDataDomicilio.municipio.trim() !== ""
          ? ""
          : "Mensaje de error para Municipio (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.localidad =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.localidad) &&
        formDataDomicilio.localidad.trim() !== ""
          ? ""
          : "Mensaje de error para Localidad (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.colonia =
        /^[A-Za-záéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.colonia) &&
        formDataDomicilio.colonia.trim() !== ""
          ? ""
          : "Mensaje de error para Colonia (no debe estar vacío y puede contener letras, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.codigo_postal =
        /^\d{5}$/.test(formDataDomicilio.codigo_postal) &&
        formDataDomicilio.codigo_postal.trim() !== ""
          ? ""
          : "Mensaje de error para Código Postal (debe contener 5 dígitos y no estar vacío)";

      updatedErrorMessages.calle =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(formDataDomicilio.calle) &&
        formDataDomicilio.calle.trim() !== ""
          ? ""
          : "Mensaje de error para Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.numero_exterior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.numero_exterior
        ) && formDataDomicilio.numero_exterior.trim() !== ""
          ? ""
          : "Mensaje de error para Número Exterior (no debe estar vacío y puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.numero_interior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.numero_interior
        )
          ? ""
          : "Mensaje de error para Número Interior (puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.entre_calle =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
          formDataDomicilio.entre_calle
        ) && formDataDomicilio.entre_calle.trim() !== ""
          ? ""
          : "Mensaje de error para Entre Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.referencia = /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,'-]*$/.test(
        formDataDomicilio.referencia
      )
        ? //&& formData.referencia.trim() !== ""
          ""
        : "Mensaje de error para Referencia (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      setFormCompleteDomicilio(isFormComplete);
      setErrorMessagesDomicilio(updatedErrorMessages);
    }, 500); // Puedes ajustar el tiempo de espera según tus necesidades

    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta o se actualiza
  }, [formDataDomicilio, errorMessagesDomicilio]);

  const [formCompleteRegistro, setFormComplete] = useState(false);

  const [formDataDocumentacion, setFormDataDocumentacion] = useState({
    constancia_situacion_fiscal: "",
    certificado: "",
    clave_privada: "",
    contrasenia_clave_privada: "",
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

        rfc = extraerInformacion(text, rfcPatternMoral);

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
        /*
        actualizarDatos({
          rfc: informacionContribuyente.rfc,
          curp: informacionContribuyente.curp,
          nombre: informacionContribuyente.nombre,
          primer_apellido: informacionContribuyente.primerApellido,
          segundo_apellido: informacionContribuyente.segundoApellido,
        });

        */

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const validationFunctions = [
    () => formCompleteValidaciones, // Para el primer paso, siempre mostrar el botón
    () => formCompleteRegistro, // Para el segundo paso
    () => formCompleteDomicilio, // Para el tercer paso
  ];

  const handleButtonClick = async () => {};

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  const totalSteps = 3;

  const handleNextStep = () => {
    console.log(currentStep);

    if (currentStep === 1) {
      console.log("Evento específico para handleNextStep en el paso 1");
      const informacionGuardada = JSON.parse(
        localStorage.getItem("informacionContribuyente")
      );

      actualizarFormDataDomicilio({
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

      actualizarFormDataRegistro({
        rfc: informacionGuardada.rfc,
        razon_social: informacionGuardada.razonSocial,
      });
      setCurrentStep(2);
    }
    if (currentStep === 2) {
      setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });

      closeModalDatos();
      setCurrentStep(3);
      /*
      
      axios.post('https://5vx83d9dgk.execute-api.us-east-1.amazonaws.com/validar-telefono-vum/enviar-codigo-validacion', {
        body: {
          telefono: formDataRegistro.telefono_celular
        }
      })
        .then(response => {
            setShowModalTelefono(true);  
         
         })
        .catch(error => {
           console.error('Error en la petición:', error);
         });
         */
    }
    if (currentStep === 3) {

      let formDatainicial = {
        part_key: formDataRegistro.rfc,
      };

      formDatainicial = {
        ...formDatainicial,
        tipo_persona: "M",
        rfc: formDataRegistro.rfc || "", 
        correo_electronico: formDataRegistro.correo || "",
        confirmacion_correo: formDataRegistro.confirmacion_correo || "",
        telefono_celular: formDataRegistro.telefono_celular || "",
        telefono_residencial: formDataRegistro.telefono_residencial || "",
        razon_social: formDataRegistro.razon_social || "" 
      };

       
     
      axios.post(
        //'https://hsl0nk3vi3.execute-api.us-east-1.amazonaws.com/dev/vum-registro-test'
        END_POINT_BACK + '/contribuyente/registro',
        formDatainicial)
        .then(response => {
          console.log(response);

           if(response.status == 400){
               setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });
  
           }
  
           if(response.status == 200){ 
            console.log(response);
            envioenlaceRepresentanteMoral();
              
            }
  
        })
        .catch(error => {
          // Manejar errores de la petición
          console.error('Error en la petición:', error);
          // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
        });
 
     // router.push("/registromoral/validacionsap");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    /*
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    if (currentStep === 1) {
      console.log("Evento específico para handleNextStep en el paso 1");
    }
    if (currentStep === 2) {
      console.log("Evento específico para handleNextStep en el paso 2");
    }


    */
  };


  function envioenlaceRepresentanteMoral() {
    // Hacer algo con la data o realizar otras operaciones
    console.log(formDataRegistro.rfc);

     let envioenlace = {
      body: {
        representante: userData.rfc,
      representado: formDataRegistro.rfc
      }
       
    }
    // Realizar otra petición Axios dentro de esta función
    axios.post(
      //'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/representante/asignar'
      END_POINT_BACK + '/representante/asignar', 
      envioenlace)
    .then(response => {
             setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });

             setTimeout(() => {
              router.push("/listadomoral");
            }, 5000);

        })
        .catch(error => {
            // Manejar errores de la segunda petición Axios
            console.error('Error en la segunda petición:', error);
        });
}

  const actualizarFormDataRegistro = (nuevosDatos) => {
    // Filtrar los nuevos datos para excluir aquellos que son nulos o vacíos
    const datosFiltrados = Object.fromEntries(
      Object.entries(nuevosDatos).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    // Actualizar formData solo si hay datos válidos en nuevosDatos
    if (Object.keys(datosFiltrados).length > 0) {
      setFormDataRegistro((prevFormData) => ({
        ...prevFormData,
        ...datosFiltrados,
      }));
    }
  };

  const actualizarFormDataDomicilio = (nuevosDatos) => {
    const errores = validarCamposDomicilio(nuevosDatos);

    // Filtrar los nuevos datos para excluir aquellos que son nulos o vacíos
    const datosFiltrados = Object.fromEntries(
      Object.entries(nuevosDatos).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    // Actualizar formData solo si hay datos válidos en nuevosDatos
    if (Object.keys(datosFiltrados).length > 0) {
      setFormDataDomicilio((prevFormData) => ({
        ...prevFormData,
        ...datosFiltrados,
      }));
    }
  };

  const validarCamposDomicilio = (nuevosDatos) => {
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

    setErrorsDomicilio((prevErrors) => ({
      ...prevErrors,
      ...errores,
    }));

    // Devolver el objeto de errores
    return errores;
  };

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
                                Constancia de Situación Fiscal (.pdf) (*){" "}
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
                                  formDataDocumentacion.constancia_situacion_fiscal
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
                                  handleFileChange(file, "certificado")
                                }
                                value={formDataDocumentacion.certificado}
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
                                  handleFileChange(file, "clave_privada")
                                }
                                value={formDataDocumentacion.clave_privada}
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
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  fontSize: "1rem", // Ajusta el tamaño inicial según tus necesidades
                                }}
                                onClick={() =>
                                  openModal(
                                    "Contraseña de clave privada",
                                    '<label className="label-form">Al generar tu firma Electrónica, se agrega una contraseña definida por la persona, favor de intruducir la contraseña (No es la de Llave 2.0).<br /><a href="https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma" target="_blank" rel="noopener noreferrer"> Obtén tu certificado de e.firma aquí</a></label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <Input
                                id="clave_acceso_repetidaInput"
                                type="password"
                                iconClass="icon-container-registro"
                                onChange={(file) =>
                                  handleFileChange(file, "contrasenia_clave_privada")
                                }
                                value={
                                  formDataDocumentacion.clave_acceso_repetida
                                }
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
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">RFC (*)</label>
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
                                  value={formDataRegistro.rfc}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("rfc", value)
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
                            <div className="col-sm-12 col-md-12">
                              <div className="col-12">
                                <label>Razón Social (*)</label>
                              </div>
                              <div className="col-12">
                                <Input
                                  value={formDataRegistro.razon_social}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "razon_social",
                                      value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Correo electrónico
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Correo electrónico",
                                      '<label className="label-form">Introduce tu dirección de correo electrónico. Este es un identificador único que utilizas para recibir mensajes y notificaciones en línea. <br />Ejemplo: tuCorreo@ejemplo.com<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="correoInput"
                                  value={formDataRegistro.correo}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("correo", value)
                                  }
                                  error={
                                    errorsRegistro.correo
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Repetir correo electrónico
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
                                  value={formDataRegistro.confirmacion_correo}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "confirmacion_correo",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.confirmacion_correo
                                      ? "Por favor, ingrese un Correo válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Teléfono Celular (*)
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
                                  value={formDataRegistro.telefono_celular}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "telefono_celular",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.telefono_celular
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Teléfono Residencial{" "}
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
                                  value={formDataRegistro.telefono_residencial}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "telefono_residencial",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.telefono_residencial
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center w-100 width-form">
                      <div className="row width-form-content">
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-12 bg-armarillo text-small text-guinda">
                                {errorMessagesRegistro.curp && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.curp}
                                  </p>
                                )}
                                {errorMessagesRegistro.rfc && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.rfc}
                                  </p>
                                )}
                                {errorMessagesRegistro.nombre && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.nombre}
                                  </p>
                                )}
                                {errorMessagesRegistro.primer_apellido && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.primer_apellido}
                                  </p>
                                )}
                                {errorMessagesRegistro.correo && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.correo}
                                  </p>
                                )}
                                {errorMessagesRegistro.confirmacion_correo && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.confirmacion_correo}
                                  </p>
                                )}

                                {errorMessagesRegistro.telefono_celular && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.telefono_celular}
                                  </p>
                                )}
                                {errorMessagesRegistro.telefono_residencial && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.telefono_residencial}
                                  </p>
                                )}
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
                              <div className="col-xs-12 col-sm-6 col-lg-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Código Postal (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Código Postal",
                                        '<label className="label-form">Es un código numérico o alfanumérico que complementa la dirección física y representa una zona geográfica del país.<br /><a href="https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx" target="_blank" rel="noopener noreferrer">Consulta tu Código Postal aquí</a></label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="codigo_postalInput"
                                    value={formDataDomicilio.codigo_postal}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "codigo_postal",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.codigo_postal
                                        ? "Por favor, ingrese un código postal válido."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-6 col-lg-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Estado (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Estado",
                                        '<label className="label-form"> Selecciona tu estado según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="estadoInput"
                                    value={formDataDomicilio.estado}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "estado",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.estado
                                        ? "Por favor, ingrese un estado válido."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-6 col-lg-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Municipio (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Municipio",
                                        '<label className="label-form"> Selecciona tu Municipio según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="municipioInput"
                                    value={formDataDomicilio.municipio}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "municipio",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.municipio
                                        ? "Por favor, ingrese un municipio válido."
                                        : ""
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-xs-12 col-sm-6 col-lg-3">
                                <div className="col-12">
                                  <label className="label-form">
                                    Localidad (*)
                                  </label>
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Localidad",
                                        '<label className="label-form"> Selecciona tu Localidad según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="localidadInput"
                                    value={formDataDomicilio.localidad}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "localidad",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.localidad
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
                                  <label className="label-form">
                                    Colonia (*)
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
                                    value={formDataDomicilio.colonia}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "colonia",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.colonia
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
                                    value={formDataDomicilio.calle}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio("calle", value)
                                    }
                                    error={
                                      errorsDomicilio.calle
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
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "N° Exterior",
                                        '<label className="label-form"> Escribe tu Número Exterior según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="numero_exteriorInput"
                                    value={formDataDomicilio.numero_exterior}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "numero_exterior",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.numero_exterior
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
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "N° Interior",
                                        '<label className="label-form"> Escribe tu Número Interior según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="numero_interiorInput"
                                    value={formDataDomicilio.numero_interior}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "numero_interior",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.numero_interior
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
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Entre Calle",
                                        '<label className="label-form"> Escribe el siguiente valor según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="entre_calleInput"
                                    value={formDataDomicilio.entre_calle}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "entre_calle",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.entre_calle
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
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      openModal(
                                        "Referencia",
                                        '<label className="label-form"> Escribe la Referencia según la constancia del SAT </label>'
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    id="referenciaInput"
                                    value={formDataDomicilio.referencia}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "referencia",
                                        value
                                      )
                                    }
                                    error={
                                      errorsDomicilio.referencia
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

                    <div className="d-flex justify-content-center w-100 width-form">
                      <div className="row width-form-content">
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-12 bg-armarillo text-small text-guinda">
                                {errorMessagesDomicilio.estado && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.estado}
                                  </p>
                                )}
                                {errorMessagesDomicilio.municipio && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.municipio}
                                  </p>
                                )}
                                {errorMessagesDomicilio.localidad && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.localidad}
                                  </p>
                                )}
                                {errorMessagesDomicilio.colonia && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.colonia}
                                  </p>
                                )}
                                {errorMessagesDomicilio.codigo_postal && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.codigo_postal}
                                  </p>
                                )}
                                {errorMessagesDomicilio.calle && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.calle}
                                  </p>
                                )}
                                {errorMessagesDomicilio.numero_exterior && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.numero_exterior}
                                  </p>
                                )}
                                {errorMessagesDomicilio.numero_interior && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.numero_interior}
                                  </p>
                                )}
                                {errorMessagesDomicilio.entre_calle && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.entre_calle}
                                  </p>
                                )}
                                {errorMessagesDomicilio.referencia && (
                                  <p className="error-message">
                                    {errorMessagesDomicilio.referencia}
                                  </p>
                                )}
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
                          className={`cta ${
                            !formCompleteDomicilio
                              ? "cta--disable"
                              : "cta--guinda"
                          }`}
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
                            className={`cta ${
                              !requiredFilesLoaded
                                ? "cta--disable"
                                : "cta--guinda"
                            }`}
                            value="Siguiente"
                            onClick={handleNextStep}
                            disabled={!requiredFilesLoaded}
                          />
                        )}
                        {currentStep === 2 && (
                          <input
                            type="button"
                            name="next-step"
                            className={`cta ${
                              !formCompleteRegistro
                                ? "cta--disable"
                                : "cta--guinda"
                            }`}
                            value="Siguiente"
                            onClick={handleNextStep}
                            disabled={!formCompleteRegistro}
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

export default FormularioRegistroMoral;
