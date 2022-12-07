require ('dotenv').config(); 
const { API_KEY, URL,COMPLEMENTO/* API_KEY_DOS */} = process.env;
const axios = require('axios');
const {Recipe, Diets} = require('../db');
 const data = require('../preCarga/foodComplexSearch.json')  


const getRecipesApi = async () => {
    /* const pedido = await axios.get(`${URL}${API_KEY}${COMPLEMENTO}`) */
    const api = /* pedido. */data.results.map((receta)=> {return {
        name: receta.title,
        image: receta.image,
        id: receta.id,
        summary: receta.summary,
        dishType: receta.dishTypes,
        diets: receta.diets,
        healthScore: receta.healthScore,
        steps: receta.analyzedInstructions[0]/* .steps.map((unidad)=>{return {number: unidad.number, step: unidad.step}}) */ 
    }})
    return api
}

const  getRecipesDb = async () => {
    const traidoDB = await Recipe.findAll({
        include:{
            model: Diets,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
    return traidoDB
}

const getAllRecipes = async ()=>{
    const traidoApi = await getRecipesApi();
    const traidoDB = await getRecipesDb()
    const ambos = [...traidoApi, ...traidoDB]
    return ambos
}

const recipes = async (req, res) =>{
    try {
        const {name} = req.query;
        const todasRecetas = await getAllRecipes()
        if(name){
            const buscar = todasRecetas.filter(receta => receta.name === name)
            buscar.length 
            ? res.status(200).send(buscar)
            : res.status(400).send('Receta no encontrada')
        } else {
            res.status(200).send(todasRecetas)
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const recipeID = async (req,res)=>{
    try {
        const {id} = req.params;
        const todasRecetas = await getAllRecipes();
        if(id){
            const encontrada = todasRecetas.find(receta => receta.id == id)
            encontrada 
            ? res.status(200).send(encontrada)
            : res.status(400).send('Receta no encontrado')
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const recipePost = async (req,res)=>{
    try {
        const {name,summary,steps,healthScore,diets,image,price,dishType} = req.body
        const crearEnDB = await Recipe.create({
            name,
            summary,
            steps,
            healthScore,
            image,
            price,
            dishType
        })
        const dietsDb = await Diets.findAll( {where:{name:diets}} )
        crearEnDB.addDiets(dietsDb)
        res.status(200).send('Receta creada con exito :)')
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}
/* const deleteRecipe = async (req,res) => {
    const {id} = req.params;
    try {
        const buscar = await getAllRecipes()
        const encontrado = buscar.filter(receta => receta.id !== id)
    } catch (error) {
        
    }
} */
module.exports = {recipes, recipeID, recipePost}
