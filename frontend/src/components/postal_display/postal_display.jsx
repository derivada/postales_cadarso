/**
 * Componente para el recuadro de postal de un usuario
 */

import React, { Component } from "react";

class PostalDisplay extends Component {
  state = {
    dedicatoria: null,
    cuerpo: null,
    posdata: null,
    imagen: null
  };

  componentDidMount() {
    fetch("/postal/" + this.props.postal_key)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se recibió un código de respuesta adecuado");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success === false) throw new Error();
        this.setState({
          dedicatoria: data.dedicatoria,
          cuerpo: data.cuerpo,
          posdata: data.posdata,
          imagen: data.imagen
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <React.Fragment>
      <h1>{this.state.cuerpo}</h1>
      <p>{this.state.dedicatoria}</p>
      <img src={this.state.imagen}></img>
      <h3>{this.state.posdata}</h3>
      </React.Fragment>;
  }
}

export default PostalDisplay;
