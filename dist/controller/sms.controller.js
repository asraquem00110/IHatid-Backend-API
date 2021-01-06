"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSController = exports.smsController = void 0;
const smsManager_1 = require("../data/smsManager");
const twilio_1 = require("../data/sms/twilio");
class SMSController {
    sendSMS(to, msg) {
        let sms = new smsManager_1.SMSManager(new twilio_1.twilioSMS());
        return sms.sendSMS(to, msg);
    }
}
exports.SMSController = SMSController;
let smsController = new SMSController();
exports.smsController = smsController;
