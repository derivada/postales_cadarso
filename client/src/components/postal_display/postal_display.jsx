/**
 * Componente para el recuadro de postal de un usuario
 */

import React, { Component } from "react";
import backend_url from "../..";

class PostalDisplay extends Component {
  state = {
    postal_body: null,
  };

  componentDidMount() {
    fetch(backend_url + "/postal/" + this.props.postal_key)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se recibió un código de respuesta adecuado");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success === false) throw new Error();
        this.setState({
          postal_body: data.postal_body,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <h1>{this.state.postal_body}</h1>;
  }
}

export default PostalDisplay;
