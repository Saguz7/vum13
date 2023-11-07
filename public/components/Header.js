import React from 'react';
import Button from './Button'; 
import Link from 'next/link';

function Header() {
  return (
    
    <header style={headerStyle} className="border-bottom--rosa">
      <link
          href="https://ui.michoacan.gob.mx/static/css/main.edcd66f5.css"
          rel="stylesheet"
        />
      <div style={leftSectionStyle}>
        {/* Logo */}
        <img src="https://ui.michoacan.gob.mx/static/media/LogoGobMich-Artboard1.21e8f905786dd1536f8c.png" alt="Logo"   style={logoStyle} />
      </div>
      <div style={centerSectionStyle}></div>
      <div style={rightSectionStyle}>
         <ul className="navbar-nav d-flex align-items-center">
          <li className="itemNav-header text"><a className="nav-link" href="buzon">Buzón Tributario</a></li>
          <li className="itemNav-header text"><a className="nav-link" href="tramites">Trámites</a></li> 
          <li className="itemNav-header text"><a className="nav-link" href="registro">Registro</a></li> 
          <li className="itemNav-header text"><a className="nav-link" href="login">Login</a></li> 

        </ul> 
      </div> 

 
 
    </header>
  );
}


const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  background: 'white',
  color: '#fff',
  position: 'relative',
};

const lineStyle = {
  width: '100%',  
};
const leftSectionStyle = {
  flex: '0 0 25%', // 25% del ancho
};

const logoStyle = {
  //height: '85px',
  padding: '10px',
  width: '150px'

}; 
const centerSectionStyle = {
  flex: '0 0 20%', // 50% del ancho
};

const rightSectionStyle = {
  flex: '0 0 35%', // 25% del ancho
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  flex: '0 0 30%', // 30% del ancho de la sección derecha
  padding: '8px',
  background: 'white', // Color de fondo del botón
  color: 'white', // Color de texto del botón
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Centrar verticalmente
};

export default Header;