/**
 * Componente para la lista general de postales, guarda estado sobre cada postal
 *
 */

import React, { Component } from "react";
import Postal from "./../postal/postal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class ListaPostales extends Component {
  constructor(props) {
    super(props);
    this.abrirModalCorreo = this.abrirModalCorreo.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    usuarios: [],
    modalCorreoAbierta: false,
    usuarioModalCorreo: null
  };

  componentDidMount() {
    let a = 123;
    // TODO backend call para conseguir lista de usuarios
    fetch("http://127.0.0.1:3001/user/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se recibió un código de respuesta adecuado");
        }
        return response.json();
      })
      .then((data) => {
        let usuarios = [];
        for (const user of data) {
          usuarios.push({
            id: user._id,
            nombre: user.name,
            abierto: user.opened,
          });
        }
        this.setState({
          usuarios: usuarios,
        });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  }

  abrirModalCorreo(id) {
    const usuario = this.state.usuarios.filter(usuario => usuario.id === id)

    this.setState({
      modalCorreoAbierta: true,
      usuarioModalCorreo: id
    });
  }

  hideModal = () => {
    this.setState({
      modalCorreoAbierta: false,
    });
  };

  handleInputChange = (event) => {
    this.setState({
        correo: event.target.value
    })
  }
  enviarCorreo = () => {
    // TODO validar y enviar correo al backend
    
    this.setState({
        modalCorreoAbierta: false,
    });
  } 
  render() {
    return (
      <div className="container my-5">
        <div className="row">
          {this.state.usuarios.map((usuario) => (
            <Postal
              key={"postal" + usuario.id}
              usuario={usuario}
              modalCorreo={this.abrirModalCorreo}
            />
          ))}
        </div>
        <Modal show={this.state.modalCorreoAbierta} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>
                <h5>Abrir postal</h5>
            </Modal.Title>
          </Modal.Header> 
          <Modal.Body>  
            Para abrir una postal, y con el objetivo de que las postales sean privadas debes hacer lo siguiente:
            <ol>
                <li>Introducir tu correo en el siguiente formulario</li>
                <li>Abrir el enlace que se te mandará por correo</li>
            </ol>
            <p>
                Una vez el enlace de la postal haya sido abierto, este formulario se cerrará y ningún otro usuario 
                podrá introducir su correo aquí para poder ver tu postal! 
            </p>
            <p>
                Por supuesto, el enlace enviado a tu correo seguirá funcionando, pero no será enviado a ningún otro usuario
            </p>    
            <Form.Group controlId="formCorreo" onChange= {this.handleInputChange}>
                <Form.Control type="email" size = "lg" placeholder = "Dirección de correo" autoComplete="username"/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.hideModal}>Cerrar</button>
            <button type="button" class="btn btn-primary" onClick={this.enviarCorreo}>Enviar correo</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ListaPostales;
