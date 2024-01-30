import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ReadOnlyInput({ id, value , className, iconClass, additionalClass  }) {
  const containerClasses = `input-container ${additionalClass ? ` ${additionalClass}` : ''}`;
  const inputClasses = `form-input form-input--disabled ${className}`;
  const iconContainerClasses = `icon-container ${iconClass}`;
  const errorMessageClasses = 'error-message';

  return (
    <div className={containerClasses}>
      <input
        id={id}
        data-testid={id}
        className={inputClasses}
        type="text"
        readOnly
        value={value}
       /> 
    </div>
  );
}

export default ReadOnlyInput;