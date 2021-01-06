"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSManager = void 0;
class SMSManager {
    constructor(sms) {
        this.SmsProvider = sms;
    }
    sendSMS(to, msg) {
        this.SmsProvider.sendSMS(to, msg);
    }
}
exports.SMSManager = SMSManager;
SMSManager;
