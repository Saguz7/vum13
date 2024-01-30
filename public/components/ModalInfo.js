import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalInfo = (props) => {
  const { show, onHide, title, content, closeButtonLabel, saveButtonLabel, showSaveButton, modalWidth } = props;

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div dangerouslySetInnerHTML={{ __html: content }} />

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