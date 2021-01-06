"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSocketclient = exports.BookingSocketclient = exports.LocationsSocketclient = void 0;
const socket_io_client_1 = __importDefault(require("socket.io-client"));
exports.LocationsSocketclient = socket_io_client_1.default(`${process.env.BACKEND_URL}/locations`, { transports: ['websocket'] });
exports.BookingSocketclient = socket_io_client_1.default(`${process.env.BACKEND_URL}/booking`, { transports: ['websocket'] });
exports.ChatSocketclient = socket_io_client_1.default(`${process.env.BACKEND_URL}/chat`, { transports: ['websocket'] });
