const router = require('express').Router();
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const updateRoutes = require('./update');

router.use('/auth', loginRoutes);
router.use('/new', registerRoutes);
router.use('/update', updateRoutes);

router.get('/', (req, res) => {
    res.render('layouts/site/portal');
});


module.exports = router;

