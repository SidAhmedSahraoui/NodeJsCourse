const express = require('express')

const router = express.Router()

router.get("/", (req, res, next) => {
    res.send(`
      <h1>Welcome Admin</h1>
      <form  action='/admin' method='POST'> 
          <h1> Add another user </h1>
          <input type='email' name='email' placeholder='Email'> 
          <input type='password' name='password' placeholder='Password'>
          <button type='submit'>Add</button>  
        </form>
    `)
  })
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.status(200).send("<h1>Added!</h1>")
  })

module.exports = router