"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioSMS = void 0;
const config_1 = require("../../helper/config");
const twilio_1 = __importDefault(require("twilio"));
class twilioSMS {
    constructor() {
        this.sid = config_1.twilioconfig.sid;
        this.token = config_1.twilioconfig.token;
        this.twilio_number = config_1.twilioconfig.mynumber;
        this.client = twilio_1.default(this.sid, this.token);
    }
    sendSMS(to, msg) {
        this.client.messages
            .create({
            body: msg,
            from: this.twilio_number,
            to: to
        })
            .then((message) => console.log(message.sid));
    }
}
exports.twilioSMS = twilioSMS;
