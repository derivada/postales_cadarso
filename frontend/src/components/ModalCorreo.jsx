/**
 * Componente para la modal en la que el usuario introduce el correo
 * 
 * Pasar props: 
 *  placeholder -> texto usado como placeholder cuando no hay nada
 *  onSearch -> llamado cuando se actualize el filtro
 */

import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ModalCorreo(props) {
    return (
        <Modal
            show={props.isOpen}
            onHide={props.onClose}>
            <Modal.Header>
                <Modal.Title>
                    <h5>Abrir postal</h5>
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
                    <Button type="submit" variant="primary">
                        Enviar correo
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}