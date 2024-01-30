"use client"; // This is a client component 👈🏽

import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const storedMode = localStorage.getItem('isDarkMode');
      return storedMode ? JSON.parse(storedMode) : false;
    } else {
      // Handle the case where localStorage is not available
      return false;
    }
  });

  const toggleDarkMode = () => {
    // Cambia el estado
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Guarda el nuevo estado en el localStorage
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};