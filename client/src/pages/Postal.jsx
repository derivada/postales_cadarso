import React from "react";
import { useParams } from "react-router-dom";

export function Postal() {
  const { key } = useParams();

  // TODO: llamar al backend para validar la key y obtener el texto de la postal
  const body = null;
  const valid = false;

  return (
    <React.Fragment>
      <h1>Postal key = {key}</h1>;
    </React.Fragment>
  );
}
