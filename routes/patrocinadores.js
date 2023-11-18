var express = require('express');
var router = express.Router();
const Patrocinador_Controller = require('../controllers/Patrocinador_Controller');

/* GET user. */

router.get('/', function(req, res, next){
   Patrocinador_Controller.ver_patrocinador().then((resultados)=>{
      res.json(resultados);
   }).catch((error)=>{
      res.status(500).send(error)
   })
}); 

/* POST */

router.post('/', function (req, res, next) {
   if(req.body.idPatrocinio == 5){  
      if(req.body.idEquipo != ""){
         Patrocinador_Controller.ingresar_patrocinador(req.body).then((resultado)=>{
            Patrocinador_Controller.ingresar_padrino(resultado).then(()=>{
               Patrocinador_Controller.ver_patrocinador().then((resultados)=>{
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
      }else{
         res.status(500).send("Para ser un padrino debe de patrocinar algún equipo")
      }
  }else{
      Patrocinador_Controller.ingresar_patrocinador(req.body).then(()=>{
         Patrocinador_Controller.ver_patrocinador().then((resultados)=>{
            res.json(resultados);
         }).catch((error)=>{
            res.status(500).send(error)
         })
      }).catch((error)=>{
         res.status(500).send(error)
      })
  }
}); 

/* DELETE */

router.delete('/:index', function (req ,res , next) {
   Patrocinador_Controller.eliminar_patrocinador(req.params.index).then(()=>{
      res.json();
   }).catch((error)=>{
      res.status(500).send(error)
   })
})


/* VIEWS */

router.get('/nuevoPatrocinador',function(req, res, next){
   Patrocinador_Controller.ver_patrocinios().then((resultados)=>{
      let patrocinios = resultados;
      res.render('nuevoPatrocinador',{title: 'Crear un Patrocinador', patrocinios: patrocinios});
      //console.log(resultados)
   }).catch((error)=>{
      res.status(500).send(error)
   })
})   

router.post('/nuevoPatrocinador', function (req, res, next) {
   Patrocinador_Controller.ingresar_patrocinador(req.body).then(()=>{
      Patrocinador_Controller.ver_patrocinador().then((resultados)=>{
         res.send(resultados);
      }).catch((error)=>{
         res.status(500).send(error)
      })
   }).catch((error)=>{
      res.status(500).send(error)
   })
}); 

module.exports = router; 