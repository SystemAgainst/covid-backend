const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const multer = require('multer');

// Настройка multer для загрузки PDF-файлов
const upload = multer({
    dest: 'uploads/', // Папка, куда будут сохраняться файлы
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF files are allowed.'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10 // Ограничение на размер файла (10 MB)
    }
});

router.get('/list', controller.getAll);
router.post('/create', controller.create);
router.post('/:id/upload', upload.single('pdf'), controller.uploadPDF);

module.exports = router;
