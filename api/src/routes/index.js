const { Router } = require('express');
const recipes = require('./recipe.js')
const diets = require('./diets.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/recipes', recipes)
router.use('/diets', diets)
router.get('*',(req,res)=>{
    res.send({message: 'Ruta inexistente'})
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
