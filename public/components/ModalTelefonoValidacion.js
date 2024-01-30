import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Input from "@public/components/Input";

const ModalTelefonoValidacion = (props) => {
  const { show, onHide , handleComprobar } = props;
  const [formData, setFormData] = useState({
    telefono: '',
    correo: '',
  });
  // Verifica si los datos cumplen con los requisitos para habilitar el botón
  const isButtonEnabled = formData.telefono?.length === 6 && formData.correo?.length === 6;
  const handleTelefonoChange = (value) => {
    setFormData({ ...formData, telefono: value });
  };

  const handleCorreoChange = (value) => {
    console.log('Value:', value);

     setFormData({ ...formData, correo: value });
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Validación de Datos de contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group">
              <label htmlFor="telefonoInputValidacion" className="label-form">
                Código Teléfono (*)
              </label>
              <Input
                id="telefonoInputValidacion"
                type="text"
                value={formData.telefono}
                onChange={(value) => handleTelefonoChange(value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12">
            <div className="form-group">
              <label htmlFor="correoInputValidacion" className="label-form">
                Código Correo electrónico (*)
              </label>
              <Input
                id="correoInputValidacion"
                type="email"
                value={formData.correo}
                onChange={(value) => handleCorreoChange(value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Salir
        </Button>
        <Button variant="primary"   onClick={() => handleComprobar(formData)}
          disabled={!isButtonEnabled}>
          Comprobar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTelefonoValidacion;