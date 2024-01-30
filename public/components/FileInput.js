import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FileInput({ onChange, accept = '.pdf' }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    onChange(file);
    setSelectedFile(file);
  };

  return (
    <div
      className="file-input-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label className="file-input-label" style={{ cursor: 'pointer' }}>
        {selectedFile ? (
          <>
            {selectedFile.name}{' '}
            <span onClick={handleRemoveFile} className="remove-icon">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </>
        ) : (
          <>
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="file-input"
            />
            Subir archivo
          </>
        )}
      </label>
    </div>
  );
}

export default FileInput;