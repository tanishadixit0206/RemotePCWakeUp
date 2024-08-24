import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import connect from './utilis/dbconnect.js';
import { User } from './models/usermodel.js';
import cors from 'cors';
import './utilis/passport.js';
// import bcrypt from 'bcrypt';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true
    })
)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

connect();

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const { token } = req.user;
        res.json({token : token})
    }
);

app.post('/auth/signup', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).send("Bad request");
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: password, email });
    await user.save();

    res.send(user);
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: "Username or password is incorrect" });
    }

    // const match = await bcrypt.compare(password, user.password);
    //   if (match) {
         const token = jwt.sign(
             { id: user._id, username: user.username },
             process.env.JWT_SECRET,
             { algorithm: "HS256" }
         );
         res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).status(200).json({msg : "you have been logged in"})
    //  } else {      res.status(400).json({ msg: "Username or password is incorrect" });
    //  }
});

app.get('/check', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.json({ msg: "Not authenticated" });
    }
    res.send(`Hello ${req.user}`);
});
const hostname = '127.0.0.1';
app.listen(7777,hostname, () => {
    console.log('Server has started on port 7777');
});
