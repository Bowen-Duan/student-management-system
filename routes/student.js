const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

/* 列表 */
router.get('/', auth, async (req, res) => {
  const keyword = req.query.keyword || '';
  const [rows] = await pool.query(
    'SELECT * FROM students WHERE name LIKE ?',
    [`%${keyword}%`]
  );
  res.render('students/list', { rows, user: req.session.user });
});

/* 新增页面（管理员） */
router.get('/add', auth, role, (req, res) => {
  res.render('students/add');
});

/* 新增 */
router.post('/add', auth, role, async (req, res) => {
  const { name, age, major } = req.body;
  await pool.query(
    'INSERT INTO students(name,age,major,owner_id) VALUES(?,?,?,?)',
    [name, age, major, req.session.user.id]
  );
  res.redirect('/students');
});

/* 删除（管理员） */
router.get('/delete/:id', auth, role, async (req, res) => {
  await pool.query('DELETE FROM students WHERE id=?', [req.params.id]);
  res.redirect('/students');
});

module.exports = router;
