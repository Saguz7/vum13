import React from 'react';

function Button({ text, customStyle, onClick, disabled, isLoading, className }) {
  const buttonStyle = {
    height: '45px',
    borderRadius: '10px', 
    ...customStyle, // Fusiona el estilo personalizado con el estilo predeterminado
  };
  const dotStyle = { backgroundColor: 'rgb(25, 70, 187)' };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled || isLoading} className={className}>
      {isLoading ? (
        <div className="dottedloader">
        <div className="dottedloader_dot"></div>
        <div className="dottedloader_dot"></div>
        <div className="dottedloader_dot"></div>
      </div>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;