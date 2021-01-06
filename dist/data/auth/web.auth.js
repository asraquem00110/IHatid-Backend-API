"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../model/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../helper/config");
class WebAuth {
    login(data) {
        return new Promise(async (res, rej) => {
            const { email, password } = data;
            const userinfo = await user_model_1.user.findOne({ email: email }).select('-oauth');
            if (!userinfo)
                rej({ status: 500, msg: "No User Found" });
            let passwordcheck = await bcrypt_1.default.compareSync(password, userinfo.password);
            if (passwordcheck) {
                const payload = { id: userinfo._id };
                const token = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.secret}`);
                const refreshtoken = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.refreshsecret}`);
                res({
                    accessToken: token,
                    refreshToken: refreshtoken,
                    userinfo: userinfo,
                });
            }
            else {
                rej({ status: 500, msg: "Password is incorrect" });
            }
        });
    }
    logout() {
    }
}
exports.default = WebAuth;
