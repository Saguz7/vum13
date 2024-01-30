import React from 'react';
import Select from 'react-select';

function CustomSelect({ id, value, onChange, options, additionalClass, error }) {
  const containerClasses = `select-input ${additionalClass ? ` ${additionalClass}` : ''}${error ? ' error' : ''}`;

  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: '#f0f2f5',
      color: '#65676b !important',
      borderRadius: '40px',
      padding: '0 15px',
      marginTop: '10px',
      height: '45px',
      fontSize: '14px',
      width: '100%', 
      padding: '0 !impontant'
    }),
    // Agrega estilos adicionales según sea necesario
  };

  return (
    <div className={containerClasses}>
      <Select
        id={id}
        value={value}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        options={options}  
        isSearchable
        placeholder="No seleccionado"
        styles={customStyles}
      />
    </div>
  );
}

export default CustomSelect;