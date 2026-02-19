const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

connectDB();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
