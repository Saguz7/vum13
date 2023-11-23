import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../Page'; // Ajusta la ruta

describe('Page Component', () => {
  test('Revisar input de correo eletronica', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByTestId('correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('contrasenaInput')).toBeInTheDocument(); 
    });

    const correoInput = screen.getByTestId('correoInput');
    fireEvent.change(correoInput, { target: { value: 'cesarsantiagoguzman@gmail.com' } });
    expect(correoInput).toHaveValue('cesarsantiagoguzman@gmail.com'); 

    const contrasenaInput = screen.getByTestId('contrasenaInput');
    fireEvent.change(contrasenaInput, { target: { value: 'San1234%67' } });
    expect(contrasenaInput).toHaveValue('San1234%67'); 


  });


  test('Revisar input de correo electrónico y contraseña con valores incorrectos', async () => {
    render(<Page />);
    // Asegúrate de que los elementos estén presentes en el DOM
    await waitFor(() => {
      expect(screen.getByTestId('correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('contrasenaInput')).toBeInTheDocument();
    });

    // Accede a los elementos de input
    const correoInput = screen.getByTestId('correoInput');
    const contrasenaInput = screen.getByTestId('contrasenaInput');

    // Ingresa valores incorrectos en los campos de input
    fireEvent.change(correoInput, { target: { value: 'correoincorrecto' } });
    fireEvent.change(contrasenaInput, { target: { value: 'contrasenaincorrecta' } });

    // Verifica que los valores hayan sido ingresados correctamente
    expect(correoInput).toHaveValue('correoincorrecto');
    expect(contrasenaInput).toHaveValue('contrasenaincorrecta');

    const continuarButton = screen.getByText('Continuar');
    expect(continuarButton).toBeDisabled();
  
  });

  test('Ingresar datos en correo y password', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByTestId('correoInput')).toBeInTheDocument();
      expect(screen.getByTestId('contrasenaInput')).toBeInTheDocument(); 
    });

    const correoInput = screen.getByTestId('correoInput');
    fireEvent.change(correoInput, { target: { value: 'cesarsantiagoguzman@gmail.com' } });
    expect(correoInput).toHaveValue('cesarsantiagoguzman@gmail.com'); 

    const contrasenaInput = screen.getByTestId('contrasenaInput');
    fireEvent.change(contrasenaInput, { target: { value: 'San1234%67' } });
    expect(contrasenaInput).toHaveValue('San1234%67'); 

    // Verifica que el botón esté habilitado
    const continuarButton = screen.getByText('Continuar');
 
    // Simula un clic en el botón para continuar
    fireEvent.click(continuarButton);


  });
  
});