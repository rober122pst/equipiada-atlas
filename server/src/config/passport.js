import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import SteamStrategy from "passport-steam";

import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profile: {
          profPicURL: profile.photos[0].value,
        },
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        user = await User.create(newUser);
        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);

passport.use(new SteamStrategy({
    returnURL: process.env.STEAM_RETURN_URL,
    realm: process.env.CLEINT_URL,
    apiKey: process.env.STEAM_KEY
  },
  async (identifier, profile, done) => {
    try {
      const steamId = profile._json.steamid;

      let user = await User.findOne({ steamId });
      if (!user) {
        user = new User({
          steamId,
          name: profile.displayName,
          avatar: profile.photos?.[2]?.value || ""
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
