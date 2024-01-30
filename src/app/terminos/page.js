"use client"; // This is a client component 👈🏽

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@public/components/Header";
import Button from "@public/components/Button";
import Input from "@public/components/Input";

import styles from "./style.css";
import { useRouter } from "next/navigation";
import Sidebar from "@public/components/Sidebar";
import { useDarkMode } from "src/app/DarkModeContext";
import { useUser } from "src/app/UserContext";
import getConfig from '@raiz/config';

function Llave() {
  const router = useRouter();

  const cardGeneralRef = useRef(null);

  const [showButton, setShowButton] = useState(false);
  const [scrollClass, setScrollClass] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [isScrollActivated, setIsScrollActivated] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);


  const { userData } = useUser();


  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden", // Deshabilita el scroll
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  const handleButtonClick = () => {
    const informacionGuardada = JSON.parse(
      localStorage.getItem("informacionContribuyente")
    );

    router.push("/finalizar");
    
    // Lógica para manejar el clic del botón
   // router.push("/buzon");
  };

  const handleDivScroll = () => {
    const target = cardGeneralRef.current;
    if (target) {
      const isAtBottom =
        target.scrollHeight - target.scrollTop < target.clientHeight + 10;
      if (!isScrolledToBottom) {
        setIsScrolledToBottom(isAtBottom);
        setScrollClass(isAtBottom ? "scrolled" : "");

        // Activar el scroll por primera vez
        if (!isScrollActivated) {
          setIsScrollActivated(true);
        }
      }
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowButton(scrollY > 0);
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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
                <div className="row width-form-content">
                  <div className="row">
                    <div className="col-12">
                      <div className="col-12">
                        <label className="text-medium text-light-blue marginBottomText">
                          Por favor, lea y acepte nuestros términos y
                          condiciones antes de continuar.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={cardGeneralRef}
                    className={`card card-general width-terms guinda margin-top-3`}
                    onScroll={handleDivScroll}
                  >
                    <h2 style={{ textAlign: "center", marginTop: "10%", color: "white" }}>
                      AVISO INTEGRAL DE PRIVACIDAD DE LA SECRETARÍA DE FINANZAS
                      Y ADMINISTRACIÓN
                    </h2>
                    <p className="justify-text label-form padding-10">
                      <br />
                      I. Fundamento Legal:
                      <br /> <br />
                      Los datos personales recabados, serán protegidos,
                      incorporados y tratados en el banco de datos de los
                      programas de la Secretaría de Finanzas y Administración,
                      de conformidad con lo dispuesto en los artículos 3°,
                      fracciones I, II,VII, VIII, IX, X, XIX,XX, XXI, XXII,
                      XXIII, 6°, 7°, 22,23,24,25 y 26 de la Ley de Protección de
                      Datos Personales en Posesión de Sujetos Obligados del
                      Estado de Michoacán de Ocampo y 33 de la Ley de
                      Transparencia, Acceso a la Información Pública y
                      Protección de Datos Personales del Estado de Michoacán de
                      Ocampo, su finalidad es contar con la información
                      necesaria que permita brindarle el servicio y/o la toma de
                      decisión para el otorgamiento y autorización en los
                      trámites solicitados, por lo que únicamente serán
                      utilizados para ese efecto y para fines estadísticos.
                      Estos datos tienen el carácter de obligatorio y en caso de
                      no proporcionarlos no podrá otorgarse la autorización del
                      (los) tramite(s) solicitado(s). Los datos recabados sólo
                      podrán ser transmitidos a las unidades administrativas
                      responsables de la Secretaría de Finanzas y Administración
                      en la aplicación de sus atribuciones o por mandato de
                      autoridad competente. La unidad administrativa responsable
                      del banco de datos será la que directamente obtenga sus
                      datos personales en los respectivos formatos, en ellos
                      precisará el área y el responsable de la protección y
                      resguardo de los mismos, especificando su domicilio y ante
                      quien podrá ejercer su derecho de acceso, rectificación,
                      cancelación y oposición de sus datos personales.
                      <br /> <br />
                      II. Responsable de la protección de sus datos personales
                      <br /> <br />
                      Las áreas responsables de las unidades administrativas de
                      la Secretaría de Finanzas y Administración, a quienes les
                      sea turnada solicitud de información y/o protección de
                      datos personales, son responsables del tratamiento y
                      protección de su información confidencial. Lo anterior
                      conforme a lo establecido en la fracción I, del artículo
                      3° de la Ley de Transparencia, Acceso a la Información
                      Pública y Protección de Datos Personales del Estado de
                      Michoacán. En el caso particular, la Dirección General de
                      Gobierno Digital y/o Dirección de Recaudación, adscritas a
                      la Secretaría de Finanzas y Administración serán las
                      responsables del tratamiento que se le dé a la información
                      recabada para el procesamiento de trámites digitales que
                      oferta la Secretaría de Finanzas y Administración.
                      <br /> <br />
                      III. ¿Para qué fines recabamos y utilizamos sus datos
                      personales?
                      <br />
                      La finalidad para el tratamiento de sus datos personales
                      es: Para la atención de trámites y/o servicios solicitados
                      por el titular de los datos personales o su representante
                      legal y en su caso, llevar un registro estadístico de los
                      trámites brindados. Mismos que, de manera enunciativa, se
                      describe a continuación:
                      <br />
                      <br />
                      a) Refrendo Digital
                      <br />
                      <br />
                      IV. ¿Qué datos personales y/o sensibles obtenemos?
                      <br /> <br />
                      Dependiendo del procedimiento o actividad a realizar,
                      requerimos de los siguientes datos personales:
                      <br />
                      a. De identificación: Nombre (s), Apellidos, domicilio,
                      teléfono particular y/o celular, edad, fotografía, sexo,
                      lugar y fecha de nacimiento, nacionalidad, firma, correo
                      electrónico, Identificación para votar con fotografía
                      expedida por el Instituto Nacional Electoral (INE), Clave
                      Única de Registro de Población (CURP), Clave de Registro
                      Federal de Contribuyentes (RFC) y cartilla militar. b.
                      Sensibles: datos biométricos. c. Datos de contacto: correo
                      electrónico y/o domicilio ambos para oír y recibir
                      notificaciones.
                      <br /> <br />
                      V. Mecanismos de seguridad
                      <br />
                      <br />
                      La Secretaría de Finanzas y Administración emplea
                      procedimientos físicos, electrónicos y administrativos
                      para prevenir el acceso no autorizado, mantener la
                      exactitud de los datos, y garantizar el uso correcto de su
                      información personal. Del mismo modo, se hace de su
                      conocimiento que, con fecha 11 de mayo de 2023 el
                      Instituto Michoacano de Acceso a la Información Pública,
                      notificó a esta Dependencia el acuerdo
                      UNANIMIDAD/PLENO/ACTA-09-ORD-ACUERDO-08/10-05-23, por
                      medio del cual se dictaminó la Evaluación de Impacto en la
                      Protección de Datos Personales, respecto del carácter
                      intensivo o relevante en el tratamiento de datos
                      personales de la plataforma “Refrendo Digital”, a través
                      del cual se determina que la Secretaría de Finanzas y
                      Administración del Gobierno del Estado cumplió con lo
                      dispuesto en el artículo 71 de la Ley de Protección de
                      Datos Personales en Posesión de Sujetos Obligados del
                      Estado de Michoacán de Ocampo; así como a lo dispuesto en
                      los artículos 3, 4, 6, 7, 10, 14, 15, 17, 18, 19, 20, 21 y
                      22 de las Disposiciones Administrativas de Carácter
                      General para la Elaboración, Presentación y Valoración de
                      evaluaciones de impacto en la Protección de Datos
                      Personales, emitido por el Instituto Nacional de
                      Transparencia, Acceso a la Información Pública y
                      Protección de Datos Personales, en relación a la
                      evaluación de los impactos reales respecto del tratamiento
                      de datos personales, a efecto de identificar y mitigar, en
                      su caso, probables riesgos relacionados con los
                      principales deberes y derechos de los titulares, así como
                      los deberes de los responsables y encargados de resguardar
                      la información personal que se encuentra previsto en la
                      normatividad aplicable.
                      <br />
                      <br />
                      VI. ¿Cómo Acceder, Rectificar, Cancelar u Oponerse al uso
                      y tratamiento de sus datos personales (Derechos ARCO) o
                      revocar su consentimiento para el tratamiento sus datos?
                      <br />
                      <br />
                      Usted tiene derecho de acceso, rectificación, cancelación
                      u oposición al tratamiento de sus datos personales o
                      revocar el consentimiento. Para el ejercicio de estos
                      derechos el titular de los datos personales o su
                      representante deberán presentar solicitud de ejercicio de
                      derechos ARCO, misma que podrá ser presentada en formato
                      libre siempre que reúna los siguientes requisitos:
                      <br />
                      a) Acreditar que es el titular de los datos personales
                      ante la autoridad a la que se dirige la solicitud. b)
                      Nombre, datos generales e identificación oficial del
                      solicitante, o en su defecto, poder otorgado por el
                      titular de los datos personales. c) Precisión de los datos
                      respecto de los que busca ejercer alguno de los derechos
                      ARCO (Acceso, Rectificación, Cancelación y Oposición). d)
                      Domicilio para recibir notificaciones y/o correo
                      electrónico. e) Modalidad en la que prefiere se les
                      otorgue el acceso a sus datos (verbalmente, mediante
                      consulta directa, a través de documentos como copias
                      simples, certificadas u otros). f) Algún elemento que
                      facilite la localización de la información. g) Firma del
                      solicitante.
                      <br />
                      <br />
                      VII. Domicilio Legal del Sujeto Obligado.
                      <br />
                      <br />
                      Le informamos que puede presentar su solicitud de
                      protección de datos personales vía electrónica al correo
                      transparenciasfa@michoacan.gob.mx o bien puede acudir
                      directamente a las oficinas de la Unidad de Transparencia
                      de la Secretaría de Finanzas y Administración, ubicada en
                      Calzada Ventura Puente 112, colonia Chapultepec Norte. C.
                      p. 58260; Morelia, Michoacán, o a las oficinas de cada
                      unidad administrativa responsable, en un horario de lunes
                      a viernes de 9:00 a 15:00 horas.
                      <br />
                      <br />
                      VIII. Transferencia de datos personales
                      <br />
                      <br />
                      Le informamos que sólo excepcionalmente sus datos
                      personales serán transferidos en los siguientes casos: Los
                      datos personales contenidos en los expedientes de
                      solicitudes de información, solicitudes de protección de
                      datos personales o recursos de revisión, podrán ser
                      transferidos en los términos de la Ley de Transparencia,
                      Acceso a la Información Pública y Protección de Datos
                      Personales, al Instituto Michoacano de Transparencia,
                      Acceso a la Información Pública y Protección de Datos
                      Personales para la substanciación de los recursos de
                      revisión. Excepcionalmente y a solicitud de autoridad
                      competente también serán remitidos a esta previo
                      requerimiento fundado y motivado.
                      <br /> <br />
                      IX. Modificaciones al aviso de privacidad
                      <br />
                      <br />
                      La Secretaría de Finanzas y Administración, le notificará
                      de cualquier cambio al aviso de privacidad mediante
                      comunicados que se publicarán a través de nuestro portal
                      de transparencia: https://secfinanzas.michoacan.gob.mx/
                      <br />
                      <br />
                      X. Fecha de elaboración y Actualización
                      <br /> <br />
                      09 de septiembre de 2023.
                    </p>
                  </div>
                  <div class="text-center justify-content-center">
                    <input
                      type="checkbox"
                      id="check1"
                      onChange={handleCheckboxChange}
                    />
                    <label for="check1" class="me-2">
                      Aceptar términos y condiciones
                    </label>
                  </div>
                </div>
              </div>

              <div className="row ">
                <div className="col-12 d-flex justify-content-center align-items-center">
                  {isCheckboxChecked && isScrollActivated ? (
                    <Button
                      text="Continuar"
                      customStyle={{ width: "140px", marginTop: "10px" }}
                      className="cta cta--guinda guinda"
                      onClick={handleButtonClick}
                    />
                  ) : (
                    <Button
                      text="Continuar"
                      customStyle={{ width: "140px", marginTop: "10px" }}
                      disabled
                      className="cta cta--disabled"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Llave;


 