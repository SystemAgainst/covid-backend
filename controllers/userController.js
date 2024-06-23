const ApiError = require('../errors/apiError');
const User = require("../models/user");
const path = require('path');
const fs = require('fs');

class UserController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, email, ticketNumber, passportData } = req.body;

            if (!email) {
                return next(ApiError.badRequest("Обнаружены недостающие данные"));
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                ticketNumber,
                passportData,
            });

            return res.status(201).json({ user });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }

    async uploadPDF(req, res, next) {
        try {
            const userId = req.params.id;
            const file = req.file;

            if (!file) {
                return next(ApiError.badRequest('No file uploaded or invalid file type.'));
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return next(ApiError.badRequest('User not found.'));
            }

            // Ensure the uploads directory exists
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            user.pdfPath = path.join('uploads', file.filename);
            await user.save();

            res.status(201).send('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            return next(ApiError.internal('An error occurred while uploading the file.'));
        }
    }
}

module.exports = new UserController();

