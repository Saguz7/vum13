"use client"; // This is a client component 👈🏽

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Header from '@public/components/Header';
import Button from '@public/components/Button';
import Input from '@public/components/Input';

import styles from './style.css';
import { useRouter } from 'next/navigation';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden', // Deshabilita el scroll
  background: 'white',
};


function Llave() {

  const router = useRouter();


  const [showButton, setShowButton] = useState(false);
  const [scrollClass, setScrollClass] = useState('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleButtonClick = () => {
    // Lógica para manejar el clic del botón
    router.push('/llave/finalizar');

  };

  const handleDivScroll = (event) => {
    const target = event.target;
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    // Verificar si ya se cambió a true
    if (!isScrolledToBottom) {
      if (isAtBottom) {
        setIsScrolledToBottom(true);
      } else {
        setIsScrolledToBottom(false);
      }
    }

    // Cambia la clase de la tarjeta basada en la posición del scroll
    setScrollClass(isAtBottom ? 'scrolled' : '');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Cambia el valor de showButton basado en la posición del scroll
      setShowButton(scrollY > 0);
    };

    // Agrega un listener de scroll cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // La dependencia vacía garantiza que el efecto solo se ejecute una vez al montar el componente

  return (
    <div style={containerStyle}>
      <Header />

      <div className="bg-white min-h-screen">
        <div className="container center-aling">
        <div className="card card-login d-flex flex-column justify-content-center align-items-center margin-top-3">
        <div className={`card card-general guinda margin-top-3`} onScroll={handleDivScroll}> 
              <h2 style={{ textAlign: 'center', marginTop: '10%' }}>AVISO DE PRIVACIDAD</h2>
              <p><br/> 
                    I. Responsable de la protección de sus datos personales
                    Las entidades y dependencias del Poder Ejecutivo del Estado de Michoacán, a quienes les sea turnada solicitud de información y/o protección de datos personales, son responsables del tratamiento y protección de su información confidencial.Lo anterior conforme a lo establecido por la Ley de Transparencia, Acceso a la Información Pública y Protección de Datos Personales del Estado de Michoacán, en su artículo sexto transitorio.
                    <br/><br/>II. ¿Para qué fines recabamos y utilizamos sus datos personales?
                    Las finalidades del tratamiento de sus datos personales son:Estadísticos; y,Para la atención de trámites y/o servicios solicitados por el titular de los datos personales o su representante legal.
                    <br/><br/>III. ¿Qué datos personales obtenemos?
                    Para cumplir las finalidades anteriores requerimos dependiendo del procedimiento o actividad a realizar de los siguientes datos personales:
                    a. De identificación:Nombre(s), Apellidos, o Alias, Edad, Sexo, Ciudad, Estado, Firma y/o huella digital, Número de Identificación oficial (Cédula, pasaporte, Identificación para votar, entre otras), fecha de nacimiento, CURP, RFC, entre otros.b. Datos de contacto:Correo electrónico y/o Domicilio ambos para oír y recibir notificaciones.Usted tiene la facultad de determinar si los entrega o no.
                    <br/><br/>IV. Mecanismos de seguridad
                    Las entidades y dependencias del Poder Ejecutivo del Estado de Michoacán emplean procedimientos físicos, electrónicos y administrativos para prevenir el acceso no autorizado, mantener la exactitud de los datos, y garantizar el uso correcto de su información personal.
                    V. ¿Cómo Acceder, Rectificar, Cancelar u Oponerse al uso y tratamiento de sus datos personales (Derechos ARCO) o revocar su consentimiento para el tratamiento sus datos?
                </p>
            </div>

            <div className="row ">
              <div className="col-12 d-flex justify-content-center align-items-center" style={{  marginTop: '5%',marginBottom: '5%'  }}>
                {isScrolledToBottom ? (
                  <Button text="Continuar" customStyle={{ width: '140px'}} className="cta cta--guinda guinda" onClick={handleButtonClick} />
                ) : (
                  <Button text="Continuar" customStyle={{ width: '140px'}} disabled className="cta cta--disabled" />
                )}
              </div>
            </div>
          </div>

          <div>{/* ... (más contenido) */}</div>
        </div>
      </div>
    </div>
  );
}

export default Llave;

 