import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

export default function Navbar (){

    return (
        <div className="navbar">
            <div className="linkNavbar">
            <Link to='/home'>Home</Link>
            </div>
            <div className="linkNavbar">
            <Link to='/form'>Crear Receta</Link>
            </div>
        </div>
    )
}