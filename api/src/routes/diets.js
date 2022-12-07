const {Router} = require('express');
const router = Router();
const traerDietas = require('../controllers/controllerDiets')

router.get('/', traerDietas)

module.exports = router