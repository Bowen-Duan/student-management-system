const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const router = express.Router();

/* 注册页面 */
router.get('/register', (req, res) => {
  res.render('register', { error: '' });
});

/* 注册 */
router.post('/register', async (req, res) => {
  const { username, password, confirm, email } = req.body;

  if (password.length < 6) {
    return res.render('register', { error: '密码长度必须大于6位' });
  }
  if (password !== confirm) {
    return res.render('register', { error: '两次密码不一致' });
  }

  const [rows] = await pool.query(
    'SELECT id FROM users WHERE username=?',
    [username]
  );
  if (rows.length) {
    return res.render('register', { error: '用户名已存在' });
  }

  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO users(username,password,email) VALUES(?,?,?)',
    [username, hash, email]
  );

  res.redirect('/login');
});

/* 登录页面 */
router.get('/login', (req, res) => {
  res.render('login', { error: '' });
});

/* 登录 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username=?',
    [username]
  );

  if (!rows.length) {
    return res.render('login', { error: '账号不存在' });
  }

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.render('login', { error: '密码错误' });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  res.redirect('/');
});

/* 退出 */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
