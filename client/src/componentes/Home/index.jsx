import React from "react";
import { useEffect, useState} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, getDiets, filterByDiets, orderByAlphabetic, orderByHealth } from "../../redux/actions";
import Card from "../Card";
import { Paginacion } from "../Paginacion";
import SearchBar from "../SearchBar";
import './home.css';


export default function Home (){
    

    const [seleccionarTipoDieta,setSeleccionarTipoDieta] = useState('')
    const [seleccionarAlfabetico,setSeleccionarAlfabetico] = useState('')
    const [seleccionarSaludable,setSeleccionarSaludable] = useState('')
    
    
    const dispatch = useDispatch();
    const dietas = useSelector((state)=> state.diets);
    const recetas = useSelector((state)=> state.orderRecipes)
    
    const cantidadPorPagina = 9
    const paginasTotales = Math.floor(recetas.length/cantidadPorPagina)
    const [currentPage, setCurrentPage] = useState(0);
    /* const [paginas, setPaginas] = useState() */
    const inicioBloque = cantidadPorPagina * currentPage;
    const finalBloque = inicioBloque + cantidadPorPagina;
    const bloques = recetas.slice(inicioBloque,finalBloque)

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
    },[dispatch])


    const prevHandler = ()=>{
        setCurrentPage(currentPage - 1);
        if(currentPage < 1) return alert('No hay paginas previas')
    }
    const nextHandler = ()=>{
        setCurrentPage(currentPage + 1);
        if(currentPage >= Math.floor(recetas.length/cantidadPorPagina)) alert('no hay paginas siguientes') 
    }
    const handlerOrdenAlfabetico = (e)=>{ 
        dispatch(orderByAlphabetic(e.target.value))
        setSeleccionarAlfabetico(e.target.value)
    }

    const handlerOrdenSaludable = (e)=>{
        setSeleccionarSaludable(e.target.value)
        dispatch(orderByHealth(e.target.value))
    }

    const handlerFiltrarDietas = (e)=>{
        dispatch(filterByDiets(e.target.value))
        setSeleccionarTipoDieta(e.target.value)
    }

    const handlerTodas = (e)=>{
        dispatch(getAllRecipes())
    }

    return (
        <div className="home_general">
            <div>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
            <div className="selectores">
                <button onClick={handlerTodas}>Todas las recetas</button>
                <select value={seleccionarAlfabetico} onChange={handlerOrdenAlfabetico}>
                    <option value="" hidden>Orden Alfabético</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select value={seleccionarTipoDieta}  onChange={handlerFiltrarDietas}>
                    <option value="" hidden>Filtrar por dieta</option>
                    <option value='todos'>Todos</option>
                    {
                        dietas && dietas.map((dieta)=> <option key={dieta.id} value={dieta.name}>{dieta.name}</option>)
                    }
                </select>
                <select value={seleccionarSaludable} onChange={handlerOrdenSaludable}>
                    <option value="" hidden>Orden saludable</option>
                    <option value="mas">Mas Saludable</option>
                    <option value="menos">Menos Saludable</option>
                </select>
            </div>
            
            <Paginacion prevHandler={prevHandler} nextHandler={nextHandler} currentPage={currentPage} 
            paginasTotales={paginasTotales}/>
            
            {
               bloques.map((receta,index)=> <Card key={index} name={receta.name} image={receta.image} id={receta.id}
                  diets={receta.diets} />)
            }
            </div>
    )
}