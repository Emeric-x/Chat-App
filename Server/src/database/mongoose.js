const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://Shanks:a5BN00xo@cluster0.vvrbi.mongodb.net/chat')
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))

module.exports = mongoose