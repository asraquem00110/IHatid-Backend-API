"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth = void 0;
class Oauth {
    constructor(ioauth) {
        this.oauth = ioauth;
    }
    signup(data) {
        return this.oauth.signup(data);
    }
    checkifexist(id) {
        return this.oauth.checkifexist(id);
    }
}
exports.Oauth = Oauth;
