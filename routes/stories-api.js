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
      
        con.query('SELECT * FROM GenreView', function(err, result, fields){
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
            con.query('CALL getHome (?)', [req.query.userId], function(err, result, fields){
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
            var uid = (req.query.userId != null) ? req.query.userId : -1;
            con.query('CALL getStory (?, ?)', [uid, req.query.storyId], function(err, result, fields){
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

router.get('/getStoriesByAuthor', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.authorId)
        {
            var uid = (req.query.userId != null) ? req.query.userId : -1;
            con.query('CALL getStoriesByAuthor (?, ?)', [uid, req.query.authorId], function(err, result, fields){
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

router.get('/getAuthorShelf', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.authorId)
        {
            var uid = (req.query.userId != null) ? req.query.userId : -1;
            con.query('CALL getAuthorShelf (?, ?)', [uid, req.query.authorId], function(err, result, fields){
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


router.get('/searchStory', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.qry)
        {
            var uid = (req.query.userId != null) ? req.query.userId : -1;
            if(req.query.genreId)
            {
                con.query('CALL searchStoryByGenre (?, ?, ?)', [uid, req.query.qry, req.query.genreId], function(err, result, fields){
                    if(err) throw err;
    
                    res.json(result[0]);
    
                });
            }
            else
            {
                con.query('CALL searchStory (?, ?)', [uid, req.query.qry], function(err, result, fields){
                    if(err) throw err;
    
                    res.json(result[0]);
    
                });
            }
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
        if(req.query.authorId)
        {
            var uid = (req.query.userId != null) ? req.query.userId : -1;
            con.query('CALL getProfile (?, ?)', [uid, req.query.authorId], function(err, result, fields){
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
            con.query('SELECT * FROM AuthorView WHERE id = ?', [req.query.userId], function(err, result, fields){
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

router.get('/saveStory', function(req, res, next){
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

router.get('/likeStory', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId && req.query.storyId)
        {
            con.query('CALL likeStory (?,?)', [req.query.userId, req.query.storyId], function(err, result, fields){
                if(err) throw err;

                res.json({});

            });
        }
        else
        {
            res.json({});
        }
    });
});

router.get('/bookmarkStory', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId && req.query.storyId)
        {
            con.query('CALL bookmarkStory (?,?)', [req.query.userId, req.query.storyId], function(err, result, fields){
                if(err) throw err;

                res.json({});

            });
        }
        else
        {
            res.json({});
        }
    });
});

router.get('/followAuthor', function(req, res, next){
    var con = mysql.createConnection({host: process.env.SQL_HOST, user: process.env.SQL_USER, password: process.env.SQL_PASS, database: process.env.SQL_DB});
  
    con.connect(function(err){
        if(err) throw err;
        if(req.query.userId && req.query.authorId && req.query.userId != req.query.authorId)
        {
            con.query('CALL followAuthor (?,?)', [req.query.userId, req.query.authorId], function(err, result, fields){
                if(err) throw err;

                res.json({});
            });
        }
        else
        {
            res.json({});
        }
    });
});

module.exports = router;