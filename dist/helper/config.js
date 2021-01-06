"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioconfig = exports.jwtconfig = exports.db = exports.server = void 0;
exports.server = {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.PORT
};
exports.db = {
    url: process.env.MONGODB_URL,
    mongodbURL: process.env.MONGODB_URL_CLOUD,
};
exports.jwtconfig = {
    secret: process.env.SECRET_KEY,
    refreshsecret: process.env.REFRESH_SECRET_KEY,
};
exports.twilioconfig = {
    sid: process.env.TWILIO_SID,
    token: process.env.TWILIO_TOKEN,
    mynumber: process.env.TWILIO_NUMBER
};
