const router = require('express').Router();
const GamePlayer = require('../../models/GamePlayer');
const CatFancier = require('../../models/CatFancier');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.get('/getTimesPlayed/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id : id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            GamePlayer.findOne({ cat_id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else if (data) {
                    let timesPlayed = data.times_played;
                    let gamesPlayed = data.games_played;
                    let id = data.cat_id;
                    res.render('layouts/site/times-played.ejs', {
                        name, fci, id, gamesPlayed, timesPlayed
                    });
                } else if (!data) {
                    let gamePlayer = new GamePlayer({
                        cat_id : id,
                        user_id : user_id
                    });
                    gamePlayer.save((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let timesPlayed = 0;
                            let gamesPlayed = 0;
                            res.render('layouts/site/times-played.ejs', { name, id, fci, timesPlayed, gamesPlayed });
                        }
                    });
                }
            });
        }
    });
});

router.post('/updateScore/:id', ensureAuthenticated,(req, res) => {
    let playerId = req.params.id;
    let newScore = req.body.score;
    GamePlayer.findByIdAndUpdate({ _id : playerId }, { $set:{ score : newScore } }, { new: true }, (err,data) => {
        if (err) {
            console.log(err);
        } else {
            let cat_id = data.cat_id;
            res.redirect('/restOfSite/game/game/' + cat_id);
        }
    });
});

router.post('/updateTimesPlayed/:id', ensureAuthenticated, (req, res) => {
    let playerId = req.params.id;
    let timesPlayed = req.body.timesPlayed;
    GamePlayer.findByIdAndUpdate({ _id : playerId }, { $set:{ times_played : timesPlayed } }, { new: true }, (err,data) => {
        if (err) {
            console.log(err);
        } else {
            let cat_id = data.cat_id;
            res.redirect('/restOfSite/game/game/' + cat_id);
        }
    });
});

router.post('/updateGamesPlayed/:id', ensureAuthenticated, (req, res) => {
    let playerId = req.params.id;
    let gamesPlayed = req.body.gamesPlayed;
    GamePlayer.findByIdAndUpdate({ _id : playerId }, { $set:{ games_played : gamesPlayed } }, { new: true }, (err,data) => {
        if (err) {
            console.log(err);
        } else {
            let cat_id = data.cat_id;
            res.redirect('/restOfSite/game/game/' + cat_id);
        }
    });
});



module.exports = router;