import React, { useState } from 'react';
import Button from './Button';
import ModalInfo from '@public/components/ModalInfo'; // Ajusta la ruta según la ubicación de tu componente ModalInfo

function Table({ columns, data }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openPdfModal = (cell) => {

    console.log(cell);


    /*
    
    setModalContent(`<iframe src="data:application/pdf;base64,${cell.base64Content}" width="100%" height="400px"></iframe>`);
    setShowModal(true);

    */
  };

  const closeModal = () => {
    setModalContent('');
    setShowModal(false);
  };

  return (
    <div className="table-responsive table-container">
      <table className="table table-striped table-hover">
      <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                style={{ width: column.style }}
                className={column.hideOnSmall ? 'd-none d-sm-table-cell' : ''}
              >
                <label className="label-form"> {column.contenido} </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ textAlign: cell.align || 'left', verticalAlign: 'middle' }}>
                {cell.tipo === 'texto' ? (
                    <label className="label-tabla" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>{cell.contenido}</label>
                    ) : cell.tipo === 'boton' ? (
                    <Button
                      text={cell.contenido}
                      customStyle={{ width: '80px' }}
                      className="cta cta--guinda guinda"
                      onClick={() => openPdfModal(cell.contenido)}
                    />
                  ) : cell.tipo === 'pdf' ? (
                    <Button
                      text="PDF"
                      customStyle={{ width: '80px' }}
                      className="cta cta--guinda guinda"
                      onClick={() => openPdfModal(cell)}
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para mostrar el PDF */}
      <ModalInfo
        show={showModal}
        onHide={closeModal}
        title="Visor de PDF"
        content={modalContent}
        closeButtonLabel="Cerrar"
        saveButtonLabel="Guardar cambios"
        showSaveButton={false} 
        modalWidth="800 px"
      />
    </div>
  );
}

export default Table;