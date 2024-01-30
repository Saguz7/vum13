'use client'
 import { Inter } from 'next/font/google'
import Head from 'next/head' // Importa el componente Head
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext';
import React from 'react';
import { DarkModeProvider } from './DarkModeContext';

const inter = Inter({ subsets: ['latin'] }) 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
 
  return (
    <html lang="es">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
        <link href="https://ui.michoacan.gob.mx/static/css/main.edcd66f5.css" rel="stylesheet" />
      </Head>
      <UserProvider>
      <DarkModeProvider>
        <body className={inter.className}>{children}</body>
      </DarkModeProvider>

       
      </UserProvider>
       
    </html>
  )
}