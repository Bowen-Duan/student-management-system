require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const sessionConfig = require('./config/session');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionConfig));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/auth'));
app.use('/students', require('./routes/student'));

app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('index', { user: req.session.user });
});

app.listen(3000, () => {
  console.log('服务器运行：http://localhost:3000');
});
