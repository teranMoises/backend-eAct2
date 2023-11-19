var express = require('express');
var router = express.Router();
const Modalidad_Controller = require('../controllers/Modalidad_Controller');

/* GET modalidades */
router.get('/', function (req, res, next) {
    //console.log('router GET')
    Modalidad_Controller.ver_modalidad()
        .then((resultados) => {
            //console.log('router bien')
            res.send(resultados);
        })
        .catch((error) => {
            //console.log('router mal')
            res.status(404).send(error);
        })
});
router.get('/:index', function (req, res, next) {
    Modalidad_Controller.ver_modalidad_y_categoria(req.params.index).then((resultados)=>{
        res.json(resultados);
    }).catch((error)=>{
        res.status(404).send(error)
    })
}); 
router.post('/', function (req, res, next) {
    //console.log('en routes', req.body);
    Modalidad_Controller.ingresar_modalidad(req.body)
        .then((resultados) => {
            console.info(resultados);
            res.send(resultados);
        })
        .catch((error) => {
            //console.info(error);
            res.status(400).send(error);
        })
});

module.exports = router; 