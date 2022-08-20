const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const list = [{number: 1, name: "ahmed", email: "ahmed@esi.dz"},{number: 2, name: "ali", email: "ali@esi.dz"}]

router.get('/', (req, res, next) => {
  res.render('home', {title: 'Admin Dashboard', users: list });
});

router.get('/add', (req, res, next) => {
  res.render('add', {title: 'Add User'});
});

module.exports = router;
