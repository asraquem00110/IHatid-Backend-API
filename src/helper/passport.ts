import passport from 'passport'
import passportJWT from 'passport-jwt'

let ExtractJwt = passportJWT.ExtractJwt
let JwtStrategy = passportJWT.Strategy

let jwtOptions: any = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

import {user as UserData} from '../data/user'

let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload: any, done: Function) {

    const user = await UserData.get(jwt_payload.id)
    if (user) {
        return done(null, user)
    } else {
        return done(null, false)
    }
    });
    
    passport.serializeUser(function(user: any, done: Function) {
        return done(null, user.id);
    });
    
    passport.deserializeUser(async function(id: string, done: Function) {
        try {
            const user = await UserData.get(id)
            return done(null,user)
        }catch(err){
            return done(err, null)
        }
    });
    
// use the strategy
passport.use(strategy)

export default passport