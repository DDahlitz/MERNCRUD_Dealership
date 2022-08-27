const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    picture: String,
    year: String,
    make: String,
    model: String,
    miles: String,
    price: String,
    color: String,
    available: Boolean
})

const Schema = mongoose.model('Schema', schema)

module.exports = Schema