import React, { useState } from 'react';
import styles from './styleSidebar.css'; // Archivo de estilos
import Link from 'next/link';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const closeSidebar = () => {
    toggleSidebar();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open background-white' : ''}`} onClick={handleButtonClick}>
      <div className="button-container">
        <button className={`btn btn-primary sidebar-button ${isOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="1x" />
        </button>
      </div>
      <div>
        <div>
          <img src="https://ui.michoacan.gob.mx/static/media/LogoGobMich-Artboard1.21e8f905786dd1536f8c.png" alt="Logo" className="img-logo"  />
        </div>
        <ul className="navbar-nav-side nav-res d-flex flex-column align-items-stretch">
          <li className="itemNav-header text flex-grow-1 mb-2">
            <Link href="/buzon" className="nav-link">
              Buzón Tributario
            </Link>
          </li>
          {/* ... Resto de los elementos de la lista */}
        </ul>
      </div>
    </div>
  );
};

const logoStyle = {
  // Altura, relleno y demás estilos
};

export default Sidebar;