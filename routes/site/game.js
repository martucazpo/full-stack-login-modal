const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');
const GamePlayer = require('../../models/GamePlayer');
const {
    ensureAuthenticated
} = require('../../passport/auth');


router.get('/game/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data._id;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            GamePlayer.findOne({ cat_id : id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        let player_id = data._id;
                        let score = data.score;
                        let times_played = data.times_played;
                        let games_played = data.games_played;
                        res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id, player_id, score, times_played, games_played });
                    } else if (!data) {
                        let gamePlayer = new GamePlayer({
                            cat_id : id,
                            user_id : user_id
                        });
                        gamePlayer.save((err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let player_id = data._id;
                                let score = data.score;
                                let times_played = data.times_played;
                                let games_played = data.games_played;
                                res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id, player_id, score, times_played, games_played });
                            }
                        });
                    }
                }
            });
        }
    });
});


router.post('/game/:id', ensureAuthenticated, (req, res) => {
    let id = req.body.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data._id;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            GamePlayer.findOne({ cat_id : id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        let player_id = data._id;
                        let score = data.score;
                        let times_played = data.times_played;
                        let games_played = data.games_played;
                        res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id, player_id, score, times_played, games_played });
                    } else if (!data) {
                        let gamePlayer = new GamePlayer({
                            cat_id : id,
                            user_id : user_id
                        });
                        gamePlayer.save((err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let player_id = data._id;
                                let score = data.score;
                                let times_played = data.times_played;
                                let games_played = data.games_played;
                                res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id, player_id, score, times_played, games_played });
                            }
                        });
                    }
                }
            });
        }
    });
});

router.get('/howTo/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data._id;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            res.render('layouts/site/how-to.ejs', { name, id, age, fci, user_id });
        }
    });
});


module.exports = router;