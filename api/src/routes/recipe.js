const {Router} = require('express');
const router = Router();
const {recipes, recipeID, recipePost} = require('../controllers/controllerRecipes')

router.get('/',recipes)

router.get('/:id', recipeID)

router.post('/', recipePost)

/* router.delete('/:id',()=>{}) */

module.exports = router