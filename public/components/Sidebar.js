import React, { useState } from 'react';
import styles from './styleSidebar.css'; // Archivo de estilos
import Link from 'next/link';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open background-white' : ''}`} onClick={handleButtonClick}>
      <div className="button-container">
        {/* Botón movido fuera del contenedor de la barra lateral */}
        <button className={`btn btn-primary sidebar-button ${isOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="1x" />
        </button>
      </div>
      <div>
      <div > 
        <img src="https://ui.michoacan.gob.mx/static/media/LogoGobMich-Artboard1.21e8f905786dd1536f8c.png" alt="Logo"   style={logoStyle} />
      </div>
        <ul className="navbar-nav nav-res d-flex flex-column align-items-stretch">
          <li className="itemNav-header text flex-grow-1 mb-2">
            <Link href="/buzon" className="nav-link">
              Buzón Tributario
            </Link>
          </li>
          <li className="itemNav-header text flex-grow-1 mb-2">
            <Link href="/tramites" className="nav-link">
              Trámites
            </Link>
          </li>
          <li className="itemNav-header text flex-grow-1 mb-2">
            <Link href="/registro" className="nav-link">
              Registro
            </Link>
          </li>
          <li className="itemNav-header text flex-grow-1 mb-2">
            <Link href="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const logoStyle = {
  //height: '85px',
  padding: '10px',
  width: '150px',
  marginLeft: '60px',
  marginTop: '60px',
  marginBottom: '60px'

}; 

export default Sidebar;