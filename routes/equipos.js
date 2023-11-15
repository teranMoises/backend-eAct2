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


/* POST */
router.post('/', function(req, res, next){
    Equipos_Controller.ingresar_equipo(req.body).then(()=>{
        Equipos_Controller.ver_equipos().then((resultados)=>{
            let idDeEquipo = resultados[resultados.length -1].id_equipo
            Equipos_Controller.ingresar_inscripcion(req.body, idDeEquipo).then((resultados)=>{
                Equipos_Controller.ver_equipos().then((resultados)=>{
                    res.json(resultados);
                }).catch((error)=>{
                    res.status(500).send(error)
                })
            }).catch((error)=>{
                res.status(500).send(error)
            }) 
        }).catch((error)=>{
            res.status(500).send(error)
        }) 
    }).catch((error)=>{
        res.status(500).send(error)
    })
});


module.exports = router; 