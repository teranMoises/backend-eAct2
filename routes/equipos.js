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
    Equipos_Controller.ingresar_equipo(req.body).then((inscripcion)=>{
        Equipos_Controller.ingresar_inscripcion(inscripcion).then(()=>{
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
});

/* DELETE */
router.delete('/:index',function(req, res, next){
    Equipos_Controller.eliminar_equipo(req.params.index).then(()=>{
        res.json();
    }).catch((error)=>{
        res.status(500).send(error)
    }) 
});  


/*Ver padrinos*/
router.get('/padrinos', function (req, res, next) {
    Equipos_Controller.ver_padrinos().then((resultados)=>{
        res.json(resultados);
    }).catch((error)=>{
        res.status(500).send(error)
    })
});

router.delete('/sin_categoria/:index/:index2',function(req, res, next){
    Equipos_Controller.eliminar_categoria_inscrita(req.params.index, req.params.index2).then(()=>{
        res.json();
    }).catch((error)=>{
        res.status(500).send(error)
    }) 
});  
module.exports = router; 

/*Editar equipo*/
router.put('/editar_equipo/:editar', function (req, res, next) {
    Equipos_Controller.editar_equipo(req.params.editar, req.body)
        .then((resultados) => {
            res.send(resultados);
        })
        .catch((error) => {
            res.status(404).send(error);
        })
        console.table(req.body)
});