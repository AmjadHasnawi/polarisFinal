const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./auth.js')


const app = express();

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth)

//database connection
mongoose.connect('mongodb://sharik:root123@ds139251.mlab.com:39251/zahgan')
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', function () {
    console.log('mongoose connection error');
});

db.once('open', function () {
    console.log('mongoose connected successfully');
})



if (process.env.NODE_ENV === 'production') {
// // Serve any static files
app.use(express.static(path.join(__dirname, './client/build')));
// // Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
