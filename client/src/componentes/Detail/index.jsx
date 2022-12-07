import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail, limpiarDetail } from "../../redux/actions";
import './detail.css';

export default function Detail (){

    const dispatch = useDispatch()
    const params = useParams()
    const detail = useSelector((state)=> state.detail)


    useEffect(()=>{
        dispatch(getDetail(params.id))
        return ()=>{
            dispatch(limpiarDetail())
        }
    },[dispatch, params.id])

    
    /* const guardar = detail.steps && detail.steps.steps ? detail.steps.steps.map(paso => { return {number:paso.number,step:paso.step}}) 
    : [...detail.steps] */

    return (
        <div className="detail">
            <Link to='/home'>
            <button className="button_detail" >Volver al home</button>
            </Link>
            <h3>Nombre: {detail.name}</h3>
            <img src={detail.image} alt="not found" />
            <h5>Nivel de Saludable: {detail.healthScore}</h5>
            {
                detail.price && <h5>Precio: {detail.price}</h5>
            }
            <h5 className="detail_summary">Resumen:</h5>
            <p>{detail.summary}</p>
            <div>
            <h5>Platos:</h5>
            <ul>
                {
                    Array.isArray(detail.dishType) ? detail.dishType.map((plato,index) => <li key={index}>{plato}</li>)
                    : <li>{detail.dishType}</li>
                }
            </ul>
            </div>
             <div>
                <h5>Paso a Paso:</h5>
                <ul>
                    { detail.steps && detail.steps.steps ? detail.steps.steps.map((paso)=> <li key={paso.number}>{paso.step}</li>)
                    : <li>{detail.steps}</li>}
                </ul>
                
            </div> 
            
        </div>
    )
}