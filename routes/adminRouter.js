const Router = require('express');
const router = new Router();
const controller = require('../controllers/adminController');

router.get('/list', controller.getAll);

module.exports = router;