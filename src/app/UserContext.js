"use client"; // This is a client component 👈🏽

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      return storedUserData ? JSON.parse(storedUserData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (userData && typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  const updateUser = (newUserData) => {
    console.log(newUserData);

    setUserData((prevUserData) => ({ ...prevUserData, ...newUserData }));
    console.log(userData);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      setUserData(null);
    }
  };

  const removeProperty = (propertyName) => {
    setUserData((prevUserData) => {
      // Crear una copia del estado actual
      const updatedUserData = { ...prevUserData };

      // Eliminar la propiedad específica
      delete updatedUserData[propertyName];

      // Actualizar el estado con la nueva información
      return updatedUserData;
    });

    if (typeof window !== 'undefined') {
      // Obtener la información actualizada del almacenamiento local
      const storedUserData = localStorage.getItem('userData');
      const updatedUserData = storedUserData ? JSON.parse(storedUserData) : {};

      // Eliminar la propiedad específica
      delete updatedUserData[propertyName];

      // Actualizar el almacenamiento local con la nueva información
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
  };


  return (
    <UserContext.Provider value={{ userData, updateUser, logout, removeProperty }}>
      {children}
    </UserContext.Provider>
  );
};