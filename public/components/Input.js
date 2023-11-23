import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Input({ id, value, onChange, className,additionalClass, type = 'text' }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const containerClasses = `input-container${additionalClass ? ` ${additionalClass}` : ''}`;
  const input2Classes = `form-input ${className}`;

  const handleTogglePasswordVisibility = () => {
    if (type === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div className={containerClasses}>
      <input
        id={id}
        data-testid={id}
        className={input2Classes}
        type={isPasswordVisible ? 'text' : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {type === 'password' && (
        <div className="icon-container" onClick={handleTogglePasswordVisibility}>
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </div>
      )}
    </div>
  );
}

export default Input;