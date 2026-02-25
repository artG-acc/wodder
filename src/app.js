const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const connectDB = require('./config/db');
const User = require('./models/User');
const methodOverride = require('method-override');


connectDB();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
  })
);

// view engine
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup',async (req,res)=>{
  res.render('auth/signup')
});

app.post('/signup', async (req,res)=>{
  try {
    // pull fields
    let{username, email, password} = req.body;


    username = ( username || '').trim().toLowerCase();
    email = ( email || '').trim().toLowerCase();
    password = password || '';

    // validation basics
    if(!username||!email||!password){
      return res.status(400).render('auth/signup',{error: 'All fields are required.'})
    };
    if(password.length < 8 || password.length >72){
      return res.status(400).render('auth/signup',{error: 'Password must be at least 8 or less then 72 characters.'})
    };

    const existinEmail = await User.findOne({email});
    if (existinEmail){
      return res.status(409).render('auth/signup',{error: 'Email already in use.'})
    };

    const existinUserName = await User.findOne({username});
    if (existinUserName){
      return res.status(409).render('auth/signup',{error: 'Username already in use.'})
    };

    const passwordHash = await bcrypt.hash(password,12);
    const newUser = new User({username,email,passwordHash});
    await newUser.save();

    req.session.userId = newUser._id;

    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return res.status(500).render('auth/signup',{error: 'Something went wrong. Please try again'})
  }
});

app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) return res.redirect('/signup');

  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/signup');

  res.render('dashboard', { user });
});


module.exports = app;
