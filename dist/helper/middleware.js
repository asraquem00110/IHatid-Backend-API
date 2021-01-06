"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checknotAuthenticated = exports.checkisAuthenticated = exports.getuserinfo = exports.PassportAuthenticate = void 0;
exports.PassportAuthenticate = (passport) => {
    return passport.authenticate('jwt', { session: false });
};
exports.getuserinfo = async (req, res, next) => {
    const user = await req.user;
    console.log(user);
    return next();
    return user;
};
exports.checkisAuthenticated = async (req, res, next) => {
    let check = await req.isAuthenticated();
    if (check) {
        return next();
    }
    else {
        res.json({ msg: 'Unauthorized' });
    }
};
exports.checknotAuthenticated = async (req, res, next) => {
    let check = await req.isAuthenticated();
    if (check) {
        res.end();
        res.redirect('/');
    }
    return next();
};
