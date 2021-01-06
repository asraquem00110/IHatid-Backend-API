"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.userController = void 0;
const user_1 = require("../data/user");
class UserController {
    create() {
    }
    async read(req, res, next) {
        let data = await user_1.user.read();
        res.json(data);
    }
    async list(req, res, next) {
        let { type, page, row } = req.params;
        console.log(req.params);
        let data = await user_1.user.list(+type, +page, +row);
        res.json(data);
    }
    update() {
        return new Promise((res, rej) => {
        });
    }
    delete() {
        return new Promise((res, rej) => {
        });
    }
    async get(req, res, next) {
        let info = await user_1.user.get(req.params.idno);
        res.json(info);
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.userController = userController;
