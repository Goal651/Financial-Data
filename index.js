require('dotenv').config();
const express = require('express');
const route = require('./routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser')
const path = require('path'); const mongoose = require('mongoose')
const { ok } = require('assert');
const { log } = require('console');
const { Product } = require('./models/users');
let app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cookieParser())

//Routes
app.use(route);


app.get('/', async(req, res) => {
    // Assuming index.html is served statically
   
        const userId = req.cookies.user_id;
        if (!userId) {
          console.log('cookie not found');
            res.sendFile(path.join(__dirname, '/'));
            return;
        }

        // If cookie exists, attempt to find user in database
        const user = await Product.findById(userId);
        if (!user) {
            console.log('User not found in database');
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // If user found, serve home.html
        res.redirect('/login')

    }
);

app.get('/login', async (req, res) => {
    try {
        const userId = req.cookies.user_id;
        if (!userId) {
          
            res.redirect('/');
            return;
        }

        // If cookie exists, attempt to find user in database
        const user = await Product.findById(userId);
        if (!user) {
            console.log('User not found in database');
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // If user found, serve home.html

        res.sendFile(path.join(__dirname,'HOME', 'home.html'))
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error')
    }
})




mongoose.connect('mongodb://localhost:27017/users').then(() => {
    console.log('Connected to database')
    app.listen(process.env.PORT, () => {
        console.log(`Server is learning on http://localhost:${process.env.PORT}/login`)
    })
}).catch((error) => {
    console.log(error)
})

