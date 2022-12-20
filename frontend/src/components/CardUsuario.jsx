/**
 * Componente para el recuadro de postal de un usuario
 */

import React from "react";

export default function CardUsuario(props) {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 ">
        <div className="card text-white m-3 border border-secondary rounded">
        {props.usuario.abierto === true && (
          <div className="card-header d-flex bg-secondary align-items-center">
            <h5 className="card-title mt-1">{props.usuario.nombre}</h5>
          </div>
        )}
        {props.usuario.abierto === false && (
          <div className="card-header d-flex bg-primary align-items-center">
           <h5 className="card-title mt-1">{props.usuario.nombre}</h5>
          </div>
        )}

          <div className="card-body bg-white p-3 m-1">
            {props.usuario.abierto === true && (
              <button className="btn btn-lg btn-secondary text-faded disabled boton_navidad">
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
