const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const connectDB = require('./config/db');
const User = require('./models/User');
const programRoutes = require('./routes/programRoutes');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

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

// View engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Signup
app.get('/signup', (req, res) => {
  res.render('auth/signup', { error: null });
});

app.post('/signup', async (req, res) => {
  try {
    let { username, email, password } = req.body;

    username = (username || '').trim().toLowerCase();
    email = (email || '').trim().toLowerCase();
    password = password || '';

    if (!username || !email || !password) {
      return res.status(400).render('auth/signup', { error: 'All fields are required.' });
    }

    if (password.length < 8 || password.length > 72) {
      return res
        .status(400)
        .render('auth/signup', { error: 'Password must be at least 8 and no more than 72 characters.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).render('auth/signup', { error: 'Email already in use.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).render('auth/signup', { error: 'Username taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    req.session.userId = newUser._id;
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return res.status(500).render('auth/signup', { error: 'Something went wrong. Please try again.' });
  }
});

// Login
app.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    email = (email || '').trim().toLowerCase();
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

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Dashboard
app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');

  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/login');

  res.render('dashboard', { user });
});

// Program routes
app.use(programRoutes);

module.exports = app;