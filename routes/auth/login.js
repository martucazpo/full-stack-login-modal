const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const CatFancier = require('../../models/CatFancier');
const GamePlayer = require('../../models/GamePlayer');
const {
    ensureAuthenticated
} = require('../../passport/auth');


router.get('/login', (req, res) => {
    res.render('layouts/login/login');
});

//login now handled by passport.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/auth/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});


router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    userId = req.user.id
    await User.findById({
        _id: userId
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let userId = data._id;
           // let email = data.email;
            CatFancier.findOne({ user_id : userId }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (!data || data === undefined){
                        res.redirect(`/profile/landing/${userId}`);
                    } else {
                        let user_id = data.user_id;
                        let id = data._id;
                        GamePlayer.findOne({ cat_id : id }, (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (data) {
                                    cat_id = data.cat_id;
                                    res.redirect('/restOfSite/game/game/' + cat_id);
                                } else if (!data) {
                                    let gamePlayer = new GamePlayer({
                                        cat_id : id,
                                        user_id : user_id
                                    });
                                    gamePlayer.save((err, data) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            let cat_id = data.cat_id;
                                            res.redirect('/restOfSite/game/game/' + cat_id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }); 
        }
    });

});



router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});



module.exports = router;