"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../model/user.model");
const verification_1 = require("../verification");
class FacebookOauth {
    signup(data) {
        return new Promise(async (res, rej) => {
            let response = await verification_1.verification.verifyPinCode(`+63${data.mobileno}`, data.pin);
            let userinfo;
            if (response) {
                userinfo = await user_model_1.user.findOne({ contactno: `+63${data.mobileno}` });
                if (userinfo) {
                    userinfo.oauth.facebook.id = data.fbdetails.id;
                    userinfo.oauth.facebook.accesstoken = data.fbdetails.accesstoken;
                    userinfo.fullname = data.fbdetails.name;
                    userinfo.address = data.fbdetails.address;
                    userinfo.picture = data.fbdetails.picture;
                    userinfo.status = 1;
                    userinfo.email = data.fbdetails.email;
                }
                else {
                    userinfo = new user_model_1.user({
                        'oauth.facebook.id': data.fbdetails.id,
                        'oauth.facebook.accesstoken': data.fbdetails.accesstoken,
                        'fullname': data.fbdetails.name,
                        'address': data.fbdetails.address,
                        'picture': data.fbdetails.picture,
                        'status': 1,
                        'usertype': 1,
                        'password': data.pin,
                        'contactno': `+63${data.mobileno}`,
                        'email': data.fbdetails.email,
                    });
                }
                userinfo.save();
            }
            res({ verified: response, userinfo: userinfo });
        });
    }
    checkifexist(fbid) {
        return new Promise(async (res, rej) => {
            try {
                let info = await user_model_1.user.findOne({ 'oauth.facebook.id': fbid });
                res(info);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.default = FacebookOauth;
