"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongo_helper_1 = require("./helper/mongo.helper");
const config_1 = require("./helper/config");
const app = express_1.default();
const http_ = http_1.default.createServer(app);
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
const api_router_1 = require("./router/api.router");
app.use('/api', api_router_1.apiRoutes);
const passport_1 = __importDefault(require("passport"));
var GoogleStrategy = require('passport-google-oauth2').Strategy;
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new GoogleStrategy({
    clientID: "742892011948-bkqumhhess354jjp7c84101q1nqktp70.apps.googleusercontent.com",
    clientSecret: "RgJUpo-TrV5JZ-TikOES0iCZ",
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const middleware = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
};
app.get('/google/success', middleware, (req, res, next) => {
    res.json({ data: req.user });
});
app.get('/google/failure', (req, res, next) => {
    res.json({ msg: "Failed" });
});
app.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/google/success',
    failureRedirect: '/google/failure'
}));
app.get('/logout', (req, res, next) => {
    req.session.destroy();
    req.logout();
    res.redirect('/');
});
http_.listen(config_1.server.port, async () => {
    console.log(`listening to port ${config_1.server.port}`);
    try {
        await mongo_helper_1.MongoDBHelper.mongooseConnect(`${config_1.db.url}`);
    }
    catch (err) {
        console.log(err);
    }
});
