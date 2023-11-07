import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filters = ({ filters }) => {
    return (
    <div>
      {filters.map((filter, index) => (
        <Dropdown key={index}>
          <Dropdown.Toggle variant="primary" id={`dropdown-${index}`}>
            {filter.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {filter.options.map((option, optionIndex) => (
              <Dropdown.Item key={optionIndex}>{option}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ))}
    </div>
  );
};

export default Filters;