var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next){
//   res.render('index', {title: 'Arkansas Balloon', page: 'Home', active_home: true });
// });

var edit = require('../routes/edit');
router.use('/', edit);

var storiesApi = require('../routes/stories-api');
router.use('/stories-api', storiesApi);

// must be at the bottom, will take precedence over other views
router.get('*', function(req, res){
  res.render('error', {title: 'Error 404'});
});

module.exports = router;
