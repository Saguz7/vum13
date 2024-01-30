import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "@public/components/Input";

const ModalRFCValidacion = (props) => {
  const { show, onHide, handleComprobar } = props;
  const [formData, setFormData] = useState({
    rfc: "" 
  });
  // Verifica si los datos cumplen con los requisitos para habilitar el botón
 
  const handleRFCChange = (value) => {
    setFormData({ ...formData, rfc: value });
  };

 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ingrese un RFC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group">
              <label htmlFor="RFCInputValidacion" className="label-form">
                RFC
              </label>
              <Input
                id="RFCInputValidacion"
                type="text"
                value={formData.rfc}
                onChange={(value) => handleRFCChange(value)}
              />
            </div>
          </div>
         
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Salir
        </Button>
        <Button
          variant="primary"
          onClick={() => handleComprobar(formData)}
         >
          Comprobar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRFCValidacion;
