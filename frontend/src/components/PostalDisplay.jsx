/**
 * Componente para el recuadro de postal de un usuario
 */

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import html2pdf from "html2pdf.js";

import "./../styles/PostalDisplay.css";

export default class PostalDisplay extends Component {
  
  constructor(props) {
    super(props);
    this.refPostal = React.createRef();  
    this.descargar = this.descargar.bind(this)
  }

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

  descargar() {

    const opt = {
      margin: 1,
      filename: 'postal.pdf',
      image: { type: 'jpeg', quality: 0.20 },
      html2canvas: { scale: 2,useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
    };
    
    html2pdf().set(opt).from(this.refPostal.current.innerHTML).save();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.valido &&
          <React.Fragment>
            <Button className="m-2" variant="outline-primary" size="lg" onClick={this.descargar}>
              Descargar Postal
            </Button>
            <div className="m-5 postal" ref={this.refPostal}>
              <img className="background-img" src="./../paper_texture.jpg" alt="textura fondo postal" />
              <Container className="postal-body">
                <Row>
                  <Col className="pag-izq mr-3">

                    <h1 className="postal-dedicatoria">
                      <span style={{ 'font-size': '6rem' }}> {this.state.dedicatoria[0]} </span>
                      {this.state.dedicatoria.substring(1)}
                    </h1>
                    <p className="postal-cuerpo">{this.state.cuerpo}</p>
                    <h3 className="postal-posdata">{this.state.posdata}</h3>
                    <h6 className="postal-autor">Pablo</h6>
                  </Col>
                  <Col className="pag-dcha ml-3">
                    <img src={this.state.imagen} className="postal-imagen"></img>
                  </Col>
                </Row>
              </Container>
            </div>
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