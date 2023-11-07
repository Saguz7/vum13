import React from 'react';

const Footer = () => {
  return (
    <div className="shadow-sm bg-white mt-3 border-top--rosa p-4">
      <div className="container">
        <div className="d-md-flex d-none align-items-center justify-content-center">
          <div>
            <img className="logoGris" src="/static/media/LogoGris.c974bb2afda85d41c9df.png" alt="logo" />
            <img className="logoSello ms-5" src="/static/media/Sello.0cd87333176cf7df8fca.png" alt="logo" />
          </div>
          <div>
            <div className="redes text-center d-flex justify-content-center">
              <div className="me-2 icon_btn">
                <div className="d-flex align-items-center" style={{ fontSize: '22px' }}>
                  {/* Inserta aquí el primer SVG */}
                </div>
              </div>
              <div className="me-2 icon_btn">
                <div className="d-flex align-items-center" style={{ fontSize: '25px' }}>
                  {/* Inserta aquí el segundo SVG */}
                </div>
              </div>
              <div className="me-2 icon_btn">
                <div className="d-flex align-items-center" style={{ fontSize: '22px' }}>
                  {/* Inserta aquí el tercer SVG */}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <div className="text-center text-small text-gray">Enlaces de comunicación</div>
            </div>
          </div>
        </div>
        <div className="text-gray text-small">#HonestidadyTrabajo</div>
      </div>
    </div>
  );
}

export default Footer;
