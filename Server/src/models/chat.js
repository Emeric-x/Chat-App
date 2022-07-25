const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    // _id generated automatically
    name: { type: String, required: true },
    logo: { type: String, required: true },
    users: [{
        user_id: { type: mongoose.Types.ObjectId, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        login: { type: String, required: true },
        avatar: { type: String, required: true }
    }],
    messages: [{
        author: {
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            avatar: { type: String, required: true }
        },
        text: { type: String, required: true }
    }]
})

module.exports = mongoose.model('Chat', ChatSchema)