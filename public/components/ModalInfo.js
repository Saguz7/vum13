 
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalInfo = (props) => {
  const { show, onHide, title, content, closeButtonLabel, saveButtonLabel, showSaveButton } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButtonLabel}
        </Button>
        {showSaveButton && (
          <Button variant="primary" onClick={onHide}>
            {saveButtonLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;