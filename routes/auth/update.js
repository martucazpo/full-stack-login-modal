const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');
const User = require('../../models/User');

router.get('/name/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let name = data.name;
            let fci = data.favoriteCatImg
            res.render('layouts/updates/name.ejs', { name, id, fci });
        }
    });
});

router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {name: name} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id;
                    let user_id = data.user_id;
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    User.findByIdAndUpdate({ _id : user_id },{ $set: { name: name }}, { new: true }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let email = data.email;
                            res.render('layouts/profile/third-page.ejs', { name, email, id, age, user_id, fci });
                        }
                    });
                }
            });
        }
    });
});

router.get('/email/:id', (req, res)=> {
    let id = req.params.id;
    User.findById({ _id : id }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let id = data._id;
            let email = data.email;
            CatFancier.findOne({ user_id : id}, (err, data) =>{
                if (err) {
                    console.log(err)
                } else {
                    let fci = data.favoriteCatImg;
                    let cat_id = data._id;
        
                    res.render('layouts/updates/email.ejs', { cat_id, email, id, fci });
                }
            }); 
        }
    });
});

router.post('/email/:id', (req, res) => {
    let id = req.params.id;
    let email = req.body.email;
    User.findByIdAndUpdate({ _id : id }, { $set: {email : email} }, { new : true}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let email = data.email;
            let catId = data._id;
            CatFancier.findOne({ user_id : catId }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let user_id = data.user_id;
                    let id = data._id;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/profile/third-page.ejs', {
                        name, email, age, user_id, id, fci
                    });
                }
            });
        }
    });
});
    
router.get('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let age = data.age;
            let fci = data.favoriteCatImg;
            res.render('layouts/updates/age.ejs', { age, id, fci });
        }
    });
});

router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    let age = req.body.age;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {age: age} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let age = data.age;
                    let id = data._id;
                    let user_id = data.user_id;
                    let fci = data.favoriteCatImg;
                    User.findOne({ _id : user_id }, (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let email = data.email;
                            res.render('layouts/profile/third-page.ejs', { age, id, name, fci, email, user_id });
                        } 
                    }); 
                }
            }); 
        }
    });
});

router.get('/fci/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let fci = data.favoriteCatImg;
            res.render('layouts/updates/fci.ejs', { fci, id });
        }
    });
});


module.exports = router;