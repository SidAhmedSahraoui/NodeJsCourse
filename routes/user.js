const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.post('/add', (req, res, next) => {
  res.render('add');
});

module.exports = router;
