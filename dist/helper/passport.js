"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
let ExtractJwt = passport_jwt_1.default.ExtractJwt;
let JwtStrategy = passport_jwt_1.default.Strategy;
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};
const user_1 = require("../data/user");
let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    const user = await user_1.user.get(jwt_payload.id);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
});
passport_1.default.serializeUser(function (user, done) {
    return done(null, user.id);
});
passport_1.default.deserializeUser(async function (id, done) {
    try {
        const user = await user_1.user.get(id);
        return done(null, user);
    }
    catch (err) {
        return done(err, null);
    }
});
passport_1.default.use(strategy);
exports.default = passport_1.default;
