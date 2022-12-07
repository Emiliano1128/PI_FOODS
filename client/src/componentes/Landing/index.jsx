import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../redux/actions";
import '../Landing/Landing.css';

export default function Landing (){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes())
    },[dispatch])

    return (
        <div className="landing">
            <Link to={'/home'}>
        <button className="buttonLanding">HOME</button>
          </Link>
        </div>
    )
}