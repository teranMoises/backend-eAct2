var express = require('express');
var router = express.Router();

var modalidadController = require("../controllers/modalidadesControllers");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('modalidades', { title: 'Ingresar Modalidades' });
});

/* POST home page. */
router.post('/home', function(req, res, next) {
  console.log('en routes', req.body.nameMOD);
  let enviarOBJ = {"nombre": req.body.nameMOD};
  modalidadController.crear(enviarOBJ)
    .then(
      (resultados) => {
        console.info(resultados);
        res.send(resultados);
      }
    )
    .catch(
      (error) => {
        //console.info(error);
        res.status(400).send(error);
      }
    )
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  modalidadController.mostrar()
    .then((resultados) => {
      res.send(resultados);
    })
    .catch(
      (error) => {
        res.status(404).send(error);
      }
    )
});

router.post('/', function (req, res, next) {
  console.log('en routes', req.body);
  modalidadController.crear(req.body)
    .then(
      (resultados) => {
        console.info(resultados);
        res.send(resultados);
      }
    )
    .catch(
      (error) => {
        //console.info(error);
        res.status(400).send(error);
      }
    )
});

router.get('/categorias/:modalidad', function (req, res, next) {
  console.log('En GET CAT')
  modalidadController.mostrarCAT(req.params.modalidad)
    .then((resultados) => {
      res.send(resultados);
    })
    .catch(
      (error) => {
        res.status(404).send(error);
      }
    )
});

router.post('/categorias/:modalidad', function (req, res, next) {
  console.log('en routes', req.body);
  modalidadController.crearCAT(req.body, req.params.modalidad)
    .then(
      (resultados) => {
        console.info(resultados);
        res.send(resultados);
      }
    )
    .catch(
      (error) => {
        //console.info(error);
        res.status(400).send(error);
      }
    )
});

router.put('/categorias/:modalidad/:editar', function (req, res, next) {
  console.log('en routes', req.body);
  modalidadController.editarCAT(req.body, req.params.modalidad, req.params.editar)
    .then(
      (resultados) => {
        console.info(resultados);
        res.send(resultados);
      }
    )
    .catch(
      (error) => {
        //console.info(error);
        res.status(404).send(error);
      }
    )
});

router.delete('/categorias/:modalidad/:borrar', function (req, res, next) {
  console.log('en routes', req.body, req.params.modalidad, req.params.borrar);
  modalidadController.eliminarCAT(req.params.modalidad, req.params.borrar)
    .then(
      (resultados) => {
        console.info(resultados);
        res.send(resultados);
      }
    )
    .catch(
      (error) => {
        //console.info(error);
        res.status(404).send(error);
      }
    )
});

module.exports = router;
