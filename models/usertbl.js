const mongoose = require('mongoose');

const crudeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

const tblName = mongoose.model('crud', crudeSchema);

module.exports = tblName;