"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = exports.verification = void 0;
const verification_model_1 = require("../model/verification.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Verification {
    create(mobileno, pincode) {
        let verifiedPin = new verification_model_1.verification({
            mobileno: mobileno,
            pincode: pincode
        });
        verifiedPin.save();
        return verifiedPin;
    }
    async verifyPinCode(mobileno, pincode) {
        let latestcode = await verification_model_1.verification.findOne({
            mobileno: mobileno
        }).sort({ _id: -1 });
        let pincheck = await bcrypt_1.default.compareSync(pincode, latestcode.pincode);
        return pincheck;
    }
}
exports.Verification = Verification;
let verification = new Verification();
exports.verification = verification;
