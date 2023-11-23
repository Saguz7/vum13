import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../Page'; // Ajusta la ruta

describe('Page Component', () => {
  test('renders Page component', () => {
    render(<Page />);
    // Add assertions for rendering as needed
  });
 
  test('handles persona type change and validates CURP and RFC inputs', async () => {
    render(<Page />);

    // Verifica el estado inicial de los radio buttons usando getByTestId

    fireEvent.click(screen.getByTestId('radio-fisica'));

    expect(screen.getByTestId('radio-fisica')).toBeChecked();
    expect(screen.getByTestId('radio-moral')).not.toBeChecked();
  
    // Cambia el valor de 'Persona Física'
    fireEvent.change(screen.getByTestId('radio-fisica'), { target: { value: 'fisica' } });
  
    // Verifica que el estado de los radio buttons se actualice
    await waitFor(() => {
      expect(screen.getByTestId('radio-fisica')).toBeChecked();
      expect(screen.getByTestId('radio-moral')).not.toBeChecked();
    });
  
    await waitFor(() => {
      expect(screen.getByTestId('curpInput')).toBeInTheDocument();
      expect(screen.getByTestId('rfcInput')).toBeInTheDocument();
      expect(screen.getByTestId('nombreInput')).toBeInTheDocument();
      expect(screen.getByTestId('primer_apellidoInput')).toBeInTheDocument();
      expect(screen.getByTestId('segundo_apellidoInput')).toBeInTheDocument();
      expect(screen.getByTestId('correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('confirmacion_correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('telefono_celularInput')).toBeInTheDocument();
      expect(screen.getByTestId('telefono_residencialInput')).toBeInTheDocument();
    });

    // Ahora puedes interactuar con los elementos del formulario
    const curpInput = screen.getByTestId('curpInput');
    fireEvent.change(curpInput, { target: { value: 'SAGC940106HOCNZS00' } });
    expect(curpInput).toHaveValue('SAGC940106HOCNZS00'); 

    const rfcInput = screen.getByTestId('rfcInput');
    fireEvent.change(rfcInput, { target: { value: 'SAGC940106' } });
    expect(rfcInput).toHaveValue('SAGC940106'); 


  });

  test('disables button with invalid inputs', () => {
    render(<Page />);
    // Input invalid values for CURP, RFC, or other fields

    // Add assertions for checking that the button is disabled
  });

  // Add more tests as needed for other functions and UI interactions
});