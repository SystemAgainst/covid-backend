const ApiError = require('../errors/apiError');
const User = require("../models/user");

class UserController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, email, ticketNumber } = req.body;

            if (!email) {
                return next(ApiError.badRequest("Обнаружены недостающие данные"));
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                ticketNumber,
            });

            return res.status(201).json({ user });

        } catch (error) {
            console.error(error);
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }
}

module.exports = new UserController();
