const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');

router.get('/list');
router.post('/add');

module.exports = router;