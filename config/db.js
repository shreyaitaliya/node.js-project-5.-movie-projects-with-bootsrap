const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/MovieCrud');

const db = mongoose.connection;

db.on('connected', (error) => {
    if (error) {
        console.log('db is not connected');
        return false
    }
    console.log('DB is connected');
})

module.exports = db;