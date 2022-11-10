/**
 * Componente para el recuadro de postal de un usuario
 */

import React, {Component} from "react";

class Postal extends Component {
    render(){
        return <div className="card col-sm-6 col-md-4 col-lg-3 border border-secondary rounded">
                <div className="card-body">
                    <h5 className="card-title">{this.props.usuario.nombre}</h5>
                    <div className="card-body">
                        {this.props.usuario.abierto === true && <button className="btn btn-lg btn-primary text-faded disabled">Abierto</button>}
                        {this.props.usuario.abierto === false && <button onClick={() => this.props.handlerAbrir(this.props.usuario.id)} 
                        className="btn btn-lg btn-primary">Abrir</button>}
                    </div>
                </div>
            </div>    
    }
}

export default Postal