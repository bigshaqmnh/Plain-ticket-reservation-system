const { Strategy, ExtractJwt } = require('passport-jwt');
const userService = require('./services/user');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

module.exports = passport => {
  passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
      try {
        const user = await userService.findByEmail(payload.email);

        if (!user) {
          return done(false, false);
        }

        const { id, isAdmin } = user;
        return done(false, {
          id,
          isAdmin
        });
      } catch (err) {
        return done(true);
      }
    })
  );
};
