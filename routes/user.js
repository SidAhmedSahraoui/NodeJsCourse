const express = require('express')
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send(
      ` <form action='/add' method='POST'> 
          <input type='text' name='title'> 
          <button type='submit'>Add</button>  
        </form> `
    );
  });
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.send("<h1>Hello</h1>");
  });

module.exports = router