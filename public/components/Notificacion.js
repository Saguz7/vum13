import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Notificacion = ({ tipo, mensaje, onClose }) => {
    const [showNotification, setShowNotification] = useState(true);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
        onClose(); // Llama a la función onClose cuando la notificación desaparece
      }, 10000); // Reduje el tiempo de visualización a 10 segundos (10000 milisegundos)
  
      return () => clearTimeout(timeoutId);
    }, [onClose]);
  
    const renderIcon = () => {
      const iconStyles = {
        color: tipo === 'success' ? 'rgb(25, 135, 84)' : 'rgb(190, 195, 201)',
        fontSize: '24px',
        stroke: tipo === 'success' ? 'rgb(25, 135, 84)' : 'rgb(190, 195, 201)',
      };
  
      // Cambios aquí: Utiliza diferentes íconos según el tipo de notificación
      switch (tipo) {
        case 'success':
          return (
            <div className="cursor-pointer mx-3">
              <div className="d-flex align-items-center" style={iconStyles}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          );
        case 'warning':
          return (
            // Cambia este bloque con el SVG correspondiente a 'warning'
            <div className="cursor-pointer mx-3">
              <div className="d-flex align-items-center" style={{ color: 'rgb(255, 193, 7)', fontSize: '24px', stroke: 'rgb(255, 193, 7)' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"></path>
                </svg>
              </div>
            </div>
          );
          case 'error':

 
          return (
            // Cambia este bloque con el SVG correspondiente a 'warning'
            <div className="cursor-pointer mx-3">
              <div className="d-flex align-items-center" style={{ color: 'rgb(220, 53, 69)', fontSize: '24px', stroke: 'rgb(220, 53, 69)' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>  
                </svg>


 

              </div>
            </div>
          );
        default:
          return null; // Puedes manejar otros tipos de notificaciones según tus necesidades
      }
    };
  
    return (
      <div className={`notificacion notificacion--${tipo} ${showNotification ? 'notificacion-animate' : ''}`} onClick={() => setShowNotification(false)}>
        {renderIcon()}
        <div className="w-100">
          <div className="text-bold">{mensaje}</div>
        </div>
        <div className="col"></div>
        <div className="cursor-pointer ms-4 me-3" onClick={onClose}>
          <div className="d-flex align-items-center" style={{ color: 'rgb(190, 195, 201)', fontSize: '24px', stroke: 'rgb(190, 195, 201)' }}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  };

Notificacion.propTypes = {
  tipo: PropTypes.oneOf(['success', 'error', 'warning', 'option']).isRequired,
  mensaje: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notificacion;