var express = require('express');
var router = express.Router();
var sponsorC = require('../controllers/Sponsor.c');


/* GET homeeeeeee page. */
router.get('/home', function(req, res, next) {
  res.render('sponsorsV', { title:sponsorC.getSponsors()});
});



/* GET SPONSORS */
router.get('/', function(req, res, next) {
    res.send(sponsorC.getSponsors());
  });
  

/*GET SPONSORS BY CATHEGORY*/

router.get('/ver-patrocinante/:cate', function(req, res,){
    res.send(sponsorC.byCategory(req.params.cate))
    console.log(req.params.cate)
});


  /*POST SPONSORS*/
  router.post('/anadir-patrocinante/:categoria', function(req, res, next) {
    let cate = req.params.categoria;
      sponsorC.addSponsor(cate,req.body)
      res.send(sponsorC.getSponsors());
    });


  module.exports = router;
  
  