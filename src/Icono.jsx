import React from 'react';

function Icono({ name, alt, className = '', ...props }) {
  return <img src={`/iconos/${name}.svg`} alt={alt || name} className={className} {...props} />;
}

export default Icono;
