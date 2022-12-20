/**
 * Componente para la lista general de postales, guarda estado sobre cada postal
 *
 */

import React, { Component } from "react";
import CardUsuario from "./CardUsuario";
import BarraBusqueda from "./BarraBusqueda";
import ModalCorreo from "./ModalCorreo";
import { removeAccents } from "../utils"

class ListaPostales extends Component {
  constructor(props) {
    super(props);
    this.abrirDialogoCorreo = this.abrirDialogoCorreo.bind(this)
    this.cerrarDialogoCorreo = this.cerrarDialogoCorreo.bind(this)
    this.enviarCorreo = this.enviarCorreo.bind(this)
    this.filtrarListaPostales = this.filtrarListaPostales.bind(this)
  }

  state = {
    usuarios: [],
    usuariosFiltrados: [],
    modalCorreoAbierta: false,
    usuarioModalCorreo: null,
    inputCorreo: null,
  };

  componentDidMount() {
    // Traer la lista de usuarios del backend
    fetch('/api/user/list')
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
          usuariosFiltrados: usuarios
        });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  }

  filtrarListaPostales = (e) => {
    const str = removeAccents(e.target.value).replaceAll(' ', '').toLowerCase()
    const filtrados = this.state.usuarios.filter(usuario => removeAccents(usuario.nombre.toLowerCase())
      .replaceAll(' ', '')
      .includes(str))
    this.setState({
      usuariosFiltrados: filtrados
    })
  }

  abrirDialogoCorreo(id) {
    this.setState({
      modalCorreoAbierta: true,
      usuarioModalCorreo: id,
      inputCorreo: null,
    });
  }

  cerrarDialogoCorreo = () => {
    this.setState({
      modalCorreoAbierta: false,
      usuarioModalCorreo: null,
      inputCorreo: null,
    });
  };

  enviarCorreo = (event) => {
    event.preventDefault()
    fetch('/api/user/register', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dir: this.state.inputCorreo,
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
        <BarraBusqueda onSearch={this.filtrarListaPostales} placeholder="Buscar postales" />
        <div className="row" id="postales">
          {this.state.usuariosFiltrados.map((usuario) => (
            <CardUsuario
              key={"postal" + usuario.id}
              usuario={usuario}
              modalCorreo={this.abrirDialogoCorreo}
            />
          ))}
        </div>

        <ModalCorreo
          explicacion={this.explicacionForm}
          isOpen={this.state.modalCorreoAbierta}
          onClose={this.cerrarDialogoCorreo}
          onChange={(e) => {
            this.setState({ inputCorreo: e.target.value })
          }}
          onSubmit={this.enviarCorreo}
        />
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
