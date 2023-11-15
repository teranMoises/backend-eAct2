var express = require('express');
var router = express.Router();
const Equipos_Controller = require('../controllers/Equipos_Controller')

/* GET */

router.get('/', function (req, res, next) {
    Equipos_Controller.ver_equipos().then((resultados)=>{
        res.json(resultados);
    }).catch((error)=>{
        res.status(500).send(error)
    })
});




module.exports = router; 