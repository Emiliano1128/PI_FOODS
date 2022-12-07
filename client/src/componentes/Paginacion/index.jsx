import React from "react";
import './paginacion.css';

export function Paginacion ({prevHandler, nextHandler, currentPage, paginasTotales}){

    return (
        <div className="paginacion_general">
            <div className="paginacion_general">
            {
                currentPage < 0 ? null :  <button onClick={prevHandler}>Prev</button> 
            }
            </div>
            <div className="paginacion_general">
            <p>{currentPage}</p>
            </div>
            <div className="paginacion_general">
            {
                currentPage > paginasTotales ? null  : <button onClick={nextHandler}>Next</button>
            }
            </div>
        </div>
    )
}