const express = require('express')
const path = require('path')
const router = express.Router()


router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add.html'))
  });
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.send("<h1>Hello</h1>");
  });

module.exports = router