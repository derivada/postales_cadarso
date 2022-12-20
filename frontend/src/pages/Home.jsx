import React from "react";
import ListaPostales from "../components/ListaPostales";
import "./HomeStyles.css";

export default function Home() {
  return (
    <React.Fragment>
      <div className="d-flex flex-row p-4 bg-primary align-items-center justify-content-between border-bottom border-dark">
        <div className="d-flex flex-row justify-content-between w-100 align-items-center">
          <h1 className="text-white">Postales Cadarso 2022</h1>
            <a href="https://github.com/" target="_blank">
              <img height="50" src="github-mark-white.png"></img>
          </a>
        </div>
      </div> 
      <ListaPostales/>
    </React.Fragment>
  );
}
