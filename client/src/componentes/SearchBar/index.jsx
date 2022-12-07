import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { buscar } from '../../redux/actions';
import './searchBar.css';

export default function SearchBar ({setCurrentPage}){

    const [buscador, setBuscador] = useState('');
    const dispatch = useDispatch();

    const handlerInput = (e) => {
        setBuscador(e.target.value)
    }
    const handlerBuscar = (e)=>{
        dispatch(buscar(buscador));
        setCurrentPage(0);
        setBuscador('');
    }
    return (
        <div>
            <input type="text" name='buscar' value={buscador} onChange={handlerInput}/>
            <button className='button_search' onClick={handlerBuscar}>Buscar</button>
        </div>
    )
}