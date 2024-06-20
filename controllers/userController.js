const { User, TestResult, Request } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, ticketNumber } = req.body;
    try {
        const user = await User.create({ firstName, lastName, email, ticketNumber });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

exports.uploadPDF = upload.single('pdf');

exports.uploadPDFHandler = async (req, res) => {
    const { userId } = req.body;
    const pdfPath = req.file.path;
    try {
        const testResult = await TestResult.create({ userId, pdfPath });
        res.status(201).json(testResult);
    } catch (error) {
        res.status(500).json({ error: 'Error uploading PDF' });
    }
};

exports.requestTest = async (req, res) => {
    const { userId } = req.body;
    try {
        const request = await Request.create({ userId, status: 'pending' });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Error requesting test' });
    }
};
