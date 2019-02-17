const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/local-strategyAuth.js');
const signupuser = require('./dataBase/signupUser')
const bcrypt = require("bcrypt-nodejs");


passport.serializeUser(function(user, done) {
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
          profession: req.body.profession,
          employeeApproval : false,
          managerApproval : false
        });
        User.save().then((user) => {
          res.end();
        });
    };  
  })
})

router.post('/signin',
passport.authenticate('local'),
(req, res) => {
  res.send(req.session)
}
);

router.get('/checkLogging', (req, res) => {
  if(req.session.passport) {
  Teacher.findOne({email: req.session.passport.user.email}, (err, user) => {
  if (req.session.passport && user) {
     res.send(user);
  } else {
    signupuser.findOne({email: req.session.passport.user.email}, (err, user) => {
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

router.post('/image1', (req, res) => {
    signupuser.findOneAndUpdate({'email':req.body.email},{'image1':req.body.image}).then(function (user) {
        res.send(user)
      })
})

router.post('/image2', (req, res) => {
    signupuser.findOneAndUpdate({'email':req.body.email},{'image2':req.body.image}).then(function (user) {
        res.send(user)
      })
})

router.post('/image3', (req, res) => {
    signupuser.findOneAndUpdate({'email':req.body.email},{'image3':req.body.image}).then(function (user) {
        res.send(user)
      })
})

router.get('/employeeRequests', (req, res) => {
  signupuser.find({'employeeApproval': false}).sort({date: -1}).then(function (user) {
      res.send(user)
    })
})

router.get('/managerRequests', (req, res) => {
  signupuser.find({'employeeApproval': true, 'managerApproval': false}).sort({date: -1}).then(function (user) {
      res.send(user)
    })
})

router.post('/deny', (req, res) => {
  signupuser.findOneAndDelete({email: req.body.email}).then((user) => {
    res.send(user);
  })
})

router.post('/employeeAccept', (req, res) => {
  signupuser.findOneAndUpdate({email: req.body.email}, {employeeApproval: true}).then((user) => {
    res.send(user);
  })
})

router.post('/managerAccept', (req, res) => {
  signupuser.findOneAndUpdate({email: req.body.email}, {managerApproval: true, notifications: 'Your applying was approved'}).then((user) => {
    res.send(user);
  })
})

router.post('/notifications', (req, res) => {
  signupuser.findOne({email: req.body.email}).then((user) => {
    res.send(user);
  })
})

router.post('/delete', (req, res) => {
  signupuser.findOneAndUpdate({email: req.body.email}, {notifications: ''}).then((user) => {
    res.send(user);
  })
})


module.exports = router;