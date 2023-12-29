const express = require('express');

const port = 8000;

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use('/', require('./routes/userRoutes'));
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require('./config/db');

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})