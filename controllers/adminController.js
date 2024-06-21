const ApiError = require('../errors/apiError');
const User = require("../models/user");
const Admin = require('../models/admin');
const path = require('path');
const fs = require('fs');

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

