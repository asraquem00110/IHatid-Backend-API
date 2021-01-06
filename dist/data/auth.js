"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.auth = void 0;
const user_model_1 = require("../model/user.model");
class Auth {
    login(data, auth) {
        return auth.login(data);
    }
    logout(auth) {
        return auth.logout();
    }
    refreshtoken() {
    }
    async getUser(mobilenumber) {
        let user = await user_model_1.user.findOne({ contactno: mobilenumber });
        return user;
    }
}
exports.Auth = Auth;
let auth = new Auth();
exports.auth = auth;
