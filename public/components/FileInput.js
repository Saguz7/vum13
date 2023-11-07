
import React from 'react';

function FileInput({ onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file); // Llama a la función 'onChange' pasando el archivo seleccionado
  };

  return (
    <input type="file" accept=".pdf"  onChange={handleFileChange} />
  );
}

export default FileInput;
