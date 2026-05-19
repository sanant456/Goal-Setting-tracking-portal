const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');

const getCallbackUrl = (provider) => {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? 'https://goal-setting-and-tracking-portal-rho.vercel.app' : 'http://localhost:5000';
  return `${baseUrl}/api/auth/${provider}/callback`;
};

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'missing_google_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'missing_google_secret',
      callbackURL: getCallbackUrl('google'),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] 
        });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 'employee',
            department: 'General'
          });
          await user.save();
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || 'missing_github_id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'missing_github_secret',
      callbackURL: getCallbackUrl('github'),
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0 
          ? profile.emails[0].value 
          : `${profile.username}@github.com`;

        let user = await User.findOne({ 
          $or: [{ githubId: profile.id }, { email }] 
        });

        if (!user) {
          user = new User({
            name: profile.displayName || profile.username,
            email,
            githubId: profile.id,
            role: 'employee',
            department: 'General'
          });
          await user.save();
        } else if (!user.githubId) {
          user.githubId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// We don't need serialize/deserialize if we only use passport for token generation (stateless)
module.exports = passport;
