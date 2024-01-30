"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react'; 
import Input from "./Input"; 
import FileInput from "./FileInput"; 

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
  estado: "Michoacán",
  municipio: "Morelia",
  localidad: "Centro",
  colonia: "La Palma",
  codigo_postal: "58000",
  calle: "Avenida Benito Juárez",
  numero_exterior: "123",
  numero_interior: "2B",
  entre_calle: "Calle Hidalgo y Calle Madero",
  referencia: "Frente al parque principal",
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
      errorMessage = isValid ? "" : "El código postal debe contener 5 dígitos.";
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
  setFormData({
    ...formData,
    [fieldName]: value,
  });
 
   return errorMessage;
};

const handleFileChange = (file) => {
     if(file){
      loadPdfAndSearch(file); 
    }
  };

  const loadPdfAndSearch = async (file) => {
    try {
      const pdfFile = URL.createObjectURL(file);
      const pdf = await pdfjs.getDocument({ url: pdfFile }).promise;

      handleSearch(pdf);
    } catch (error) {
      console.error('Error al cargar el archivo PDF:', error);
    }
  };

  const handleSearch = async (pdf) => {
    try {
 
      if (!pdf) {
        console.error('No se ha seleccionado ningún archivo.');
        return;
      } 
       const numPages = pdf.numPages;
      const informacionContribuyente = {
        rfc: '',
        curp: '',
        nombre: '',
        razonSocial: '',
        primerApellido: '',
        segundoApellido: '',
        fechaInicioOperaciones: '',
        estatusEnPadron: '',
        fechaUltimoCambioEstado: '',
        nombreComercial: '',
        codigoPostal: '',
        tipoVialidad: '',
        nombreVialidad: '',
        numeroExterior: '',
        numeroInterior: '',
        nombreColonia: '',
        nombreLocalidad: '',
        nombreMunicipio: '',
        nombreEntidadFederativa: '',
        entreCalle: '',
        yCalle: '',
      };
      const results = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((s) => s.str).join('');
  
        const regexCurp = /[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}/;

        const regexCedula = /CÉDULA DE IDENTIFICACIÓN FISCAL/i;
        const curpEncontrada = text.match(regexCurp);
         const rfcPattern = /RFC:(.*?)CURP:(.*?)/; 
        const rfcPatternMoral = /RFC:(.*?)Denominación\/Razón Social:(.*?)/; 
        const rfcPatternRazonSocial = /Denominación\/Razón Social:(.*?)Régimen Capital:(.*?)/; 
 
        const curpPattern = /CURP:(.*?)Nombre \(s\):(.*?)/;
        const nombrePattern = /Nombre \(s\):(.*?)Primer Apellido:(.*?)/;
        const primerApellidoPattern = /Primer Apellido:(.*?)Segundo Apellido:(.*?)/;
        const segundoApellidoPattern = /Segundo Apellido:(.*?)Fecha inicio de operaciones:(.*?)/;
        const fechaInicioOperacionesPattern = /Fecha inicio de operaciones: (.+?)\b/;
        const estatusEnPadronPattern = /Estatus en el padrón: (.+?)\b/;
        const fechaUltimoCambioEstadoPattern = /Fecha de último cambio de estado: (.+?)\b/;
        const nombreComercialPattern = /Nombre Comercial: (.+?)\b/;
        const codigoPostalPattern = /Código Postal:(.*?)Tipo de Vialidad:(.*?)/;
        const tipoVialidadPattern = /Tipo de Vialidad:(.*?)Nombre de Vialidad:(.*?)/;
        const nombreVialidadPattern = /Nombre de Vialidad:(.*?)Número Exterior:(.*?)/;
        const numeroExteriorPattern = /Número Exterior:(.*?)Número Interior:(.*?)/;
        const numeroInteriorPattern = /Número Interior:(.*?)Nombre de la Colonia:(.*?)/;
        const nombreColoniaPattern = /Nombre de la Colonia:(.*?)Nombre de la Localidad:(.*?)/;
        const nombreLocalidadPattern = /Nombre de la Localidad:(.*?)Nombre del Municipio o Demarcación Territorial:(.*?)/;
        const nombreMunicipioPattern = /Nombre del Municipio o Demarcación Territorial:(.*?)Nombre de la Entidad Federativa:(.*?)/;
        const nombreEntidadFederativaPattern = /Nombre de la Entidad Federativa:(.*?)Entre Calle:(.*?)/;
        const entreCallePattern = /Entre Calle: (.+?)\b/;
        const yCallePattern = /Y Calle: (.+?)\b/;
        
        // Función para extraer información usando un patrón
        const extraerInformacion = (text, patron) => {
          const coincidencias = text.match(patron);
          return coincidencias ? coincidencias[1].trim() : null;
        };
        
        // Extraer la información

        let rfc;

        const personaType =  localStorage.getItem('personaType');


        if(personaType === 'fisica'){
           rfc = extraerInformacion(text, rfcPattern);

        }else{
           rfc = extraerInformacion(text, rfcPatternMoral);

        }
        const razonSocial = extraerInformacion(text, rfcPatternRazonSocial);
       
         const curp = extraerInformacion(text, curpPattern);
        const nombre = extraerInformacion(text, nombrePattern);
        
        const primerApellido = extraerInformacion(text, primerApellidoPattern);
        const segundoApellido = extraerInformacion(text, segundoApellidoPattern);
        const fechaInicioOperaciones = extraerInformacion(text, fechaInicioOperacionesPattern);
        const estatusEnPadron = extraerInformacion(text, estatusEnPadronPattern);
        const fechaUltimoCambioEstado = extraerInformacion(text, fechaUltimoCambioEstadoPattern);
        const nombreComercial = extraerInformacion(text, nombreComercialPattern);
        const codigoPostal = extraerInformacion(text, codigoPostalPattern);
        const tipoVialidad = extraerInformacion(text, tipoVialidadPattern);
        const nombreVialidad = extraerInformacion(text, nombreVialidadPattern);
        const numeroExterior = extraerInformacion(text, numeroExteriorPattern);
        const numeroInterior = extraerInformacion(text, numeroInteriorPattern);
        const nombreColonia = extraerInformacion(text, nombreColoniaPattern);
        const nombreLocalidad = extraerInformacion(text, nombreLocalidadPattern);
        const nombreMunicipio = extraerInformacion(text, nombreMunicipioPattern);
        const nombreEntidadFederativa = extraerInformacion(text, nombreEntidadFederativaPattern);
        const entreCalle = extraerInformacion(text, entreCallePattern);
        const yCalle = extraerInformacion(text, yCallePattern);


        const actualizarInformacionContribuyente = (clave, valor) => {
          if (valor !== null && valor.trim() !== '') {
            informacionContribuyente[clave] = valor.trim();
          }
        };


        actualizarInformacionContribuyente('rfc', rfc);
        actualizarInformacionContribuyente('curp', curp);
 
        if(curpEncontrada  && curpEncontrada.length>0){
           actualizarInformacionContribuyente('curp', curpEncontrada[0]);

        }
 
         
        actualizarInformacionContribuyente('nombre', nombre);
        actualizarInformacionContribuyente('razonSocial', razonSocial);

        actualizarInformacionContribuyente('primerApellido', primerApellido);
        actualizarInformacionContribuyente('segundoApellido', segundoApellido);
        actualizarInformacionContribuyente('fechaInicioOperaciones', fechaInicioOperaciones);
        actualizarInformacionContribuyente('estatusEnPadron', estatusEnPadron);
        actualizarInformacionContribuyente('fechaUltimoCambioEstado', fechaUltimoCambioEstado);
        actualizarInformacionContribuyente('nombreComercial', nombreComercial);
        actualizarInformacionContribuyente('codigoPostal', codigoPostal);
        actualizarInformacionContribuyente('tipoVialidad', tipoVialidad);
        actualizarInformacionContribuyente('nombreVialidad', nombreVialidad);
        actualizarInformacionContribuyente('numeroExterior', numeroExterior);
        actualizarInformacionContribuyente('numeroInterior', numeroInterior);
        actualizarInformacionContribuyente('nombreColonia', nombreColonia);
        actualizarInformacionContribuyente('nombreLocalidad', nombreLocalidad);
        actualizarInformacionContribuyente('nombreMunicipio', nombreMunicipio);
        actualizarInformacionContribuyente('nombreEntidadFederativa', nombreEntidadFederativa);
        actualizarInformacionContribuyente('entreCalle', entreCalle);
        actualizarInformacionContribuyente('yCalle', yCalle);


        actualizarFormData({
          estado: informacionContribuyente.nombreEntidadFederativa,
          municipio: informacionContribuyente.nombreMunicipio,
          localidad: informacionContribuyente.nombreLocalidad,
          colonia: informacionContribuyente.nombreColonia,
          codigo_postal: informacionContribuyente.codigoPostal,
          calle: informacionContribuyente.nombreVialidad,
          numero_exterior: informacionContribuyente.numeroExterior,
          numero_interior: informacionContribuyente.numeroInterior,
          entre_calle: informacionContribuyente.entreCalle + ' ' + informacionContribuyente.yCalle,
          referencia: '',
        })
 
 

        localStorage.setItem('informacionContribuyente', JSON.stringify(informacionContribuyente));


 
 
      }

      setSearchResults(results);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

const FormDireccion = ({ formData, errors, errorMessages }) => {
  return (
    <div className="row width-form-content">
      <div className="row margin-top-messages-error">
        <div className="col-12">
          <div className="col-12">
            <label className="label-form">Comprobante de Domicilio (*)</label>
          </div>
          <div className="col-12">
            <FileInput onChange={handleFileChange} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-3">
              <div className="col-12">
                <label className="label-form">Código Postal (*)</label>
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
              </div>
              <div className="col-12">
                <Input
                  id="estadoInput"
                  value={formData.estado}
                  onChange={(value) => handleInputChange("estado", value)}
                  error={
                    errors.estado ? "Por favor, ingrese un estado válido." : ""
                  }
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-3">
              <div className="col-12">
                <label className="label-form">Municipio (*)</label>
              </div>
              <div className="col-12">
                <Input
                  id="municipioInput"
                  value={formData.municipio}
                  onChange={(value) => handleInputChange("municipio", value)}
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
              </div>
              <div className="col-12">
                <Input
                  id="localidadInput"
                  value={formData.localidad}
                  onChange={(value) => handleInputChange("localidad", value)}
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
              </div>
              <div className="col-12">
                <Input
                  id="coloniaInput"
                  value={formData.colonia}
                  onChange={(value) => handleInputChange("colonia", value)}
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
                <label className="label-form text-guinda">Calle (*)</label>
              </div>
              <div className="col-12">
                <Input
                  id="calleInput"
                  className={"form-input--full"}
                  value={formData.calle}
                  onChange={(value) => handleInputChange("calle", value)}
                  error={
                    errors.calle ? "Por favor, ingrese una calle válida." : ""
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
                <label className="label-form text-guinda">N° Interior</label>
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
                <label className="label-form text-guinda">Entre Calle</label>
              </div>
              <div className="col-12">
                <Input
                  id="entre_calleInput"
                  value={formData.entre_calle}
                  onChange={(value) => handleInputChange("entre_calle", value)}
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
                <label className="label-form text-guinda">Referencia</label>
              </div>
              <div className="col-12">
                <Input
                  id="referenciaInput"
                  value={formData.referencia}
                  onChange={(value) => handleInputChange("referencia", value)}
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

      <div className="d-flex justify-content-center w-100 width-form margin-top-messages-error">
        <div className="row width-form-content">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 bg-armarillo text-small text-guinda">
                  {errorMessages.estado && (
                    <p className="error-message">{errorMessages.estado}</p>
                  )}
                  {errorMessages.municipio && (
                    <p className="error-message">{errorMessages.municipio}</p>
                  )}
                  {errorMessages.localidad && (
                    <p className="error-message">{errorMessages.localidad}</p>
                  )}
                  {errorMessages.colonia && (
                    <p className="error-message">{errorMessages.colonia}</p>
                  )}
                  {errorMessages.codigo_postal && (
                    <p className="error-message">
                      {errorMessages.codigo_postal}
                    </p>
                  )}
                  {errorMessages.calle && (
                    <p className="error-message">{errorMessages.calle}</p>
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
                    <p className="error-message">{errorMessages.entre_calle}</p>
                  )}
                  {errorMessages.referencia && (
                    <p className="error-message">{errorMessages.referencia}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDireccion;
