"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const UserSchema = new mongoose_1.Schema({
    email: { required: false, type: String, unique: false, default: null },
    fullname: { required: false, type: String, default: '' },
    address: { type: String, default: null },
    contactno: { type: String, default: null },
    oauth: {
        facebook: {
            accesstoken: { type: String, default: null },
            accessexpirationTime: { type: Number, default: null },
            refreshtoken: { type: String, default: null },
            refreshexpirationTime: { type: Number, default: null },
            updatedAt: { type: Date, default: new Date() },
            id: { type: String, default: null }
        },
        google: {
            accesstoken: { type: String, default: null },
            accessexpirationTime: { type: Number, default: null },
            refreshtoken: { type: String, default: null },
            refreshexpirationTime: { type: Number, default: null },
            updatedAt: { type: Date, default: new Date() },
            id: { type: String, default: null }
        },
    },
    password: { type: String, default: null },
    pushnotiftoken: { type: String, default: null },
    usertype: { type: Number, default: 2 },
    locations: [{ latitude: { type: Number, default: 0 }, longitude: { type: Number, default: 0 }, place: { type: String, default: null } }],
    status: { type: Number, default: 0 },
    lastpincode: { type: String, default: '0000' },
    picture: { type: String, default: null },
    motorcyle: {
        motorcycle: { type: String, default: null },
        description: { type: String, default: null },
        plateno: { type: String, default: null },
        registrationNo: { type: String, default: null },
    }
}, {
    timestamps: true
});
UserSchema.pre('save', function (next) {
    let userinfo = this;
    userinfo.password = bcrypt_1.default.hashSync(userinfo.password, saltRounds);
    next();
});
const user = mongoose_1.model("user", UserSchema);
exports.user = user;
