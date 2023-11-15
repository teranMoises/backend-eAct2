var express = require('express');
var router = express.Router();
const Patrocinador_Controller = require('../controllers/Patrocinador_Controller');

/* GET user. */

/* router.get('/nuevoPatrocinador',function(req, res, next){
   res.render('nuevoPatrocinador',{title: 'Crear un Patrocinador'});
})  
 */
router.get('/', function(req, res, next){

}); 



/* router.post('/nuevoPatrocinador', function (req, res, next) {
   let ver = Patrocinador_Controller.ingresar_patrocinador_views(req.body)
   res.status(200).send(ver)
}); */

module.exports = router; 