import React from "react";
import ListaPostales from "../components/ListaPostales";
import "./../styles/Home.css";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
return (
    <React.Fragment>
      <div className="d-flex flex-row p-4 align-items-center justify-content-between border-bottom border-dark navbar-bg">
        <div className="d-flex flex-row justify-content-between w-100 align-items-center">
          <div className="title">
            <h1 className="text-white title-text">🎄Postales Cadarso 2022🎄</h1>
          </div>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <img height="50" src="github-mark-white.png" alt="logo github"></img>
          </a>
        </div>
      </div>
      <div className="mainContent">
        <div className="p-3" id="subtitle">
          <p>Hola! Bienvenido a esta página para pasaros mis postales de Navidad de este año. Como estoy en Noruega de Erasmus no pude haceros
            a todos una postal escrita, así que decidí crear esta web para ello (y para aprender a hacer una de paso). Espero que os gusten mucho! </p>
          <p className="author">Pablo</p>
        </div>
        <ListaPostales/>
      </div>
      <Carousel fade interval={10000} keyboard wrap className="bgcarousel">
          <Carousel.Item>
            <img className="d-block w-100" src="cadarso1.jpg" alt="cadars dia"/>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="cadarso2.jpg" alt="cadarso noche"/>
            </Carousel.Item>
      </Carousel>
    </React.Fragment>
    
  );
}
