const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    // _id generated automatically
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    chats: [{
        chat_id: { type: mongoose.Types.ObjectId, required: true },
        name: { type: String, required: true },
        logo: { type: String, required: true }
    }]
})

module.exports = mongoose.model('User', UserSchema)