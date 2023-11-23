import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../Page'; // Ajusta la ruta

describe('Page Component', () => {
  test('renders Page component', () => {
    render(<Page />);
   });


   test('Revisar input de correo electrónico y CURP/RFC con valores incorrectos', async () => {
    render(<Page />);
    // Asegúrate de que los elementos estén presentes en el DOM
    await waitFor(() => {
      expect(screen.getByTestId('correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('curprfcInput')).toBeInTheDocument();

    });

    const correoInput = screen.getByTestId('correoInput');
    fireEvent.change(correoInput, { target: { value: 'cesarsantiagoguzman@gmail.com' } });
    expect(correoInput).toHaveValue('cesarsantiagoguzman@gmail.com'); 

    const curprfcInput = screen.getByTestId('curprfcInput');
    fireEvent.change(curprfcInput, { target: { value: 'SAGC940106HOCNZS00' } });
    expect(curprfcInput).toHaveValue('SAGC940106HOCNZS00'); 

    // Verifica que el botón esté habilitado
    const continuarButton = screen.getByText('Continuar');
 
    // Simula un clic en el botón para continuar
    fireEvent.click(continuarButton);
/*

    await waitFor(() => {
      expect(screen.getByTestId('contrasenaInput')).toBeInTheDocument();
      expect(screen.getByTestId('contrasenaRepetidaInput')).toBeInTheDocument();

    });

    const contrasenaInput = screen.getByTestId('contrasenaInput');
    fireEvent.change(contrasenaInput, { target: { value: 'aBC12412%' } });
    expect(contrasenaInput).toHaveValue('aBC12412%'); 

    const contrasenaRepetidaInput = screen.getByTestId('contrasenaRepetidaInput');
    fireEvent.change(contrasenaRepetidaInput, { target: { value: 'aBC12412%' } });
    expect(contrasenaRepetidaInput).toHaveValue('aBC12412%'); 

    const continuarButtonContrasena = screen.getByText('Continuar');
      // Simula un clic en el botón para continuar
    fireEvent.click(continuarButtonContrasena);

    */
  
  });
  

 });