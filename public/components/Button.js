import React from 'react';

function Button({ text, customStyle }) {
  const buttonStyle = {
    height: '45px',
    borderRadius: '10px',
    border: '1px solid #000',
    background: '#4A001F',
    color: '#fff', // Texto de color blanco
    cursor: 'pointer',
    ...customStyle, // Fusiona el estilo personalizado con el estilo predeterminado
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
}

export default Button;