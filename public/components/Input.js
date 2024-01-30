import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Input({ id, value, onChange, onFocus = () => {}, onBlur = () => {}, className, iconClass, additionalClass, type = 'text', error, showCharCount, charLimit }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const containerClasses = `input-container${additionalClass ? ` ${additionalClass}` : ''}${error ? ' error' : ''}`;
  const inputClasses = `form-input ${className}`;
  const iconContainerClasses = `icon-container ${iconClass}`;
  const errorMessageClasses = 'error-message';

  const handleTogglePasswordVisibility = () => {
    if (type === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleInputChange = (newValue) => {
    // Limitar el número de caracteres si se proporciona charLimit
    if (charLimit && newValue.length > charLimit) {
      newValue = newValue.slice(0, charLimit);
    }
    onChange(newValue);
  };

  return (
    <div className={containerClasses}>
      <input
        id={id}
        data-testid={id}
        className={inputClasses}
        type={isPasswordVisible ? 'text' : type}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={(e) => onFocus(e.target.value)}
        onBlur={() => onBlur(value)}

      />
      {type === 'password' && (
        <div className={iconContainerClasses} onClick={handleTogglePasswordVisibility}>
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </div>
      )}
      {showCharCount && (
        <div className="char-count" style={{ marginLeft: '5px', color: value.length > charLimit ? 'red' : 'inherit' }}>
          {value.length}/{charLimit}
        </div>
      )}
    </div>
  );
}

export default Input;