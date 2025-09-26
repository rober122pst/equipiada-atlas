import passport from "passport";
import SteamStrategy from "passport-steam";
import User from "../models/User.js";

passport.use(new SteamStrategy({
    returnURL: "http://localhost:1987/auth/steam/return",
    realm: "http://localhost:1987/",
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
  done(null, user._id);
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
