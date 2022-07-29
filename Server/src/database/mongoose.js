const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// old = mongodb+srv://Shanks:a5BN00xo@cluster0.vvrbi.mongodb.net/chat
mongoose.connect('mongodb+srv://Shanks:a5BN00xo@cluster0.vvrbi.mongodb.net/chat?retryWrites=true&w=majority')
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))

module.exports = mongoose