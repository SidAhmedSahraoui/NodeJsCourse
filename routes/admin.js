const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'admin.html'))
  })
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.status(200).send("<h1>Added!</h1>")
  })

module.exports = router