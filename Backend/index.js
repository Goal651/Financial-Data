require('dotenv').config();
const express = require('express');
const route = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const { ok } = require('assert');
const { log } = require('console');
const { User } = require('./models/model');
let app = express();


//Middleware
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())


//Routes
app.use(route);


app.get('/', async (req, res) => {
    try {


    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


app.get('/login', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error')
    }
})


app.get('/logout', (req, res) => {
    res.clearCookie('info');
    res.status(200).json({ message: 'logged out' })
})





mongoose.connect('mongodb://localhost:27017/myapp').then(() => {
    console.log('Connected to database')
    app.listen(6510, () => {
        console.log(`Server is learning on http://localhost:6510`)
    })
}).catch((error) => {
    console.log(error)
})

