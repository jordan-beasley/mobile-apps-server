var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('edit', { title: 'Edit' });
});

router.post('/', function(req, res, next){
    if(req.body.id.replace(/\s/g, '').length == 0 || req.body.title.replace(/\s/g, '').length == 0 || 
    req.body.genre.replace(/\s/g, '').length == 0 || req.body.body.replace(/\s/g, '').length == 0)
    {
        res.render('edit', { title: 'Edit' });
    }else{
        res.render('edit', { msgSuccess: { msg: "Thanks, we'll contact you as soon as possible." }, active_found: true, title: 'Edit'});
    }
});

module.exports = router;