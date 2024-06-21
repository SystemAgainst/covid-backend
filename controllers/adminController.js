const ApiError = require('../errors/apiError');
const User = require("../models/user");
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
}

module.exports = new AdminController();

