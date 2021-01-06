"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
const user_model_1 = require("../model/user.model");
const validator = (body, rules, customMessages) => {
    return new Promise((resolve, reject) => {
        try {
            const validation = new validatorjs_1.default(body, rules, customMessages);
            validation.passes(() => resolve({ err: null, status: true }));
            validation.fails(() => resolve({ err: validation.errors, status: false }));
        }
        catch (err) {
            reject(err);
        }
    });
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./;
validatorjs_1.default.register('strict', (value) => passwordRegex.test(value), 'password must contain at least one uppercase letter, one lowercase letter and one number');
validatorjs_1.default.registerAsync('unique', async (value, attribute, req, passes) => {
    if (!attribute)
        throw new Error('Specify Requirements i.e fieldName: unique:table,column');
    let attArr = attribute.split(",");
    if (attArr.length !== 2)
        throw new Error(`Invalid format for validation rule on ${attribute}`);
    const { 0: table, 1: column } = attArr;
    let msg = (column == "email") ? `${column} has already been taken ` : `${column} already in use`;
    let admin = await user_model_1.user.findOne({
        email: value
    });
    admin ? passes(false, msg) : passes(true);
}, "Sample Message");
exports.default = validator;
