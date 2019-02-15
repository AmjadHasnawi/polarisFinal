const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/local-strategyAuth.js');
const signupuser = require('./dataBase/signupUser')
const bcrypt = require("bcrypt-nodejs");


passport.serializeUser(function(user, done) {
//   console.log('DSA', user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



router.post('/signup', (req, res) => {
  signupuser.findOne({ 'email': req.body.email }, (err, userMatch) => {
    if (userMatch) {
      console.log('user already exist: ', userMatch)
      res.send('exist');
    } else {
        const User = new signupuser({
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          email: req.body.email,
          password:  bcrypt.hashSync(req.body.password),
          profession: req.body.profession
        });
        User.save().then((user) => {
          //   console.log('oii', user);
          // req.session.user = user;
          // console.log('oii', req.session);
          res.end();
        });
    };  
  })
})

router.post('/signin',
passport.authenticate('local'),
(req, res) => {
  console.log('hey')
  // console.log('dtrt', req.session)
  res.send(req.session)
}
);

router.get('/checkLogging', (req, res) => {
  if(req.session.passport) {
  console.log('321',req.session)
  Teacher.findOne({email: req.session.passport.user.email}, (err, user) => {
    // console.log('asd',user)
  if (req.session.passport && user) {
     res.send(user);
  } else {
    signupuser.findOne({email: req.session.passport.user.email}, (err, user) => {
      console.log('asd',user)
    if (req.session.passport && user) {
       res.send(user);
    } else {
      res.end();
    }
  })
  }
})
  } else {
    res.end();
  }
})

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});


module.exports = router;