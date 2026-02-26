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
app.use(async (req, res, next) => {
  try {
    res.locals.currentUser = null;

    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user || null;
    }

    next();
  } catch (error) {
    console.error(error);
    res.locals.currentUser = null;
    next();
  }
});
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

app.get('/login',async (req,res)=>{
  res.render('auth/login',{error:null})
});


app.post('/login',async (req,res) => {
  try {
    let{email, password} = req.body;

    email = ( email || '').trim().toLowerCase();
    password = password || '';
    if (!email || !password) {
      return res.status(400).render('auth/login', { error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render('auth/login', { error: 'Invalid email or password.' });
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).render('auth/login', { error: 'Invalid email or password.' });
    }
    req.session.userId = user._id;
    return res.redirect('/dashboard');
  
  } catch (error) {
    console.error(error);
    return res.status(500).render('auth/login', { error: 'Something went wrong. Please try again.' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


module.exports = app;
