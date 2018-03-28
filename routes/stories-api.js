var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv/config');

router.get('/login', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.username && req.query.pass)
        {
            con.query('CALL login (?,?)', [req.query.username, req.query.pass], function(err, result, fields){
                if(err) throw err;

                var rows = result[0][0];
                res.json(rows);

            });
        }
        else
        {
            res.json({
                username: '',
                userId: -1
            });
        }
    });

});

router.get('/signup', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.username && req.query.email && req.query.pass)
        {
            con.query('CALL signup (?,?,?)', [req.query.username, req.query.email, req.query.pass], function(err, result, fields){
                if(err) throw err;

                var rows = result[0][0];
                res.json(rows);

            });
        }
        else
        {
            res.json({
                username: '',
                userId: -1
            });
        }
    });

});

router.get('/getGenres', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
      
        con.query('SELECT * FROM getGenres', function(err, result, fields){
            if(err) throw err;
            
            res.json(result);
        });
    });

});

router.get('/getHome', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});

    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId)
        {
            con.query('CALL gethome (?)', [req.query.userId], function(err, result, fields){
                if(err) throw err;

                res.json(result[0]);

            });
        }
        else
        {
            res.json([{}]);
        }
    });

});

router.get('/getStory', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.storyId)
        {
            con.query('SELECT * FROM getStory WHERE id = ?', [req.query.storyId], function(err, result, fields){
                if(err) throw err;

                res.json(result[0]);

            });
        }
        else
        {
            res.json({});
        }
    });

});

router.get('/getProfile', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId)
        {
            con.query('SELECT * FROM getProfile WHERE id = ?', [req.query.userId], function(err, result, fields){
                if(err) throw err;

                res.json(result[0]);

            });
        }
        else
        {
            res.json({});
        }
    });

});

router.get('/getAuthor', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId)
        {
            con.query('SELECT * FROM getAuthor WHERE id = ?', [req.query.userId], function(err, result, fields){
                if(err) throw err;

                res.json(result[0]);

            });
        }
        else
        {
            res.json({});
        }
    });
});

router.post('/saveStory', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId && req.query.title && req.query.body && req.query.genreId)
        {
            con.query('CALL savestory (?,?,?,?)', [req.query.userId, req.query.title, req.query.body, req.query.genreId], function(err, result, fields){
                if(err) throw err;

                res.json(result[0][0]);

            });
        }
        else
        {
            res.json({});
        }
    });
});

module.exports = router;