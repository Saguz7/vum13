import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Input from "@public/components/Input";


const ModalSelection = (props) => {
  const { options, onSelect, onSave,show, onHide, title, closeButtonLabel, saveButtonLabel, showSaveButton, modalWidth } = props;
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const handleSaveButtonClick = () => {
    if (onSave) {
      onSave(selectedOption);
    }
    onHide(); // O puedes omitir este onHide() si deseas que el modal no se cierre automáticamente al seleccionar
  };

  const filteredOptions = Array.isArray(options) ? options.filter((option) =>
  option.DESCRIPCION.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="search-container">
          <Input
           className="form-input-search"
           type="text"
                                            
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="modal-options-container">
        <div
                          className="container menu-icon menu-oficinas"
                          style={{
                            
                            overflowY: "scroll", 
                            maxHeight: "400px" ,
                          }}
                        >
          {filteredOptions.map((option) => (
            <div
              key={option.IDENTIFICADOR}
              className={`modal-option-card ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
                 <label className='label-form'>{option.DESCRIPCION}</label>
             </div>
          ))}
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButtonLabel}
        </Button>
        {showSaveButton && selectedOption && (
          <Button variant="primary" onClick={handleSaveButtonClick}>
            {saveButtonLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSelection;