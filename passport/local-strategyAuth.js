const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signupuser = require('../dataBase/signupUser')
const bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(
  {
    usernameField: 'email' // not necessary, DEFAULT
  },
  function(email, password, done) {
    console.log('356',email, password )
    signupuser.findOne({ 'email': email }, (err, userMatch) => {
      console.log('That is him',userMatch)
      if (err) {
        return done(err)
      }
      if (userMatch) {
        console.log('hi there')
        if (bcrypt.compareSync(password, userMatch.password)) {
          console.log('hello world')
        //   console.log('sg', bcrypt.compareSync(password, userMatch.password))
          return done(null, userMatch)
        }
        //return done(null,userMatch)
      } 
      return done(null, false, { message: 'Check you password or email' }) 
    })
  }
));

