const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db')

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRoutes);

db.sync().then(result => {
    app.listen(3000);
    // console.log(result)
}).catch(err => {
    console.log(err)
})
