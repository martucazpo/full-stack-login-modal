const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');
const gameRoutes = require('./game');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.use('/game', gameRoutes);

router.get('/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data.id;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id });
        }
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
    let id = req.body.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data.id;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            res.render('layouts/site/rest-of-site.ejs', { name, id, age, fci, user_id });
        }
    });
});

module.exports = router;