const { Strategy, ExtractJwt } = require('passport-jwt');
const findUser = require('./services/user').findUser;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

module.exports = passport => {
  passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
      try {
        const user = await findUser('id', payload.id);

        if (!user) {
          return done(false, false);
        }

        const { id, username, email } = user;
        return done(false, {
          id,
          username,
          email
        });
      } catch (err) {
        return done(true);
      }
    })
  );
};
