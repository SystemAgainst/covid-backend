const Router = require('express');
const router = new Router();
const controller = require('../controllers/adminController');

router.get('/list', controller.getAll);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.updateStatus);
router.post('/auth', controller.login);
router.post('/create', controller.create);

module.exports = router;