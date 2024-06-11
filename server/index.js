require('dotenv').config();
const express = require('express');
const route = require('./routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const mongoose = require('mongoose');
let app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(cookieParser())

//Routes
app.use(route);


mongoose.connect('mongodb://localhost:27017/financial_data').then(() => {
    console.log('Connected to database')
    app.listen(6510, () => {
        console.log(`Server is learning on http://localhost:6510`)
    })
}).catch((error) => {
    console.log(error)
})

