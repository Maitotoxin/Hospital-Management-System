const express = require('express');
const path = require('path');
const session = require('express-session');
// use body-parser module  to handle post
const bodyparser = require('body-parser');
const app = express();

//use body-parser handle all get/post rquest
app.use(bodyparser.urlencoded({extended: false}));

/*
app.use(session({
    secret: 'Dymatize Accelerate Wallet',
    saveUninitialized: false,
    cookie: {
        maxAge: 0.25 * 60 * 60 * 1000
    }
}));
*/

//art directory
app.set('views', path.join(__dirname, 'views'));
//tell express standard attribute
app.set('view engine', 'art');

//tell standard engine for attribute
app.engine('art', require('express-art-template'));

//open static directory
app.use(express.static(path.join(__dirname, 'static')));