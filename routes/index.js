var express = require('express');
const mongojs = require("mongojs");
var router = express.Router();
var db = mongojs('mongodb://127.0.0.1:27017/footballData', ['users']);
var ObjectId = mongojs.ObjectId;


/* GET home page. */
router.get('/', function (req, res) {
    //res.sendFile('index.html', { root: 'public' });
    res.render('index', { title: 'Login' });
});

router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Sign up' });
})

router.get('/admin', function (req, res) {
    if (req.session.email == "admin@admin.eus") { res.render('admin', { title: 'Admin' }); }
    else { res.redirect("/") }
})

router.get('/logout', (req, res) => {
    console.log("sesion acabada")
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', function (req, res) {
    // if(req.session.email=="admin@admin.eus"){res.redirect("/admin")}
    // else{if(req.session.email!=undefined){
    //     res.sendFile("game.html",{root:'public'})
    // }}
    
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();


    if (errors) {
        console.log(errors)
    } else {
        db.users.find({ email: req.body.email }, (err, docs) => {
            if (err) {
                console.log(err)
            } else {
                admin = docs
                if (docs.length != 0) {
                    if (req.body.email == "admin@admin.eus" && req.body.password == "admin") {
                        req.session.email = req.body.email
                        console.log(req.session.email)
                        res.redirect("/admin")
                    } else {
                        if (req.body.email == admin[0].email && req.body.password == admin[0].password) {
                            req.session.email = req.body.email
                            res.sendFile('game.html', { root: 'public' });
                        } else {
                            res.send("Incorrecto")
                        }
                    }
                } else {
                    res.send("Usuario No Encontrado")
                }

            }
        })

    }

}
)

router.post('/signup', function (req, res) {
    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    } else {
        db.users.find({ email: req.body.email }, (err, docs) => {
            if (err) { console.log(err) } else {
                if (docs.length == 0) {
                    var firstname = req.body.firstname;
                    var lastname = req.body.lastname;
                    var email = req.body.email;
                    var password = req.body.password;
                    db.users.insertOne({ firstname: firstname, lastname: lastname, email: email, password: password }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        }
                    })
                } else {
                    res.send("Usuario Ya Ha Sido Registrado Previamente con ese Email")
                }
            }
        })
    }

})


// Admin routes
router.post('/api/v1/players', function (req, res) {
    if (req.session.email == "admin@admin.eus") {
        num = req.body.id
        num = parseInt(num)
        res.redirect("/api/v1/players/" + num)
    } else { res.redirect("/") }
})
router.get("/api/v1/players/:id", function (req, res) {
    if (req.session.email == "admin@admin.eus") {
        num = req.params.id
        num = parseInt(num)
        db.players.find({ id: num }, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log(docs[0])
                if (docs.length != 0) { res.render('read', { player: docs[0] }) }
                else { res.send("Player no Encontrado") }
            }
        })
    } else { res.redirect("/") }
})
router.post('/api/v1/delete', function (req, res) {
    // delete.ejs player from mongodb
    if (req.session.email == "admin@admin.eus") {
        num = parseInt(req.body.delete_id)

        res.redirect("/api/v1/delete/" + num)
    } else { res.redirect("/") }
})
router.get("/api/v1/delete/:id", function (req, res) {
    if (req.session.email == "admin@admin.eus") {
        console.log(req.params.id)
        id = parseInt(req.params.id)
        db.players.find({ id: id }, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                if (docs.length != 0) {
                    db.players.remove({ id: id }, (err) => {
                        if (err) {
                            console.log("Error al borrar")
                        } else {
                            res.render('admin', { title: 'Admin' });
                        }
                    })
                } else {
                    res.send("Player no Existente")
                }
            }
        })
    } else { res.redirect("/") }

})
router.post('/api/v1/add', function (req, res) {
    if (req.session.email == "admin@admin.eus") {
        db.players.find({ id: parseInt(req.body.ID) }, (err, docs) => {
            if (err) {
                console.log(err)
            } else {
                if (docs.length == 0) {
                    db.players.insertOne({ id: parseInt(req.body.ID), name: req.body.create_name, birthdate: req.body.birth_date, nationality: req.body.nationality, teamId: parseInt(req.body.teamID), position: req.body.position, number: parseInt(req.body.number), leagueId: parseInt(req.body.LeagueID) }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('admin', { title: 'Admin' });
                        }
                    })
                } else {
                    res.send("ERR: Ya añadido")
                }
            }
        })
    } else { res.redirect("/") }
})

router.post('/api/v1/update', function (req, res) {
    if (req.session.email == "admin@admin.eus") {
        db.players.findAndModify({
            query: { id: parseInt(req.body.ID) },
            update: { $set: { id: parseInt(req.body.ID), name: req.body.create_name, birthdate: req.body.birth_date, nationality: req.body.nationality, teamId: parseInt(req.body.teamID), position: req.body.position, number: parseInt(req.body.number), leagueId: parseInt(req.body.leagueID) } }
        },
            (err, docs) => {
                console.log("ok")
                console.log(docs)
                if (err) {
                    console.log(err)

                } else {
                    res.render('admin', { title: 'Admin' });
                }
            })
    } else { res.redirect("/") }
})



module.exports = router;
