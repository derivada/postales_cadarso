/**
 * Componente para la busqueda y filtrado dinámico en una lista de texto
 * 
 * Props: 
 *  placeholder -> texto usado como placeholder cuando no hay nada
 *  onSearch -> llamado cuando se actualize el filtro
 */

import React from "react";

export default function BarraBusqueda(props) {
  return (
      <div className = "input-group mb-3">
            <div className="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart" viewBox="0 0 16 16">
                  <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"></path>
                  <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"></path>
              </svg>
            </div>
            <input type="email" className="form-control" placeholder={props.placeholder} onChange={props.onSearch}/>
      </div>
  );
}