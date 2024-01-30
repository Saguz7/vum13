import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const code = // Obtén el código de alguna manera
    if (code) {
      router.push('/buzon');
    }
  }, [router]);

  return (
    <div>
      <h1>Página de Inicio</h1>
      {/* Contenido de tu página de inicio */}
    </div>
  );
};

export default HomePage;