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


module.exports = router; 