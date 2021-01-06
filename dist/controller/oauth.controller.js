"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthController = void 0;
const oauth_1 = require("../data/oauth");
const facebook_1 = __importDefault(require("../data/oauth/facebook"));
const mobilefacebook_1 = __importDefault(require("../data/oauth/mobilefacebook"));
const helper_1 = require("../helper/helper");
const verification_1 = require("../data/verification");
const sms_controller_1 = require("./sms.controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../helper/config");
class OauthController {
    facebookOauth(req, res, next) {
        let oauth = new oauth_1.Oauth(new facebook_1.default());
        oauth.signup(req.body).then((response) => {
            if (response.verified) {
                const payload = { id: response.userinfo._id };
                let token = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.secret}`);
                let refreshtoken = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.refreshsecret}`);
                res.json({ verified: response.verified, info: response.userinfo, accesstoken: token, refreshtoken: refreshtoken });
            }
            else {
                res.json(false);
            }
        }).catch(err => console.log(err));
    }
    mobilefacebookOauth(req, res, next) {
        let oauth = new oauth_1.Oauth(new mobilefacebook_1.default());
        return oauth.signup(req.body);
    }
    async checkIFFBExist(req, res, next) {
        const { fbdetails } = req.body;
        let oauth = new oauth_1.Oauth(new facebook_1.default());
        let info = await oauth.checkifexist(fbdetails.id);
        if (info) {
            const payload = { id: info._id };
            let token = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.secret}`);
            let refreshtoken = jsonwebtoken_1.default.sign(payload, `${config_1.jwtconfig.refreshsecret}`);
            res.json({ info: info, accesstoken: token, refreshtoken: refreshtoken });
        }
        else {
            res.json(null);
        }
    }
    addVerificationPincode(req, res, next) {
        const { mobilenumber } = req.body;
        let pincode = helper_1.generatePin(4);
        let savePinVerification = verification_1.verification.create(`+63${mobilenumber}`, pincode);
        if (savePinVerification)
            sms_controller_1.smsController.sendSMS(`+63${mobilenumber}`, `Code is ${pincode}`);
        res.json({ msg: savePinVerification });
    }
}
const oauthController = new OauthController();
exports.oauthController = oauthController;
