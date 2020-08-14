const router = require('express').Router();
const profileRoutes = require('./profile');

router.use('/', profileRoutes);

module.exports = router;