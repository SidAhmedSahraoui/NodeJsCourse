const express = require('express');
const router = express.Router();
const User = require('../models/User')

const list = [{number: 1, name: "ahmed", email: "ahmed@esi.dz"},{number: 2, name: "ali", email: "ali@esi.dz"}]

router.get('/', (req, res, next) => {
  User.findAll().then(result => {
    res.render('home', {title: 'Admin Dashboard', users: result });

  })
});

router.get('/add', (req, res, next) => {
  res.render('add', {title: 'Add User'});
});
router.post('/add', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = "user";
  User.create({
    username: username,
    email: email,
    password, password,
    role: role
  }).then(result => console.log(result)).catch(err => console.log(err))
});

module.exports = router;
