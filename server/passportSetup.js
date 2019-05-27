const { Strategy, ExtractJwt } = require('passport-jwt');
const findUserById = require('./services/auth').findUserById;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

module.exports = passport => {
  passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
      try {
        const user = await findUserById(payload.id);

        if (user) {
          const { id, username, email } = user;
          return done(null, {
            id,
            username,
            email
          });
        }
      } catch (err) {
        return done(null, false);
      }
    })
  );
};
