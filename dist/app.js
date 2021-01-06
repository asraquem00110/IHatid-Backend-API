"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongo_helper_1 = require("./helper/mongo.helper");
const config_1 = require("./helper/config");
const api_router_1 = __importDefault(require("./router/api.router"));
const passport_1 = __importDefault(require("./helper/passport"));
const app = express_1.default();
const http_ = http_1.default.createServer(app);
exports.io = require('socket.io')(http_);
require("./socketUtilities/socket");
app.use(passport_1.default.initialize());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors_1.default(corsOptions));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser('keyboard cat'));
var session = require('express-session');
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use('/api', api_router_1.default);
http_.listen(config_1.server.port, async () => {
    console.log(`listening to port ${config_1.server.port}`);
    try {
        await mongo_helper_1.MongoDBHelper.mongooseConnect(`${config_1.db.mongodbURL}`);
    }
    catch (err) {
        console.log(err);
    }
});
