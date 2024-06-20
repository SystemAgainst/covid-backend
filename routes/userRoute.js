const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');

router.get('/list');
router.post('/create', controller.create);

module.exports = router;