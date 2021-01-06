"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const VerificationSchema = new mongoose_1.Schema({
    mobileno: { type: String, required: true },
    pincode: { type: String, required: true }
}, {
    timestamps: true
});
VerificationSchema.pre('save', function (next) {
    let verificationInfo = this;
    verificationInfo.pincode = bcrypt_1.default.hashSync(verificationInfo.pincode, saltRounds);
    console.log("Before saving event", verificationInfo);
    next();
});
const verification = mongoose_1.model('verification', VerificationSchema);
exports.verification = verification;
