const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user.model");

// Local strategy
const localOpts = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(
    localOpts,
    async(email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false);
            } else if (!user.authenticateUser(password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    }
);






// Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
    secretOrKey: 'secretekey',
};


const jwtStrategy = new JwtStrategy(jwtOpts, async(payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});


passport.use(localStrategy);
passport.use(jwtStrategy);
const authLocal = passport.authenticate('local', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });
exports.authLocal = authLocal;
exports.authJwt = authJwt;