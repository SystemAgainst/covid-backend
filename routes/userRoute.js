const Router = require('express');
const multer = require('multer');
const path = require('path');
const router = new Router();
const controller = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get('/list', controller.getAll);
router.post('/create', controller.create);
router.patch('/upload/:id', upload.single('pdf'), controller.uploadPDF);

module.exports = router;
