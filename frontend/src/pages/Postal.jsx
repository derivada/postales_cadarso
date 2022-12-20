import React from "react";
import { useParams } from "react-router-dom";
import PostalDisplay from "../components/postal_display/postal_display";

export function Postal() {
  const { key } = useParams();

  // TODO: llamar al backend para validar la key y obtener el texto de la postal
  const body = null;
  const valid = false;

  return (
    <React.Fragment>
      <PostalDisplay postal_key={key}/>
    </React.Fragment>
  );
}
