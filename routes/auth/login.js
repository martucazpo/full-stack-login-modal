const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const {
    ensureAuthenticated
} = require('../../passport/auth');

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
            let id = data._id;
            res.redirect(`/profile/landing/${id}`);
        }
    });

});



router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});



module.exports = router;