"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.authController = void 0;
const validator_1 = __importDefault(require("../helper/validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../model/user.model");
const config_1 = require("../helper/config");
const auth_1 = require("../data/auth");
const verification_1 = require("../data/verification");
const user_1 = require("../data/user");
const web_auth_1 = __importDefault(require("../data/auth/web.auth"));
const sms_controller_1 = require("./sms.controller");
const helper_1 = require("../helper/helper");
class AuthController {
    login(req, res, next) {
        const rules = {
            email: 'required|email',
            password: 'required|string'
        };
        validator_1.default(req.body, rules, {}).then(async (response) => {
            if (!response.status) {
                res.json(response.err);
            }
            else {
                try {
                    const { email, password } = req.body;
                    let authenticate = await auth_1.auth.login({ email: email, password: password }, new web_auth_1.default());
                    console.log(authenticate);
                    res.json(authenticate);
                }
                catch ({ status, msg }) {
                    res.status(status).json({ msg: msg });
                }
            }
        });
    }
    mobilelogin(req, res, next) {
        const { mobilenumber } = req.body;
        auth_1.auth.getUser(`+63${mobilenumber}`)
            .then(async (userinfo) => {
            let pincode = helper_1.generatePin(4);
            if (!userinfo) {
                user_1.user.create({
                    fullname: '',
                    password: pincode,
                    usertype: 1,
                    contactno: `+63${mobilenumber}`,
                    lastpincode: pincode
                });
            }
            let savePinVerification = verification_1.verification.create(`+63${mobilenumber}`, pincode);
            if (savePinVerification)
                sms_controller_1.smsController.sendSMS(`+63${mobilenumber}`, `Code is ${pincode}`);
            res.json({ data: userinfo, pin: pincode });
        })
            .catch(err => res.status(err.response.status).json(err));
    }
    async initializeInfo(req, res, next) {
        let userinfo = await req.user;
        const { fullname, address } = req.body;
        let updateinfo = await user_1.user.update({ fullname: fullname, address: address, idno: userinfo._id });
        res.json(updateinfo);
    }
    requestNewPin(req, res, next) {
        const { mobilenumber } = req.body;
        let pincode = helper_1.generatePin(4);
        let savePinVerification = verification_1.verification.create(`+63${mobilenumber}`, pincode);
        if (savePinVerification)
            sms_controller_1.smsController.sendSMS(`+63${mobilenumber}`, `Code is ${pincode}`);
        res.json({ msg: savePinVerification });
    }
    verifyPin(req, res, next) {
        const { pin, mobileno } = req.body;
        if (verification_1.verification.verifyPinCode(`+63${mobileno}`, pin))
            console.log("OK");
        verification_1.verification.verifyPinCode(`+63${mobileno}`, pin)
            .then(async (response) => {
            let token = null;
            let refreshtoken = null;
            let userinfo = null;
            if (response) {
                userinfo = await auth_1.auth.getUser(`+63${mobileno}`);
                const payload = { id: userinfo._id };
                token = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.secret}`);
                refreshtoken = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.refreshsecret}`);
            }
            res.json({ pincodecheck: response, info: userinfo, accesstoken: token, refreshtoken: refreshtoken });
        })
            .catch(err => console.log(err));
    }
    logout(req, res, next) {
        console.log("USER LOGOUT");
        res.json({ msg: "USER LOGOUT" });
    }
    refreshtoken(req, res, next) {
        const { refreshtoken } = req.body;
        if (refreshtoken == null)
            return res.status(401).json({ msg: "Refresh token is required" });
        jsonwebtoken_1.default.verify(refreshtoken, `${config_1.jwtconfig.refreshsecret}`, async (err, userData) => {
            if (err)
                res.sendStatus(403).json(err);
            const payload = { id: userData.id };
            const token = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.secret}`, { expiresIn: '10s' });
            const refreshtoken = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.refreshsecret}`, { expiresIn: '20s' });
            const userinfo = await user_model_1.user.findOne({ _id: payload.id }).select('-oauth');
            res.json({
                accessToken: token,
                refreshToken: refreshtoken,
                userinfo: userinfo,
            });
        });
    }
}
exports.AuthController = AuthController;
const authController = new AuthController();
exports.authController = authController;
