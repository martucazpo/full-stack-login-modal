const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');
const GamePlayer = require('../../models/GamePlayer');
const gameRoutes = require('./game');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.use('/game', gameRoutes);


module.exports = router;