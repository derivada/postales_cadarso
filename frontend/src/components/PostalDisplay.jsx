/**
 * Componente para el recuadro de postal de un usuario
 */

import React, { Component } from "react";

export default class PostalDisplay extends Component {
  state = {
    valido: false,
    dedicatoria: null,
    cuerpo: null,
    posdata: null,
    imagen: null
  };

  componentDidMount() {
    fetch("/api/postal/" + this.props.postal_key)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se recibió un código de respuesta adecuado");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success === false) throw new Error("Postal no encontrada");
        this.setState({
          valido: true,
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
    return(
    <React.Fragment>
      {this.state.valido &&
        <React.Fragment>
          <h1>{this.state.dedicatoria}</h1>
          <p>{this.state.cuerpo}</p>
          <img src={this.state.imagen}></img>
          <h3>{this.state.posdata}</h3>
        </React.Fragment>
      }
      {!this.state.valido &&
        <React.Fragment>
          <h1>Postal no encontrada</h1>
        </React.Fragment>
      }
    </React.Fragment>
    )
  }
}