import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { googleUser } from '../models/googleauthschema.js';
import dotenv from "dotenv"
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await googleUser.findOne({ googleId: profile.id });

            if (!user) {
                user = new googleUser({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value
                });
                await user.save();
            }

            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { algorithm: "HS256" }
            );
            done(null, { user, token });
        } catch (err) {
            done(err, false, err.message);
        }
    }
));

passport.serializeUser((obj, done) => {
    done(null, obj.user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await googleUser.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
