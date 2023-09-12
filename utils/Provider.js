import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user.id);
    });
  });

  passport.deserializeUser(function (id, cb) {
    process.nextTick(async function () {
      const user = await User.findById(id);
      return cb(null, user);
    });
  });
};
