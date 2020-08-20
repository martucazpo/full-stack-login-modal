const router = require('express').Router();
const gameRoutes = require('./game');
const updateGameRoutes = require('./updateGame');

router.use('/game', gameRoutes);
router.use('/updateGame', updateGameRoutes);


module.exports = router;