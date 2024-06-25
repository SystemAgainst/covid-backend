const ApiError = require('../errors/apiError');
const User = require("../models/user");

class UserController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, email, ticketNumber, passportData, flightTime, pcrTestTime } = req.body;

            if (!firstName || !lastName || !email || !ticketNumber || !passportData || !flightTime || !pcrTestTime) {
                return next(ApiError.badRequest("Обнаружены недостающие данные"));
            }

            // Валидация времени
            const flightTimeDate = new Date(flightTime);
            const pcrTestTimeDate = new Date(pcrTestTime);

            if (flightTimeDate - pcrTestTimeDate < 2 * 60 * 60 * 1000) {
                return next(ApiError.badRequest("Между временем вылета и сдачей ПЦР-теста должно быть минимум два часа"));
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                ticketNumber,
                passportData,
                flightTime: flightTimeDate,
                pcrTestTime: pcrTestTimeDate,
            });

            return res.status(201).json({ user });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }
}

module.exports = new UserController();
