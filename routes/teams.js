var express = require('express');
var router = express.Router();
var team_controller = require('../controllers/team.c');

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('teamV', { title: 'teamHomes' , datos: team_controller.showTeams()});
});

/* POST home page. */
router.post('/home', function(req, res, next) {
  res.send(team_controller.showTeams());
});


/* GET Teams */
router.get('/', function (req, res, next) {
  res.send(team_controller.showTeams());
});

/* GET Teams AND Categories */
router.get('/participantes', function (req, res, next) {
  res.send(team_controller.showTeamsCAT());
});

/*POST TEAMS*/
router.post('/', function (req, res, next) {
  let reqController = team_controller.addTeam(req.body)
  if (reqController == "Error: faltan datos") {
    res.status(400).send(reqController);
  } else {
    res.send(reqController);
  }

});

/*PUT TEAMS*/
router.put('/', function (req, res, next) {
  let reqController = team_controller.putTeam(req.body)
  if (reqController == "Error: faltan datos") {
    res.status(400).send(reqController);
  } else {
    res.send(reqController);
  }
});

/*DELETE TEAMS*/
router.delete('/delete/:id', function (req, res, next) {
  let uID = req.params.id
  team_controller.delTeam(uID)
  res.send(team_controller.showTeams())
});

/*DELETE CATEGORY OF TEAMS*/
router.delete('/participantes/delete/:team/:id', function (req, res, next) {
  let catID = req.params.id;
  let teamID = req.params.team;
  res.send(team_controller.delTeamCAT(catID, teamID));
});

module.exports = router;

