const router = require('express').Router();
const siteRoutes = require('./site');
const profileRoutes = require('./profile');
const authRoutes = require('./auth');

router.use('/restOfSite', siteRoutes);
router.use('/profile', profileRoutes);
router.use('/', authRoutes);


module.exports = router;