const Router = require('express');
const router = new Router();
const controller = require('../controllers/adminController');

router.get('/list', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/auth', controller.login);

module.exports = router;