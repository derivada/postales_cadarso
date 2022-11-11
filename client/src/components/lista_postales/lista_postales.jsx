/**
 * Componente para la lista general de postales, guarda estado sobre cada postal
 *
 */

import React, { Component } from "react";
import Postal from "./../postal/postal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ListaPostales extends Component {
  constructor(props) {
    super(props);
    this.abrirDialogoCorreo = this.abrirDialogoCorreo.bind(this)
    this.cerrarDialogoCorreo = this.cerrarDialogoCorreo.bind(this)
    this.enviarCorreo = this.enviarCorreo.bind(this)
  }

  state = {
    usuarios: [],
    modalCorreoAbierta: false,
    usuarioModalCorreo: null,
    inputCorreo: null,
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

  abrirDialogoCorreo(id) {
    const usuario = this.state.usuarios.filter((usuario) => usuario.id === id);
    this.setState({
      modalCorreoAbierta: true,
      usuarioModalCorreo: id,
      inputCorreo: null,
    });
  }

  cerrarDialogoCorreo = () => {
    this.setState({
      modalCorreoAbierta: false,
      inputCorreo: null,
    });
  };

  enviarCorreo = (event) => {
    // Correo en this.state.inputCorreo
    // TODO validar y enviar correo al backend
    event.preventDefault()
    fetch("http://127.0.0.1:3001/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: this.state.inputCorreo,
        usuario: this.state.usuarioModalCorreo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.cerrarDialogoCorreo();
      });
  };

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          {this.state.usuarios.map((usuario) => (
            <Postal
              key={"postal" + usuario.id}
              usuario={usuario}
              modalCorreo={this.abrirDialogoCorreo}
            />
          ))}
        </div>
        <Modal
          show={this.state.modalCorreoAbierta}
          onHide={this.cerrarDialogoCorreo}
        >
          <Modal.Header>
            <Modal.Title>
              <h5>Abrir postal</h5>
            </Modal.Title>
          </Modal.Header>
          <Form
            controlId="formCorreo"
            onChange={this.handleInputChange}
            onSubmit={this.enviarCorreo}
          >
            <Modal.Body>
              {this.explicacionForm()}
              <Form.Control
                type="email"
                size="lg"
                placeholder="Dirección de correo"
                autoComplete="username"
                onChange = {(e) => {
                  this.setState({
                    inputCorreo: e.target.value
                  })
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                variant="secondary"
                onClick={this.cerrarDialogoCorreo}
              >
                Cerrar
              </Button>
              <Button type="submit" variant="primary">
                Enviar correo
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
  explicacionForm() {
    return (
      <div>
        Para abrir una postal, y con el objetivo de que las postales sean
        privadas debes hacer lo siguiente:
        <ol>
          <li>Introducir tu correo en el siguiente formulario</li>
          <li>Abrir el enlace que se te mandará por correo</li>
        </ol>
        <p>
          Una vez el enlace de la postal haya sido abierto, este formulario se
          cerrará y ningún otro usuario podrá introducir su correo aquí para
          poder ver tu postal!
        </p>
        <p>
          Por supuesto, el enlace enviado a tu correo seguirá funcionando, pero
          no será enviado a ningún otro usuario
        </p>
      </div>
    );
  }
}

export default ListaPostales;
