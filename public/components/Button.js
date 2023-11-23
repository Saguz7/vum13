import React from 'react';

function Button({ text, customStyle, onClick, disabled, className }) {
  const buttonStyle = {
    height: '45px',
    borderRadius: '10px', 
    ...customStyle, // Fusiona el estilo personalizado con el estilo predeterminado
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled} className={className}>
      {text}
    </button>
  );
}

export default Button;