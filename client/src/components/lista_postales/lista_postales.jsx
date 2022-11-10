/**
 * Componente para la lista general de postales, guarda estado sobre cada postal
 * 
 */

import React, {Component} from "react";
import Postal from './../postal/postal';

class ListaPostales extends Component {
    constructor(props) {
        super(props);
        this.abrirPostal = this.abrirPostal.bind(this)
    }
    
    state = {
        usuarios: [
            {id: 1, nombre: 'Fischl', abierto: true},
            {id: 2, nombre: 'Mona', abierto: false},
            {id: 3, nombre: 'Lumine', abierto: true},
            {id: 4, nombre: 'Shinobu', abierto: false},
            {id: 5, nombre: 'Raiden', abierto: true},
            {id: 6, nombre: 'Yae Miko', abierto: false},
            {id: 7, nombre: 'Ganyu', abierto: false},
            {id: 8, nombre: 'Venti', abierto: false},
            {id: 9, nombre: 'Zhongli', abierto: false},
            {id: 10, nombre: 'Construye una armada', abierto: false}
        ]
    }

    componentDidMount(){
        let a = 123
        // TODO backend call para conseguir lista de usuarios
        fetch('http://localhost:3001/user/list')
        .then((response) => {
            if (!response.ok) {
              throw new Error('No se recibió un código de respuesta adecuado');
            }
            console.log(response)
        }).catch((error) => {
            console.error('Error al obtener la lista de usuarios:', error);
        });
    }
    
    abrirPostal(id) {
        let usuariosCopy = [...this.state.usuarios]
        let index = usuariosCopy.findIndex(usuario => usuario.id === id)
        usuariosCopy[index].abierto = true

        // TODO: abrir popup con el formulario, backend call con la direccion de correo

        
        this.setState({
            usuarios: usuariosCopy
        })
    }

    render(){
        return <div className="container my-5">
            <div className="row">
                {this.state.usuarios.map(usuario => 
                <Postal key={'postal' + usuario.id} 
                        usuario={usuario}
                        handlerAbrir={this.abrirPostal}
                />)}
            </div>
        </div>
    }
}

export default ListaPostales;