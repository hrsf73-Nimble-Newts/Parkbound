const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const User = require('../../db/models/user.js');

var fitbitStrategy = new FitbitStrategy({
    clientID:     '2288ZY',
    clientSecret: 'f49e6511a30c9dff0111ed5420822353',
    callbackURL: "https://nimble-newts-staging.herokuapp.com/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile
    });
  }
);

module.exports = fitbitStrategy;