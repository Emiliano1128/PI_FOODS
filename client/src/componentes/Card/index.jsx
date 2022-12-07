import React from "react";
import {Link} from 'react-router-dom'
import './card.css';

export default function Card ({name, image, diets, id}){


    return (
        <div className="card">
            
            <Link to={`/detail/${id}`}>
            <h3>{name}</h3>
            
            <img className="image_card" src={image} alt="not found" />
             {
                diets.map((dieta,index) => dieta.name ? <p key={index}>{dieta.name}</p>:<p key={index}> {dieta}</p>) 
            } 
            </Link>
        </div>
    )
}