"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";

import Header from "@public/components/Header";
import Footer from "@public/components/Footer";

import Sidebar from "@public/components/Sidebar";
import Input from "@public/components/Input";
import ReadOnlyInput from "@public/components/ReadOnlyInput";

import ModalSelection from '@public/components/ModalSelection';


 
import FileInput from "@public/components/FileInput"; // Corregir el import
import Notificacion from "@public/components/Notificacion";

import Select from '@public/components/Select'; // Ajusta la importación según la ubicación de tu componente MultiSelect


import { pdfjs } from "react-pdf";
import { useDarkMode } from "src/app/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import ModalInfo from "@public/components/ModalInfo"; // Asegúrate de ajustar la ruta de importación

import ModalTelefonoValidacion from "@public/components/ModalTelefonoValidacion"; // Asegúrate de ajustar la ruta de importación
import axios from "axios";
import { useRouter } from "next/navigation";
 import getConfig from '@raiz/config';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import "./style.css";

const RegistroPersonaFisica = () => {
  const { END_POINT_BACK } = getConfig();

  const stepsArray = ["Documentación", "Datos Generales", "Datos de Domicilio"];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [personaType, setPersonaType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [requiredFilesLoaded, setRequiredFilesLoaded] = useState(false);

  const [contribuyentenuevo, setContribuyenteNuevo] = useState(true);


  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [showModalTelefono, setShowModalTelefono] = useState(false);
  const [showModalOficinas, setShowModalOficinas] = useState(false);

  const [notificacion, setNotificacion] = React.useState(null);


  const [municipios, setMunicipios] = useState([]);
  
  const [municipioSeleccionado, setMunicipioSeleccionado] =  useState(null);
  const [localidadSeleccionado, setLocalidadSeleccionado] =  useState(null);
  const [cpSeleccionado, setCPSeleccionado] =  useState(null);
  const [coloniaSeleccionada, setColoniaSeleccionada] =  useState(null);
  const [oficinaSeleccionada, setOficinaSeleccionada] =  useState(null);


  const [opcionesEstados, setopcionesEstados] = useState([]);
  const [opcionesMunicipio, setopcionesMunicipio] = useState([]);
  const [opcionesLocalidades, setopcionesLocalidades] = useState([]);
  const [opcionesColonias, setopcionesColonias] = useState([]);
  const [opcionesOficinas, setopcionesOficinas] = useState([]);

  const [showCP, setShowCP] = useState(false);

  const [showEstadoEditar, setShowEstadoEditar] = useState(false);
  const [showMunicipioEditar, setShowMunicipioEditar] = useState(false);
  const [showLocalidadEditar, setShowLocalidadEditar] = useState(false);
  const [showColoniaEditar, setShowColoniaEditar] = useState(false);




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


  const handleComprobar = async (formData)  => { 

    handleComprobarCorreo(formData)


    /*
    setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });

    closeModalDatos();
    setCurrentStep(3);

    */
    /*
   
    axios.post('https://5vx83d9dgk.execute-api.us-east-1.amazonaws.com/validar-telefono-vum/validar', {
      body: {
        tipo: 'telefono',
        telefono: formDataRegistro.telefono_celular,
        codigo_validacion: formData.telefono
      }
    })
      .then(response => {
         
         if(response.data.statusCode == 400){
             setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });

         }

         if(response.data.statusCode == 200){

          handleComprobarCorreo(formData)

         
       }

      })
      .catch(error => {
        // Manejar errores de la petición
        console.error('Error en la petición:', error);
        // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
      });

      */
  }; 

  
  const handleComprobarCorreo = async (formData) => {
    try {
      const response = await axios.post(
        'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/validar-telefono-vum/validar',
        {
         // body: {
            tipo: "correo_electronico",
            correo_electronico: formDataRegistro.correo,
            codigo_validacion: formData.correo,
         // },
        }
      );


      setShowModalTelefono(false);  

      if (!response.data['valido']) {
        setNotificacion({ tipo: "warning", mensaje: "Codigo no valido" });
      }
  
      if (response.data['valido']) {
        setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });
  
       
  
          try {
            const response = await axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/direccion', {
                cp: formDataDomicilio.codigo_postal,
            });
            
            let arregloresultados = response.data['Direcciones']['TB_RESULTADO']
    
            const referenciaPais = "País";
            const referenciaEstado = "Estado";
            const referenciaMunicipio = "Municipio";
            const referenciaLocalidad = "Localidad";
    
            const pais = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaPais);
            const estado = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaEstado);
            const municipio = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaMunicipio);
            const localidad = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaLocalidad);
    
            if(estado['IDENTIFICADOR'] == 'MCH'){
              setMunicipioSeleccionado(municipio)
              setLocalidadSeleccionado(localidad)
              setCPSeleccionado(formDataDomicilio.codigo_postal);
              setTimeout(() => {
                 
                obtenerColonias(municipio,localidad);        
              }, 2000);
            }else{
              setIsLoading(false); 
    
              setShowCP(true);
              setShowEstadoEditar(false);
              setShowMunicipioEditar(false);
              setShowLocalidadEditar(false);
              setShowColoniaEditar(false);
    
              setFormDataDomicilio((prevData) => ({
                ...prevData,
                estado: "",
                municipio: "",
                localidad: "",
                colonia: "",
              }));
              setCurrentStep(3);
    
    
    
    
    
            }
         } catch (error) {
            console.error('Error en la petición:', error);
        }  
      
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

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
    curp: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    razon_social: "",
    clave_acceso: "",
    clave_acceso_repetida: "",
  });

  const [errorsRegistro, setErrorsRegistro] = useState({
    curp: false,
    rfc: false,
    razon_social: false,
    nombre: false,
    primer_apellido: false,
    segundo_apellido: false,
    correo: false,
    confirmacion_correo: false,
    telefono_celular: false,
    telefono_residencial: false,
    clave_acceso: false,
    clave_acceso_repetida: false,
  });


  
 
  const handleInputChangeRegistro = (fieldName, value) => {
    let isValid = true;
    let errorMessageRegistro = "";

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
        /^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{8}$/.test(formDataRegistro.curp) &&
        /^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{3}$/.test(formDataRegistro.rfc) &&
        /^[A-Za-z\s]*$/.test(formDataRegistro.nombre) &&
        /^[A-Za-z\s]*$/.test(formDataRegistro.primer_apellido) &&
        /^(?:[A-Za-z\s]*|)$/.test(formDataRegistro.segundo_apellido) &&
        /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(
          formDataRegistro.correo
        ) &&
        /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(
          formDataRegistro.confirmacion_correo
        ) &&
        formDataRegistro.confirmacion_correo.trim() ===
          formDataRegistro.correo.trim() &&
        formDataRegistro.telefono_celular.length === 10 &&
        /^[\d\s()-]*$/.test(formDataRegistro.telefono_celular) &&
        (formDataRegistro.telefono_residencial.trim() === "" ||
          (formDataRegistro.telefono_residencial.length === 10 &&
            /^[\d\s()-]*$/.test(formDataRegistro.telefono_residencial))) &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
          formDataRegistro.clave_acceso
        ) &&
        formDataRegistro.clave_acceso.trim() ===
          formDataRegistro.clave_acceso_repetida.trim();

      updatedErrorMessages.curp =
        /^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{8}$/.test(formDataRegistro.curp) &&
        formDataRegistro.curp.trim() !== ""
          ? ""
          : "Mensaje de error para CURP (no debe estar vacío y debe cumplir el formato)";

      updatedErrorMessages.rfc =
        /^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{3}$/.test(formDataRegistro.rfc) &&
        formDataRegistro.rfc.trim() !== ""
          ? ""
          : "Mensaje de error para RFC (no debe estar vacío y debe cumplir el formato)";

      updatedErrorMessages.nombre =
        /^[A-Za-z\s]*$/.test(formDataRegistro.nombre) &&
        formDataRegistro.nombre.trim() !== ""
          ? ""
          : "Mensaje de error para Nombre (no debe estar vacío y solo debe contener letras y espacios)";

      updatedErrorMessages.primer_apellido =
        /^[A-Za-z\s]*$/.test(formDataRegistro.primer_apellido) &&
        formDataRegistro.primer_apellido.trim() !== ""
          ? ""
          : "Mensaje de error para Primer Apellido (no debe estar vacío y solo debe contener letras y espacios)";

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

      updatedErrorMessages.clave_acceso =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
          formDataRegistro.clave_acceso
        )
          ? ""
          : "Mensaje de error para Contraseña (debe contener al menos una letra mayúscula, un número, un símbolo y tener al menos 8 caracteres)";

      updatedErrorMessages.clave_acceso_repetida =
        formDataRegistro.clave_acceso_repetida.trim() ===
        formDataRegistro.clave_acceso.trim()
          ? ""
          : "Mensaje de error para Confirmación de Contraseña (debe coincidir con la contraseña principal)";

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
        isValid = /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(value);
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
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(formDataDomicilio.calle) &&
        formDataDomicilio.numero_exterior.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.numero_exterior
        ) &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.numero_interior
        ) &&
        formDataDomicilio.entre_calle.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.entre_calle
        ) &&
        //formData.referencia.trim() !== "" &&
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(formDataDomicilio.referencia);

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
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(formDataDomicilio.calle) &&
        formDataDomicilio.calle.trim() !== ""
          ? ""
          : "Mensaje de error para Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.numero_exterior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.numero_exterior
        ) && formDataDomicilio.numero_exterior.trim() !== ""
          ? ""
          : "Mensaje de error para Número Exterior (no debe estar vacío y puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.numero_interior =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.numero_interior
        )
          ? ""
          : "Mensaje de error para Número Interior (puede contener letras, números, espacios, guiones, acentos y signos de puntuación)";

      updatedErrorMessages.entre_calle =
        /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
          formDataDomicilio.entre_calle
        ) && formDataDomicilio.entre_calle.trim() !== ""
          ? ""
          : "Mensaje de error para Entre Calle (no debe estar vacío y puede contener letras, números, espacios, acentos y signos de puntuación)";

      updatedErrorMessages.referencia = /^[A-Za-z0-9áéíóúüÁÉÍÓÚÜ\s.,';-]*$/.test(
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


  const TIPOS_DOCUMENTO = {
    constancia_situacion_fiscal: 38,
    comprobante_domicilio: 3,
    identificacion_contribuyente: 4,
    comprobante_curp: 7 
  };
  

  const [formDataDocumentacion, setFormDataDocumentacion] = useState({
    constancia_situacion_fiscal: "",
    comprobante_domicilio: "",
    identificacion_contribuyente: "",
    comprobante_curp: "", 
    certificado: "",
    clave_privada: "",
    contrasenia_clave_privada: "",
  });


  useEffect(() => {
    const checkAndSetRequiredFilesLoaded = (formData) => {
      const areAllFieldsFilled = Object.values(formData).every(value => {
        if (value === null || typeof value === 'undefined') {
          // Tratar el caso de archivos (null o undefined)
          return false;
        }
  
        if (typeof value === 'string') {
          // Tratar el caso de strings (no es nulo y tiene longitud mayor a cero)
          return value.trim().length > 0;
        }
  
        // Otros tipos de datos, como File o cualquier otro, considerarlos como llenos
        return true;
      });
  
      if (areAllFieldsFilled) {
        setRequiredFilesLoaded(true);
      } else {
        setRequiredFilesLoaded(false);
      }
    };
  
    // Llamas a la función con el formulario actual
    checkAndSetRequiredFilesLoaded(formDataDocumentacion);
  }, [formDataDocumentacion]); // Se ejecutará cada vez que formDataDocumentacion cambie
  

  

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModalDatos = () => {
    setShowModalTelefono(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalOficinas = () => {
    setShowModalOficinas(false);
  };

  const handleFileChange = (file, fileType) => {
    // Maneja el archivo seleccionado como desees
    if (file && fileType === "constancia_situacion_fiscal") {
      loadPdfAndSearch(file);
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


  const handleSelectOption = (option) => {
    setOficinaSeleccionada(option)
     

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


        const numeroExteriorAux = extraerInformacion(text, numeroExteriorPattern);
        const numeroInteriorAux = extraerInformacion(text, numeroInteriorPattern);


        const esNumeroExterior = !isNaN(numeroExteriorAux);
        const esNumeroInterior = !isNaN(numeroInteriorAux);


        
        const codigoPostal = extraerInformacion(text, codigoPostalPattern);
        const tipoVialidad = extraerInformacion(text, tipoVialidadPattern);
        const nombreVialidad = extraerInformacion(text, nombreVialidadPattern);
        const numeroExterior = esNumeroExterior ? numeroExteriorAux : "";
        const numeroInterior = esNumeroInterior ? numeroInteriorAux : "";
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


        verificarVUMrepetido(informacionContribuyente.rfc);
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };

  const validationFunctions = [
    () => formCompleteValidaciones, // Para el primer paso, siempre mostrar el botón
    () => formCompleteRegistro, // Para el segundo paso
    () => formCompleteDomicilio, // Para el tercer paso
  ];

  const handleButtonClick = async () => {};

  const convertFileToBase64 = (file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        resolve(base64String);
      };

      reader.readAsDataURL(file);
    });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const contentContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };
  const totalSteps = 3;

  const verificarVUMrepetido = async (rfc)  => {
    axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/contribuyente', 
    {
     
        rfc: rfc,
   
      }
     )
    .then(response => {

        
      if (Array.isArray(response.data)) {
        setContribuyenteNuevo(true);

       } else if (typeof response.data === 'object' && response.data !== null) {
        setContribuyenteNuevo(false);

        openModal(
          "Contribuyente ya registrado",
          ' El contribuyente ya se encuentra registrado, favor de logearse usando el siguiente enlace. '
        )

       } 
    })
    .catch(error => {
    // Manejar errores de la petición
    console.error('Error en la petición:', error);
    // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
    });
  };


  const buscarDireccion = async ()  => {

    if(formDataDomicilio.codigo_postal!=null && formDataDomicilio.codigo_postal.length== 5){
      try {
        const response = await axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/direccion', {
            cp: formDataDomicilio.codigo_postal,
        });
        let arregloresultados = response.data['Direcciones']['TB_RESULTADO']
  
        const referenciaPais = "País";
        const referenciaEstado = "Estado";
        const referenciaMunicipio = "Municipio";
        const referenciaLocalidad = "Localidad";
  
        const pais = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaPais);
        const estado = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaEstado);
        const municipio = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaMunicipio);
        const localidad = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaLocalidad);
  
        if(estado['IDENTIFICADOR'] == 'MCH'){
          setMunicipioSeleccionado(municipio)
          setLocalidadSeleccionado(localidad)
          setCPSeleccionado(formDataDomicilio.codigo_postal);
          setFormDataDomicilio((prevData) => ({
            ...prevData,
            estado: estado['DESCRIPCION'],
            municipio: municipio['DESCRIPCION'],
            localidad: localidad['DESCRIPCION']
          }));
  
          setTimeout(() => {
             
            obtenerColonias(municipio,localidad);        
          }, 2000);
        }else{

          setNotificacion({ tipo: 'warning', mensaje: 'Por favor, utiliza códigos postales de Michoacán.' });
  
          setShowCP(true);
          setShowEstadoEditar(false);
          setShowMunicipioEditar(false);
          setShowLocalidadEditar(false);
          setShowColoniaEditar(false);
  
          setFormDataDomicilio((prevData) => ({
            ...prevData,
            estado: "",
            municipio: "",
            localidad: "",
            colonia: "",
          }));
          setCurrentStep(3); 
        }
     } catch (error) {
        console.error('Error en la petición:', error);
    }
    }else{
      
          setShowCP(true);
          setShowEstadoEditar(false);
          setShowMunicipioEditar(false);
          setShowLocalidadEditar(false);
          setShowColoniaEditar(false);
  
          setFormDataDomicilio((prevData) => ({
            ...prevData,
            estado: "",
            municipio: "",
            localidad: "",
            colonia: "",
          }));
    }

     
  
  };


   


  const realizarPeticion = async ()  => {
    
       const base64Stringcertificado = await convertFileToBase64(formDataDocumentacion.certificado);
       const base64Stringclaveprivada = await convertFileToBase64(formDataDocumentacion.clave_privada);
       
       
    axios.post(
      //'https://a48debk9gc.execute-api.us-east-1.amazonaws.com/validar/firma-digital',
      END_POINT_BACK + "validar/firma-digital", 
       {
     // body: {
        key: base64Stringclaveprivada,
        cer: base64Stringcertificado, 
        password: formDataDocumentacion.contrasenia_clave_privada
      //}
    })
    .then(response => {

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

      // Para pruebas eliminar

   
      actualizarFormDataRegistro({
        rfc: informacionGuardada.rfc,
       // correo: response.data.body.informacion.datosAdicionales.emailAddress,
       // confirmacion_correo: response.data.body.informacion.datosAdicionales.emailAddress, 
        //correo: 'cesar.santiago@sweettech.io',
        //confirmacion_correo: 'cesar.santiago@sweettech.io', 

        correo: 'csantiago@ehre-evolution.com',
        confirmacion_correo: 'csantiago@ehre-evolution.com', 

         

        curp: informacionGuardada.curp,
        nombre: informacionGuardada.nombre,
        primer_apellido: informacionGuardada.primerApellido,
        segundo_apellido: informacionGuardada.segundoApellido,
      });

    
      setIsLoading(false); 
      setCurrentStep(2);
    })
    .catch(error => {
      if(error.response && error.response.data && error.response.data.message === 'Endpoint request timed out'){
        // Vuelve a llamar a la función en caso de timeout
        realizarPeticion();
      } else {
        // Manejar otros errores aquí
        console.error('Error en la petición:', error);
      }
    });
 
  };


  

  const handleNextStep = async () => {
    if(!isLoading){
      if (currentStep === 1) {

        /*
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
  
        // Para pruebas eliminar
    
        actualizarFormDataRegistro({
          rfc: informacionGuardada.rfc,
          correo: 'csantiago@ehre-evolution.com',
          confirmacion_correo: 'csantiago@ehre-evolution.com', 
  
  
           
  
          curp: informacionGuardada.curp,
          nombre: informacionGuardada.nombre,
          primer_apellido: informacionGuardada.primerApellido,
          segundo_apellido: informacionGuardada.segundoApellido,
        });
  
        setIsLoading(false); 
        setCurrentStep(2);

        */
         
       setIsLoading(true);
       realizarPeticion();
  
  
     
      }
      if (currentStep === 2) {

        setIsLoading(true);

        axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/validar-correo-vum' , 
          {
          //body: {
            correo_electronico: formDataRegistro.correo
          //}
        })
          .then(response => {
             console.log(); 

            if(response.data['mensaje'] != 'Se envío correo de validación'){ 
              setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });
  
            }
  
            if(response.data['mensaje'] == 'Se envío correo de validación'){ 
               setShowModalTelefono(true);  
            }
            
             
           
           })
          .catch(error => {
            console.error('Error en la petición:', error);
          });
  

        
        /*
        setIsLoading(true); 
  
  
        try {
          const response = await axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/direccion', {
              cp: formDataDomicilio.codigo_postal,
          });
          
          let arregloresultados = response.data['Direcciones']['TB_RESULTADO']
  
          const referenciaPais = "País";
          const referenciaEstado = "Estado";
          const referenciaMunicipio = "Municipio";
          const referenciaLocalidad = "Localidad";
  
          const pais = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaPais);
          const estado = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaEstado);
          const municipio = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaMunicipio);
          const localidad = arregloresultados.find(objeto => objeto.REFERENCIA === referenciaLocalidad);
  
          if(estado['IDENTIFICADOR'] == 'MCH'){
            setMunicipioSeleccionado(municipio)
            setLocalidadSeleccionado(localidad)
            setCPSeleccionado(formDataDomicilio.codigo_postal);
            setTimeout(() => {
               
              obtenerColonias(municipio,localidad);        
            }, 2000);
          }else{
            setIsLoading(false); 
  
            setShowCP(true);
            setShowEstadoEditar(false);
            setShowMunicipioEditar(false);
            setShowLocalidadEditar(false);
            setShowColoniaEditar(false);
  
            setFormDataDomicilio((prevData) => ({
              ...prevData,
              estado: "",
              municipio: "",
              localidad: "",
              colonia: "",
            }));
            setCurrentStep(3);
  
  
  
  
  
          }
       } catch (error) {
          console.error('Error en la petición:', error);
      }

      */
 
   
  
  
        /*
        setNotificacion({ tipo: "success", mensaje: "Codigo Valido" });
  
        closeModalDatos();
        setCurrentStep(3);
  
        */
  
        /*
  
        axios.post(
          //'https://ckonn3ghzf.execute-api.us-east-1.amazonaws.com/validar-correo-vum/'
          END_POINT_BACK + "/validar-correo-vum/" , 
          {
          body: {
            correo_electronico: formDataRegistro.correo
          }
        })
          .then(response => {
  
            if(response.data.statusCode == 400){
              setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });
  
            }
  
            if(response.data.statusCode == 200){ 
               setShowModalTelefono(true);  
            }
            
             
           
           })
          .catch(error => {
            console.error('Error en la petición:', error);
          });
  
          */
  
       /* 
        axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/validar-telefono-vum/enviar-codigo-validacion', {
          //body: {
            telefono: formDataRegistro.telefono_celular
          //}
        })
          .then(response => { 
            if(response.data.statusCode == 400){
              setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });
  
            }
  
            if(response.data.statusCode == 200){ 
 
              console.log(formDataRegistro.correo);
              axios.post('https://ckonn3ghzf.execute-api.us-east-1.amazonaws.com/validar-correo-vum/', {
              body: {
                correo_electronico: formDataRegistro.correo
              }
            })
              .then(response => {
  
                if(response.data.statusCode == 400){
                  setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });
      
                }
      
                if(response.data.statusCode == 200){ 
                   setShowModalTelefono(true);  
                }
                
                 
               
               })
              .catch(error => {
                console.error('Error en la petición:', error);
              });
 
            }
  
             
           })
          .catch(error => {
            console.error('Error en la petición:', error);
          });

          */
   
      }
      if (currentStep === 3) {
        if(oficinaSeleccionada!=null){
          envioregistroSAP();
  
        }else{
  
          setShowModalOficinas(true);
  
        }
  
   
        
   
       
  
  
        /*
  
        
    
        axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/municipios' , { 
          tp_consulta:1
      })
        .then(response => {    
          console.log(response.data['Municipios']['TB_RESULTADO']);
          setMunicipios(response.data['Municipios']['TB_RESULTADO']);
          console.log(municipios);
  
          const resultadoMunicipio = municipios.find(elemento => elemento.DESCRIPCION == formDataDomicilio.municipio);
          console.log('---------------------------------------------------------');
          console.log(resultadoMunicipio['IDENTIFICADOR']);
          setMunicipioSeleccionado(resultadoMunicipio);
          console.log('---------------------------------------------------------');
          obtenerLocalidad();
  
          })
        .catch(error => {
          console.error('Error en la petición:', error);
        });
  
        */
    
  
   
        /*
  
  
   
        let formDatainicial = {
          part_key: formDataRegistro.rfc,
        };
  
        formDatainicial = {
          ...formDatainicial,
          tipo_persona: "F",
          rfc: formDataRegistro.rfc || "", 
          correo_electronico: formDataRegistro.correo || "",
          confirmacion_correo: formDataRegistro.confirmacion_correo || "",
          telefono_celular: formDataRegistro.telefono_celular || "",
          telefono_residencial: formDataRegistro.telefono_residencial || "",
          curp: formDataRegistro.curp || "",
          nombre: formDataRegistro.nombre || "",
          primer_apellido: formDataRegistro.primer_apellido || "",
          segundo_apellido: formDataRegistro.segundo_apellido || "",
        };
  
        console.log(formDatainicial);
    
   
        axios.post(
          END_POINT_BACK + "/contribuyente/registro" ,  
           formDatainicial)
          .then(response => {
  
            console.log(response);
  
            
            if(response.status == 400){
              setNotificacion({ tipo: 'error', mensaje: 'Error en el envio de información, favor de intentarlo mas tarde o ponerse en contacto con Soporte.' });
  
          }
  
          if(response.status == 200){ 
            //saguz
            if(response.data == 'ESTE REGISTRO YA EXISTE'){
              setNotificacion({ tipo: 'warning', mensaje: 'Usuario ya registrado, favor de logearse.' });
  
              setTimeout(() => {
                router.push("/terminos");
              }, 3000);
            }else{
              setNotificacion({ tipo: 'sucess', mensaje: 'Reedirigiendo a terminos y condiciones de uso.' });
              setTimeout(() => {
                router.push("/terminos");
              }, 3000);
            }
             //guardadoDocumentosSAP()
             
           }
            
    
          })
          .catch(error => {
            // Manejar errores de la petición
            console.error('Error en la petición:', error);
            // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
          });
  
          */
  
           
       // router.push("/llave/terminos");
  
      }
    }

     
  };

  function quitarAcentosYCaracteresEspeciales(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '').toLowerCase();
  }

  function compararStrings(str1, str2) {
    const str1SinAcentos = quitarAcentosYCaracteresEspeciales(str1);
    const str2SinAcentos = quitarAcentosYCaracteresEspeciales(str2);
  
    return str1SinAcentos === str2SinAcentos;
  }

  const obtenerColonias = async (municipio,localidad) => {
    try {
        const response = await axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/colonias', {
            tp_consulta: 4,
            municipio: municipio['IDENTIFICADOR'],
            cp: formDataDomicilio.codigo_postal,
            localidad: localidad['IDENTIFICADOR'],
            colonia: ""
        });


        let arregloresultados = response.data['Colonias']['TB_RESULTADO']
        const arregloParseoColonia = arregloresultados.map(item => ({
          value: item.DESCRIPCION,
          label: item.DESCRIPCION
        }));
 

        setopcionesColonias(arregloParseoColonia);
        setTimeout(() => {
          setShowColoniaEditar(true);
          const colonia = arregloresultados.find(objeto => compararStrings(objeto.DESCRIPCION, formDataDomicilio.colonia));

        setColoniaSeleccionada(colonia);
        obtenerOficina(municipio);

         }, 1000);

 
 
         
        //envioregistroSAP();
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};

const obtenerOficina = async (municipio) => {
  try {
      const response = await axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/oficinas', {
          numero_localidad: municipio['IDENTIFICADOR'],
          catalogo: "OFICINA"
      });
      
      let arregloresultados = response.data['Oficinas']; 
      if (Array.isArray(arregloresultados)) {
        // Si es un arreglo, establecer opcionesOficinas
        setopcionesOficinas(arregloresultados);
      } else if (typeof arregloresultados === 'object' && arregloresultados !== null) {
        // Si es un objeto, establecer oficinaSeleccionada
        setOficinaSeleccionada(arregloresultados);
      }
      setIsLoading(false); 

       setCurrentStep(3);

      //  envioregistroSAP();
  } catch (error) {
      console.error('Error en la petición:', error);
  }
};

  function obtenerFechaNacimientoFromCURP(curp) {
    // Asumimos que los primeros 6 caracteres de la CURP representan la fecha de nacimiento
    const fechaNacimiento = curp.slice(4, 10);
  
    // Formateamos la fecha como "YYYY-MM-DD"
    const formattedFechaNacimiento = `19${fechaNacimiento.slice(0, 2)}-${fechaNacimiento.slice(2, 4)}-${fechaNacimiento.slice(4, 6)}`;
  
    return formattedFechaNacimiento;
  }

  function obtenerGeneroFromCURP(curp) {
    // Asumimos que el décimo octavo carácter de la CURP representa el género
    const decimoOctavoCaracter = curp.charAt(17);
  
    // Convertimos el décimo octavo carácter a un número
    const numeroGenero = parseInt(decimoOctavoCaracter, 10);
  
    // Determinamos el género según si el número es par o impar
    if (numeroGenero % 2 === 0) {
      return 1; // Mujer
    } else {
      return 0; // Hombre
    }
  }

 

  function rellenarConCerosSeisDigitos(numero) {
    const longitudDeseada = 6;
    const numeroComoCadena = numero.toString();
  
    if (numeroComoCadena.length >= longitudDeseada) {
      return numeroComoCadena;
    } else {
      const cerosRellenados = "0".repeat(longitudDeseada - numeroComoCadena.length);
      return cerosRellenados + numeroComoCadena;
    }
  }

  function rellenarConCeros(numero, longitudDeseada) {
    const numeroString = numero.toString();
    const cerosRellenados = "0".repeat(longitudDeseada - numeroString.length);
    return cerosRellenados + numeroString;
  }

  const envioregistroSAP = async () => {

    let objetoenvio = {
   
        //    persona_tipo:"F",
            oficina:oficinaSeleccionada['IDENTIFICADOR'],
            tp_persona:"",
            sexo:obtenerGeneroFromCURP(formDataRegistro.curp),
            cl_contrib:"0001",
            razon_social:"",
            representante:"",
            nombre:formDataRegistro.nombre || "",
            paterno:formDataRegistro.primer_apellido || "",
            materno:formDataRegistro.segundo_apellido || "",
            fec_nacimiento:obtenerFechaNacimientoFromCURP(formDataRegistro.curp),
            rfc: formDataRegistro.rfc,
            curp:formDataRegistro.curp,
            calle:formDataDomicilio.calle,
            num_ext:Number(formDataDomicilio.numero_exterior),
            num_int: formDataDomicilio.numero_interior ? Number(formDataDomicilio.numero_interior) : null,
            entre_calle:formDataDomicilio.entre_calle,
            y_calle:"",
            referencia:formDataDomicilio.referencia,
            telefono: formDataRegistro.telefono_residencial ? Number(formDataRegistro.telefono_residencial) : null,
            celular: Number(formDataRegistro.telefono_celular) ,
            pais:"MX",
            des_pais:"MÉXICO",
            estado:"MCH",
            des_estado:"MICHOACÁN",
            municipio:rellenarConCeros(municipioSeleccionado['IDENTIFICADOR'],12),
            des_municipio:municipioSeleccionado['DESCRIPCION'],
            cp:Number(formDataDomicilio.codigo_postal),
            localidad: rellenarConCerosSeisDigitos(localidadSeleccionado['IDENTIFICADOR']) ,
            des_localidad:localidadSeleccionado['DESCRIPCION'],
            colonia:coloniaSeleccionada['IDENTIFICADOR'],
            des_colonia:coloniaSeleccionada['DESCRIPCION'],
            correo:formDataRegistro.correo
     
    }


    axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/registro', objetoenvio)
    .then(response => { 
      if(response.data['ComprobanteValido']){
         envioregistroVUM(response.data['Datos Contribuyente']['INTERLOCUTOR'],response.data['NumeroTramite']);

      }else{
        openModal(
          "Información sobre el registro",
          ' El registro no se pudo completar por que se encuentra en revisión en el sistema SAP, favor de ir a verificar en las oficinas correspondientes. '
        )
      }

       


    })
    .catch(error => {
      // Manejar errores de la petición
      console.error('Error en la petición:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
    });




    /*
    console.log(objetoenvio);  
    let formDatainicial = { 
      persona_tipo: "F",
      rfc: formDataRegistro.rfc || "", 
      curp: formDataRegistro.curp || "",
       nombre: formDataRegistro.nombre || "",
      primer_apellido: formDataRegistro.primer_apellido || "",
      segundo_apellido: formDataRegistro.segundo_apellido || "",
      correo_electronico: formDataRegistro.correo || "",
      telefono_celular: formDataRegistro.telefono_celular || "",
      telefono_residencial: formDataRegistro.telefono_residencial || "",
      razon_social: "",
      activo:true,
      usuario_modifica:"",
      validado_correo:true,
      validado_telefono:true,
      validado_llave:true,
      validado_vum:true,
      validado_sap:true,
      observaciones:"",
      id_tramite:"0000554441",
      comprobante_registro_sap: "" 
    };

    console.log(formDatainicial); 

    */


 
  };


  const envioregistroVUM = async (interlocutor_comercial,numero_tramite) => {
    let formDatainicial = { 
      persona_tipo: "F",
      interlocutor_comercial: interlocutor_comercial , 
      numero_tramite:numero_tramite, 
      rfc: formDataRegistro.rfc || "", 
      curp: formDataRegistro.curp || "",
      nombre: formDataRegistro.nombre || "",
      primer_apellido: formDataRegistro.primer_apellido || "",
      segundo_apellido: formDataRegistro.segundo_apellido || "",
      correo_electronico: formDataRegistro.correo || "",
      telefono_celular: formDataRegistro.telefono_celular || "",
      telefono_residencial: formDataRegistro.telefono_residencial || "",
      razon_social: "",
      activo:true,
      usuario_modifica:"",
      validado_correo:true,
      validado_telefono:true,
      validado_llave:true,
      validado_vum:true,
      validado_sap:true,
      observaciones:"", 
    };

    axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/contribuyente/registro', formDatainicial)
    .then(response => { 
       if(response.data['Registro de contribuyente'] == 'EXITOSO'){
        setNotificacion({ tipo: 'sucess', mensaje: 'Reedirigiendo a terminos y condiciones de uso.' });
        setTimeout(() => {
          router.push("/terminos");
        }, 3000);
      }


      if(response.data['Registro de contribuyente'] == 'ESTE REGISTRO YA EXISTE'){
        setNotificacion({ tipo: 'sucess', mensaje: 'Reedirigiendo a terminos y condiciones de uso.' });
        setTimeout(() => {
          router.push("/terminos");
        }, 3000);
      }

    })
    .catch(error => {
      // Manejar errores de la petición
      console.error('Error en la petición:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
    });

  };



   
  const handleSaveOption = async () => {
    envioregistroSAP()
  };


   
  const obtenerLocalidad = async () => {
 
          //Municipios 

          axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/localidades' , { 
            municipio: municipioSeleccionado['IDENTIFICADOR']
        })
          .then(response => {    
            console.log(response.data);
            })
          .catch(error => {
            console.error('Error en la petición:', error);
          });


  };


  const registrarUsuarioSAP = async () => {
    let formDatainicial = {
      part_key: formDataRegistro.rfc,
    };

    formDatainicial = {
      ...formDatainicial,
      tipo_persona: "F",
      rfc: formDataRegistro.rfc || "", 
      correo_electronico: formDataRegistro.correo || "",
      confirmacion_correo: formDataRegistro.confirmacion_correo || "",
      telefono_celular: formDataRegistro.telefono_celular || "",
      telefono_residencial: formDataRegistro.telefono_residencial || "",
      curp: formDataRegistro.curp || "",
      nombre: formDataRegistro.nombre || "",
      primer_apellido: formDataRegistro.primer_apellido || "",
      segundo_apellido: formDataRegistro.segundo_apellido || "",
    };

 

    axios.post('https://hsl0nk3vi3.execute-api.us-east-1.amazonaws.com/dev/contribuyente/registro', formDatainicial)
      .then(response => {
         
         if(response.data.statusCode == 400){
             setNotificacion({ tipo: 'warning', mensaje: 'Codigo no valido' });

         }

         if(response.data.statusCode == 200){ 
          guardadoDocumentosSAP()
          }

      })
      .catch(error => {
        // Manejar errores de la petición
        console.error('Error en la petición:', error);
        // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
      });
  };

  const guardadoDocumentosSAP = async () => {

    const filteredFormData = Object.keys(formDataDocumentacion)
      .filter((key) => Object.keys(TIPOS_DOCUMENTO).includes(key))
      .reduce((obj, key) => {
        obj[key] = formDataDocumentacion[key];
        return obj;
      }, {});
    
    // Crear el array de promesas para convertir a Base64
    const base64Promises = Object.keys(filteredFormData).map(async (key) => {
      if (key !== 'contrasenia_clave_privada') {
        const base64 = await convertToBase64(filteredFormData[key]);
        return { [key]: base64 };
      }
      return { [key]: filteredFormData[key] };
    });
    
    // Obtener el objeto resultante
    const base64Documents = await Promise.all(base64Promises);
   // const endpoint = 'https://ln99cesr06.execute-api.us-east-1.amazonaws.com/default/documentos/crear';
    const rfc = formDataRegistro.rfc; // Sustituye con tu RFC
    const observaciones = ""; // Sustituye con tu RFC

    const requestData = {
      rfc,
      observaciones
     };
    
    // Iterar sobre cada documento en base64
    for (const document of base64Documents) {
      const tipoDocumento = TIPOS_DOCUMENTO[Object.keys(document)[0]]; // Obtener el tipo de documento del documento actual
      requestData.tipo_documento = tipoDocumento;
      requestData.docto64 = document[Object.keys(document)[0]]; // Obtener el contenido en base64 del documento actual
     
      try {
       let body = {
         body: requestData
       }
        const response = await axios.post(
         // endpoint
         END_POINT_BACK + "/documentos/crear" 
          , body);
        console.log(response.status); // Debería imprimir 200 si la operación fue exitosa
      } catch (error) {
        console.error(error.response.status); // Imprime el código de estado del error
        // Si deseas manejar el error de alguna manera, puedes hacerlo aquí
      }

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

  const handleOptionChangeDomicilio = (selectedOption, fieldName) => {
    setFormDataDomicilio({
      ...formDataDomicilio,
      [fieldName]: selectedOption,  // Asegúrate de que aquí estés pasando el objeto completo
    });

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
      <div style={contentContainerStyle}>

      <div className="bg-white min-h-screen">
        <div className="container">
       
          <div className="card margin-top-3 card-registro" >
           
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
                                Comprobante de domicilio (vigencia no mayor a 90 días) (.pdf) (*){" "}
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
                                    "Comprobante de domicilio",
                                    '<label className="label-form">Comprobante de domicilio (vigencia no mayor a 90 días).<br /> </label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                onChange={(file) =>
                                  handleFileChange(
                                    file,
                                    "comprobante_domicilio"
                                  )
                                }
                                value={
                                  formDataDocumentacion.comprobante_domicilio
                                }
                              />
                            </div>
                          </div>
                        </div>



                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                                Identificación del Contribuyente (.pdf) (*){" "}
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
                                    "IDENTIFICACIÓN DEL CONTRIBUYENTE",
                                    '<label className="label-form">INE, LICENCIA DE CONDUCIR, PASAPORTE, VISA O CARTILLA.<br /> </label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                onChange={(file) =>
                                  handleFileChange(
                                    file,
                                    "identificacion_contribuyente"
                                  )
                                }
                                value={
                                  formDataDocumentacion.identificacion_contribuyente
                                }
                              />
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-12">
                            <div className="col-12">
                              <label className="label-form">
                              CURP (.pdf) (*){" "}
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
                                    "CURP",
                                    '<label className="label-form">CURP.<br /> </label>'
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <FileInput
                                onChange={(file) =>
                                  handleFileChange(
                                    file,
                                    "comprobante_curp"
                                  )
                                }
                                value={
                                  formDataDocumentacion.comprobante_curp
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
                                  formDataDocumentacion.contrasenia_clave_privada
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
                          {/*
                        <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <label className="label-form">
                              Constancia de Situación Fiscal (.pdf) (*){" "}
                            </label>
                          </div>
                          <div className="col-12">
                            <FileInput onChange={handleFileChange} />
                          </div>
                        </div>
                      </div>
                      */}

                          <div className="row">
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">CURP (*)</label>
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
 
                               

                              <ReadOnlyInput
                                    id="curpInput"
                                    value={formDataRegistro.curp}   
                                  />
                                {
                                  /*
                                  <Input
                                    id="curpInput"
                                    value={formDataRegistro.curp}
                                    onChange={(value) =>
                                      handleInputChangeRegistro("curp", value)
                                    }
                                    error={
                                      errorMessagesRegistro.curp
                                        ? "Por favor, ingrese un CURP válido."
                                        : ""
                                    }
                                  />
                                  */
                                }
                              </div>
                            </div>
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

                                {
 /*
                                <Input
                                  id="rfcInput"
                                  value={formDataRegistro.rfc}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("rfc", value)
                                  }
                                  error={
                                    errorMessagesRegistro.rfc
                                      ? "Por favor, ingrese un RFC válido."
                                      : ""
                                  }
                                />

                                */

                                }

                                

                                  <ReadOnlyInput
                                    id="rfcInput"
                                    value={formDataRegistro.rfc}   
                                  />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">Nombre (*)</label>
                              </div>
                              <div className="col-12">

                                {
                                  /*
<Input
                                  id="nombreInput"
                                  value={formDataRegistro.nombre}
                                  onChange={(value) =>
                                    handleInputChangeRegistro("nombre", value)
                                  }
                                  error={
                                    errorMessagesRegistro.nombre
                                      ? "Por favor, ingrese un Nombre válido."
                                      : ""
                                  }
                                />
                                  */
                                }
                                 

                                  <ReadOnlyInput
                                    id="rfcInput"
                                    value={formDataRegistro.nombre}   
                                  />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">
                                  Primer Apellido (*)
                                </label>
                              </div>
                              <div className="col-12">
                                {
                                  /*
<Input
                                  id="primer_apellidoInput"
                                  value={formDataRegistro.primer_apellido}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "primer_apellido",
                                      value
                                    )
                                  }
                                  error={
                                    errorMessagesRegistro.primer_apellido
                                      ? "Por favor, ingrese un Primer Apellido válido."
                                      : ""
                                  }
                                />
                                  */
                                }
                                 

                                  <ReadOnlyInput
                                    id="rfcInput"
                                    value={formDataRegistro.nombre}   
                                  />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                              <div className="col-12">
                                <label className="label-form">
                                  Segundo Apellido
                                </label>
                              </div>
                              <div className="col-12">

                                {
                                  /*
                                  <Input
                                  id="segundo_apellidoInput"
                                  value={formDataRegistro.segundo_apellido}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "segundo_apellido",
                                      value
                                    )
                                  }
                                  error={
                                    errorMessagesRegistro.segundo_apellido
                                      ? "Por favor, ingrese un Segundo Apellido válido."
                                      : ""
                                  }
                                />
                                  */
                                }
                                 

                                  <ReadOnlyInput
                                    id="rfcInput"
                                    value={formDataRegistro.segundo_apellido}   
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
                                    errorMessagesRegistro.correo
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
                                    errorMessagesRegistro.confirmacion_correo
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
                                    errorMessagesRegistro.telefono_celular
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                  showCharCount={true}
                                    charLimit={10}
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
                                    errorMessagesRegistro.telefono_residencial
                                      ? "Por favor, ingrese un Teléfono válido."
                                      : ""
                                  }
                                  showCharCount={true}
                                    charLimit={10}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Contraseña (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Contraseña ",
                                      '<label className="label-form">Crea tu contraseña. Debe contener al menos una mayúscula, una minúscula y un carácter especial.<br />Ejemplo: MiContrasena_123<br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="clave_accesoInput"
                                  type="password"
                                  iconClass="icon-container-registro"
                                  value={formDataRegistro.clave_acceso}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "clave_acceso",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.clave_acceso
                                      ? "Por favor, ingrese una contraseña válida."
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                              <div className="col-12">
                                <label className="label-form">
                                  Contraseña Repetida (*)
                                </label>
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    openModal(
                                      "Contraseña Repetida",
                                      '<label className="label-form">    Repite tu contraseña para confirmar                            <br /></label>'
                                    )
                                  }
                                />
                              </div>
                              <div className="col-12">
                                <Input
                                  id="clave_acceso_repetidaInput"
                                  type="password"
                                  iconClass="icon-container-registro"
                                  value={formDataRegistro.clave_acceso_repetida}
                                  onChange={(value) =>
                                    handleInputChangeRegistro(
                                      "clave_acceso_repetida",
                                      value
                                    )
                                  }
                                  error={
                                    errorsRegistro.clave_acceso_repetida
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
                                {errorMessagesRegistro.clave_acceso && (
                                  <p className="error-message">
                                    {errorMessagesRegistro.clave_acceso}
                                  </p>
                                )}
                                {errorMessagesRegistro.clave_acceso_repetida && (
                                  <p className="error-message">
                                    {
                                      errorMessagesRegistro.clave_acceso_repetida
                                    }
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
                                    showCharCount={true}
                                    charLimit={6}
                                  />
                                </div>
                                <div className="col-12">

                                {showCP ? (
                                    <Input
                                    id="codigo_postalInput"
                                    value={formDataDomicilio.codigo_postal}
                                    onChange={(value) =>
                                      handleInputChangeDomicilio(
                                        "codigo_postal",
                                        value
                                      )
                                    }
                                    onBlur={() => buscarDireccion()}
                                    error={
                                      errorMessagesDomicilio.codigo_postal
                                        ? "Por favor, ingrese un código postal válido."
                                        : ""
                                    }
                                  />
                                  ) : (
                                    <ReadOnlyInput
                                      id="codigo_postalInput"
                                      value={formDataDomicilio.codigo_postal}
                                    />
                                  )}


                                 
                                   
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

                                { /* 
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
                                */}

                                {
                                  /*
                                    <Select
                                          id="municipioInput" 
                                          value={formDataDomicilio.estado}
                                          onChange={(value) => handleOptionChangeDomicilio(value, 'estado')}

                                           options={opcionesEstados}
                                          className="select-registro"
                                        />
                                  */
                                }

                                 


                                {showEstadoEditar ? (
                                    <Input
                                      id="estadoInput"
                                      value={formDataDomicilio.estado}
                                      onChange={(value) => handleInputChangeDomicilio("estado", value)}
                                      error={
                                        errorMessagesDomicilio.estado
                                          ? "Por favor, ingrese un municipio válido."
                                          : ""
                                      }
                                    />
                                  ) : (
                                    <ReadOnlyInput
                                      id="estadoInput"
                                      value={formDataDomicilio.estado}
                                    />
                                  )}

                                  
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
 

                                {showMunicipioEditar ? (
                                    <Input
                                      id="municipioInput"
                                      value={formDataDomicilio.municipio}
                                      onChange={(value) => handleInputChangeDomicilio("municipio", value)}
                                      error={
                                        errorMessagesDomicilio.municipio
                                          ? "Por favor, ingrese un municipio válido."
                                          : ""
                                      }
                                    />
                                  ) : (
                                    <ReadOnlyInput
                                      id="municipioInput"
                                      value={formDataDomicilio.municipio}
                                    />
                                  )}

                                  {
                                    /*
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
                                      errorMessagesDomicilio.municipio
                                        ? "Por favor, ingrese un municipio válido."
                                        : ""
                                    }
                                  />
                                    */
                                  }
 
                                   
                                  
 


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
                                  {
                                    /*
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
                                      errorMessagesDomicilio.localidad
                                        ? "Por favor, ingrese una localidad válida."
                                        : ""
                                    }
                                  />
                                    */
                                  }
                                   



                                  {showLocalidadEditar ? (
                                    <Input
                                      id="localidadInput"
                                      value={formDataDomicilio.localidad}
                                      onChange={(value) => handleInputChangeDomicilio("localidad", value)}
                                      error={
                                        errorMessagesDomicilio.localidad
                                          ? "Por favor, ingrese una localidad válida."
                                          : ""
                                      }
                                    />
                                  ) : (
                                    <ReadOnlyInput
                                      id="localidadInput"
                                      value={formDataDomicilio.localidad}
                                    />
                                  )}
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
                                   

                                  {
                                    /*
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
                                      errorMessagesDomicilio.colonia
                                        ? "Por favor, ingrese una colonia válida."
                                        : ""
                                    }
                                  />
                                    */
                                  }

                                {showColoniaEditar ? (
                                

                                 <Select
                                          id="coloniaInput" 
                                          value={opcionesColonias.find(option => option.label === formDataDomicilio.colonia)}
                                          onChange={(value) => handleOptionChangeDomicilio(value, 'colonia')}

                                           options={opcionesColonias}
                                          className="select-registro"
                                        />
                                     
                                    
                                  ) : (
                                    <ReadOnlyInput
                                      id="coloniaInput"
                                      value={formDataDomicilio.colonia}
                                    />
                                  )}
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
                                      errorMessagesDomicilio.calle
                                        ? "Por favor, ingrese una calle válida."
                                        : ""
                                    }
                                    showCharCount={true}
                                    charLimit={50}
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
                                      errorMessagesDomicilio.numero_exterior
                                        ? "Por favor, ingrese un número exterior válido."
                                        : ""
                                    }
                                    showCharCount={true}
                                    charLimit={6}
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
                                      errorMessagesDomicilio.numero_interior
                                        ? "Por favor, ingrese un número interior válido."
                                        : ""
                                    }
                                    showCharCount={true}
                                    charLimit={6}
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
                                      errorMessagesDomicilio.entre_calle
                                        ? "Por favor, ingrese una entre calle válida."
                                        : ""
                                    }
                                    showCharCount={true}
                                    charLimit={50}
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
                                      errorMessagesDomicilio.referencia
                                        ? "Por favor, ingrese una referencia válida."
                                        : ""
                                    }
                                    showCharCount={true}
                                    charLimit={60}
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
                    position: "relative",  
                  }}
                >
                  {isLoading && (
                    <div className="dottedloader dottedloader--re" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                      <div className="dottedloader_dot" style={dotStyle}></div>
                      <div className="dottedloader_dot" style={dotStyle}></div>
                      <div className="dottedloader_dot" style={dotStyle}></div>
                    </div>
                  )}

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

                          {/* 
                          {index > 0 && (
                        <input
                          type="button"
                          name="previous-step"
                          className="cta cta--purple"
                          value="Anterior"
                          onClick={handlePrevStep}
                        />
                      )}
                          */}
                      {index > 0 && (
                        <input
                          type="button"
                          name="previous-step"
                          className="cta cta--purple"
                          value="Anterior"
                          onClick={handlePrevStep}
                        />
                      )}
                       
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
                           // className={`cta ${!(requiredFilesLoaded && contribuyentenuevo) ? "cta--disable" : "cta--guinda"}`}
                           className={`cta ${!(requiredFilesLoaded) ? "cta--disable" : "cta--guinda"}`}

                            value={isLoading ? "Cargando..." : "Siguiente"}
                            onClick={handleNextStep}
                           // disabled={(!requiredFilesLoaded && contribuyentenuevo)}
                           disabled={(!requiredFilesLoaded)}
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
                            value={isLoading ? "Cargando..." : "Siguiente"}
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


      <ModalSelection
              options={opcionesOficinas}
              onSelect={handleSelectOption}
              show={showModalOficinas}
              onHide={closeModalOficinas}
              title="Selecciona una oficina"
               closeButtonLabel="Cerrar"
              saveButtonLabel="Seleccionar"
              showSaveButton={true} 
              modalWidth= "70% "
              onSave={handleSaveOption}
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

    </div>
  );
};

export default RegistroPersonaFisica;
