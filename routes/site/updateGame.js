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
            GamePlayer.findOne({ cat_id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let timesPlayed = data.times_played;
                    let gamesPlayed = data.games_played;
                    let id = data.cat_id;
                    res.render('layouts/site/times-played.ejs', {
                        name, fci, id, gamesPlayed, timesPlayed
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