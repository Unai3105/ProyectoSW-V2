var express = require('express');
const mongojs = require("mongojs");
var router = express.Router();
var db = mongojs('footballdata', ['users']);
var ObjectId = mongojs.ObjectId;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('index.html', {root: 'public'});
});

router.get('/login', function (req, res, next) {
    res.render('index', {title: 'Login'});
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {title: 'Sign up'});
})

router.get('/admin', function (req, res, next) {
    res.render('admin', {title: 'Admin'});
})

router.post('/login', function (req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();


    if (errors) {
        console.log(errors)
    } else {
        var admin = db.users.find({email: 'admin@admin.eus'});

        if (req.body.email === admin.email && req.body.password === admin.password) {
            res.redirect('/admin');
        } else {
            res.render('index', {title: 'Login'});
        }
    }
})

router.post('/signup', function (req, res, next) {
    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    } else {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        db.users.insertOne({firstname: firstname, lastname: lastname, email: email, password: password}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        })
}})


// Admin routes
router.post('/api/v1/players:id', function (req, res, next) {
    db.players.find({id: req.body.id}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.render('read', {players: docs,}
            )
        }
    })
})

router.delete('/api/v1/delete', function (req, res, next) {
    // delete.ejs player from mongodb
    db.players.remove({id: req.body.id}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    })
})

router.post('/api/v1/create', function (req, res, next) {
    let birth = {date: req.body.birth_date, place: req.body.birth_place, country: req.body.birth_country}
    db.players.insertOne({name: req.body.name, firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age, birth: birth, nationality: req.body.nationality, height: req.body.height, weight, req.body.weight, injured: req.body.injured}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    })
})

router.put('/api/v1/update', function (req, res, next) {

})



module.exports = router;
