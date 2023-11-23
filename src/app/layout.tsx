import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head' // Importa el componente Head
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Morelia - VUM',
  description: 'Gobierno de Michoacan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <Head>
        {/* Agrega la hoja de estilos en la sección <head> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
        <link href="https://ui.michoacan.gob.mx/static/css/main.edcd66f5.css" rel="stylesheet" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}