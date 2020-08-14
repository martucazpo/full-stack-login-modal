const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const CatFancier = require('../../models/CatFancier');
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
            let email = data.email;
            CatFancier.findOne({ user_id : userId }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (!data || data === undefined){
                        res.redirect(`/profile/landing/${userId}`);
                    } else {
                        let name = data.name;
                        let age = data.age;
                        let user_id = data.user_id;
                        let fci = data.favoriteCatImg;
                        let id = data._id;
                        res.render('layouts/site/rest-of-site.ejs', { name, age, email, user_id, fci, id,})
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