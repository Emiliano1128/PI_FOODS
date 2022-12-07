import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import './form.css';
import {Link} from 'react-router-dom'


export default function Form (){
    const [form, setForm] = useState({
        name: '',
        image: '',
        diets: [],
        price: 0,
        healthScore: 0,
        summary: '',
        steps:'',
        dishType:''
    })
    const [error, setError] = useState({
        name: '',
        image: '',
        diets: '',
        price: '',
        healthScore: '',
        summary: '',
        steps:'',
        dishType:''
    })

    const validate = ({name,image,diets,price,healthScore,summary,steps,dishType}) => {
        const errors = {};

        if(!name)  errors.name = 'Nombre vacio o invalido'
        if(!image)  errors.image = 'Imagen vacia o invalida'
        if(!price ||price < 0 || price > 10000) errors.price = 'Precio invalido, no debe superar los 10.000 pesos'
        if(!healthScore || healthScore > 100) errors.healthScore = 'Puntos de salud invalido, rango de puntaje de 0 a 100'
        if(!summary) errors.summary = 'Resumen vacio o invalido'
        if(!steps) errors.steps = 'Pasos vacios o invalidos'
        if(!diets.length) errors.diets = 'dietas vacias'
        if(!dishType) errors.dishType = 'tipo de plato vacio'

        return errors
    }

    const dietas = useSelector((state)=> state.diets);
    
    useEffect(()=>{
        setError(validate({
            ...form
        }))
    },[form])

    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const handlerSelect = (e)=>{
        setForm({
            ...form,
            diets: [...form.diets, e.target.value]
        })
        setError(validate({
            ...form,
            diets: [...form.diets, e.target.value]
        }))
    }

    const crearReceta = (receta)=>{
        axios.post(`http://localhost:3001/recipes`,receta)
        return alert('Receta creada con exito')
    }

    const handlerOnSubmit = (e)=>{
        e.preventDefault()
        crearReceta(form)
        setForm({
        name: '',
        image: '',
        diets: [],
        price: 0,
        healthScore: 0,
        summary: '',
        steps:[],
        dishType:''
        })
    }

    return (
        <div className="formulario">
            <form onSubmit={handlerOnSubmit}>
                <div className="formularios_seldas">
                <label>Nombre:</label>
                <input type="text" name='name' value={form.name} onChange={handlerChange}/>
                {error.name && <lebel>{error.name}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Imagen:</label>
                <input type="text" name='image' value={form.image} onChange={handlerChange}/>
                {error.image && <lebel>{error.image}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Precio:</label>
                <input type="number" name='price' value={form.price} onChange={handlerChange}/>
                {error.price && <lebel>{error.price}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Puntos Saludable:</label>
                <input type="text" name='healthScore' value={form.healthScore} onChange={handlerChange}/>
                {error.healthScore && <lebel>{error.healthScore}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Resumen:</label>
                <input type="text" name='summary' value={form.summary} onChange={handlerChange}/>
                {error.summary && <lebel>{error.summary}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Paso a paso:</label>
                <input type="text" name='steps' value={form.steps} onChange={handlerChange}/>
                {error.steps && <lebel>{error.steps}</lebel>}
                </div>
                <div className="formularios_seldas">
                <label>Tipo de plato</label>
                <input type="text" name='dishType' value={form.dishType} onChange={handlerChange}/>
                {error.dishType && <lebel>{error.dishType}</lebel>}
                </div>
                <div className="formularios_seldas">
                    <label>Tipos de dieta:</label>
                    <select onChange={handlerSelect}>
                        <option value="" hidden>seleccionar</option>
                        {
                            dietas && dietas.map((dieta) => <option key={dieta.id} value={dieta.name}>{dieta.name}</option> )
                        }
                    </select>
                    {error.diets && <lebel>{error.diets}</lebel>}
                </div>
                <div className="formularios_seldas">
                    {
                        error.name || error.image || error.price || error.diets || error.summary 
                        || error.healthScore || error.steps || error.dishType ?  null : <button type="submit" className="button_form">Crear Receta</button>
                    }
                </div> 
            </form>
            
            <Link to='/home'>
        <button className="button_form">volver al home</button>
        </Link>
        </div>
    )
}
