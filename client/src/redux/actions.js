/* import axios from 'axios'; */

import axios from "axios";

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = ' FILTER_BY_DIETS';
export const ORDER_BY_ALPHABETIC = 'ORDER_BY_ALPHABETIC';
export const ORDER_BY_HEALTH = 'ORDER_BY_HEALTH';
export const DETAIL = 'DETAIL';
export const BUSCAR = 'BUSCAR';
export const LIMPIAR_DETAIL = 'LIMPIAR_DETAIL';


export function getAllRecipes(){
    return function (dispatch){
        fetch(`http://localhost:3001/recipes`)
        .then(response => response.json())
        .then(data => {return dispatch({
            type: GET_ALL_RECIPES,
            payload: data
        })})
    }
}
export function getDiets(){
    return function(dispatch){
        fetch(`http://localhost:3001/diets`)
        .then(response => response.json())
        .then(data => {return dispatch({
            type: GET_DIETS,
            payload: data
        })})
        
    }
}

export function filterByDiets(value){
    return function (dispatch){
        return dispatch({
            type: FILTER_BY_DIETS,
            payload: value
        })
    }
}
export function orderByAlphabetic(value){
    return function (dispatch){
        return dispatch({
            type: ORDER_BY_ALPHABETIC,
            payload: value
        })
    }
}
export function orderByHealth(value){
    return function (dispatch){
        return dispatch({
            type: ORDER_BY_HEALTH,
            payload: value
        })
    }
}
export function getDetail (id){
    return async function(dispatch){
        const guardarDetail = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: DETAIL,
            payload: guardarDetail.data
        })
    }
}
export function buscar (info){
    return function (dispatch){
        fetch(`http://localhost:3001/recipes?name=${info}`)
        .then(response => response.json())
        .then(data => {return dispatch({
            type: BUSCAR,
            payload: data
        })}) 
    }
}
export function limpiarDetail (){
    return function (dispatch){
        return dispatch({
            type: LIMPIAR_DETAIL,
        })
    }
}