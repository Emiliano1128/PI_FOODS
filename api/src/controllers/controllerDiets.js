const { Diets } = require('../db');
const preCarga = require('../preCarga');

const traerDietas = async (req,res)=>{
    try {
        const comprobacionDB = await Diets.findOne({where:{name: 'ketogenic'}})
        if (!comprobacionDB){
            const mapeoPreCarga = preCarga.map((dieta) => {return {name: dieta}})
            await Diets.bulkCreate(mapeoPreCarga)
            return res.status(200).send(await Diets.findAll())
        }
        res.status(200).send(await Diets.findAll())

    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

module.exports = traerDietas;