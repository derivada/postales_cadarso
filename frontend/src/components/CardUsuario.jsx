/**
 * Componente para el recuadro de postal de un usuario
 * 
 * Props:
 * postal_key -> clave de la postal
 * 
 */

import React from "react";
import "../styles/CardUsuario.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

export default function CardUsuario(props) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Card className="text-white m-3 rounded user-card">
        {props.usuario.abierto === false && (
          <Card.Header className={`${props.color.active}`}>
            <Card.Title className="mt-1">{props.usuario.nombre}</Card.Title>
          </Card.Header>
        )}
        {props.usuario.abierto === true && (
          <Card.Header className={`${props.color.inactive}`}>
            <Card.Title className="mt-1">{props.usuario.nombre}</Card.Title>
          </Card.Header>
        )}
        <Card.Body className="bg-white p-3 m-1">
          {props.usuario.abierto === true && (
            <Button variant="secondary" size="large" disabled className={`${props.color.inactive} card-button`}>
              Abierto
            </Button>
          )}
          {props.usuario.abierto === false && (
            <Button variant="primary" size="large" onClick={() => props.modalCorreo(props.usuario.id)} className={`${props.color.active} card-button`}>
              Abrir postal
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
