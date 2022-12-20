/**
 * Componente para el recuadro de postal de un usuario
 */

import React from "react";

export default function CardUsuario(props) {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 ">
        <div className="card border border-secondary rounded card-body">
          <h5 className="card-title">{props.usuario.nombre}</h5>
          <div className="card-body">
            {props.usuario.abierto === true && (
              <button className="btn btn-lg btn-primary text-faded disabled boton_navidad">
                Abierto
              </button>
            )}
            {props.usuario.abierto === false && (
              <button onClick={() => props.modalCorreo(props.usuario.id)}
                className="btn btn-lg btn-primary">Abrir postal</button>
            )}
          </div>
        </div>
      </div>
    );
}
