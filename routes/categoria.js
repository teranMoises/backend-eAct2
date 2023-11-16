var express = require('express');
var router = express.Router();
const Categoria_Controller = require('../controllers/Categoria_Controller');

/* GET  */
router.get('/', function (req, res, next) {
    Categoria_Controller.ver_categorias().then((resultados) => {
        res.json(resultados);
    }).catch((error) => {
        res.status(500).send(error)
    })
});



router.get('/equipos/:index', function (req, res, next) {
    console.log('CAT ROUTER:', req.params.index, req.body);
    Categoria_Controller.ver_equipos_por_categoria(req.params.index, null).then((resultados) => {
        res.json(resultados);
    }).catch((error) => {
        res.status(500).send(error);
    })
});

router.get('/participantes', function (req, res, next) {
    console.log('CAT ROUTER:', req.params.index, req.body);
    Categoria_Controller.ver_equipos_por_categoria(null, req.body).then((resultados) => {
        res.json(resultados);
    }).catch((error) => {
        res.status(500).send(error);
    })
});



module.exports = router; 