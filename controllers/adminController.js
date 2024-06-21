const ApiError = require('../errors/apiError');
const User = require("../models/user");
const Admin = require('../models/admin');

class AdminController {
    async getAll(req, res, next) {
        try {
            const userList = await User.findAndCountAll({});

            if (!userList) {
                return next(ApiError.internal("Нет клиентов"));
            }

            res.status(201).json(userList);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findOne({
                where: { id },
            });

            if (!user) {
                return next(ApiError.badRequest("Не найден пользователь"));
            }

            res.status(201).json(user);
        } catch (e) {
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }

    async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return next(ApiError.badRequest("Статус не указан"));
            }

            const user = await User.findOne({
                where: { id },
            });

            if (!user) {
                return next(ApiError.badRequest("Не найден пользователь"));
            }

            user.status = status;
            await user.save();

            res.status(200).json({ message: "Статус обновлен", user });
        } catch (e) {
            console.error(e);
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest("Нет почты или пароля"));
            }

            if (email !== "admin@bk.ru" || password !== "admin") {
                return next(ApiError.badRequest("Неверные данные при авторизации"));
            }

            const existingAdmin = await Admin.findOne({ where: { email } });
            if (existingAdmin) {
                return next(ApiError.badRequest("Администратор с таким email уже существует"));
            }

            const admin = await Admin.create({
                email,
                password,
            });

            return res.status(201).json({ admin });

        } catch (e) {
            return next(ApiError.internal("Непредвиденная ошибка"));
        }
    }
}

module.exports = new AdminController();

