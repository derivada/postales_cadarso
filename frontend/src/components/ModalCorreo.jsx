/**
 * Componente para la modal en la que el usuario introduce el correo
 * 
 * Props: 
 *  onChange -> llamado cuando se actualiza el texto introducido en el input
 *  onSubmit -> llamado cuando se envía el formulario
 *  isOpen -> booleano que indica si la modal está abierta o no
 *  onClose -> llamado cuando se cierra la modal
 *  explicacion -> función que devuelve el texto de la modal
 */

import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../styles/ModalCorreo.css";

export default function ModalCorreo(props) {
    return (
        <Modal
            show={props.isOpen}
            onHide={props.onClose}>
            <Modal.Header>
                <Modal.Title>
                    <h3>✉️Abrir postal✉️</h3>
                </Modal.Title>
            </Modal.Header>
            <Form
                controlId="formCorreo"
                onChange={props.onChange}
                onSubmit={props.onSubmit} >
                <Modal.Body>
                    {props.explicacion()}
                    <Form.Control type="email" size="lg" placeholder="Dirección de correo" autoComplete="username" onChange={props.onChange} required/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="secondary" onClick={props.onClose}>
                        Cerrar
                    </Button>
                    <Button type="submit" variant="primary" className="enviarCorreo">
                        Enviar correo
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}