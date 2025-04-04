import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../api/Account/user.model.js";
import generateToken from "../utils/generateToken.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            full_name: profile.displayName,
            avatar: profile.photos[0]?.value || "",
          });
          const token = await generateToken(user);
          user.token = token;

          await user.save({ validateBeforeSave: false });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error saving user:", error);
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
export default passport;
