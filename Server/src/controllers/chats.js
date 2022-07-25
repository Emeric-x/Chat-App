const Chat = require("../models/chat")

exports.GetAllChats = async(req, res) => {
    try {
        const AllChats = await Chat.find()
        res.json(AllChats)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.GetAllChatsNoRes = async(req, res) => {
    try {
        const AllChats = await Chat.find()
        return AllChats
    } catch (err) {
        console.log(err)
    }
}

exports.PostChat = async(req, res) => {
    try {
        const chat = new Chat(req.body)
        await chat.save()

        res.json(chat)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.PostMessage = async(req, res) => {
    try {
        let chat = await Chat.findById(req.body.chat_id)
        if (!chat) {
            res.status(404).json({ msg: 'No matching chat' })
        } else {
            chat.messages.push(req.body.message)

            chat = await Chat.findOneAndUpdate({ _id: req.body.chat_id }, chat, { new: true })

            res.send(true)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.GetChatById = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)

        if (!chat) {
            res.status(404).json({ msg: 'No matching chat' })
        } else {
            res.json(chat)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.DeleteChat = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)

        if (!chat) {
            res.status(404).json({ msg: 'No matching chat' })
        } else {
            await Chat.findByIdAndRemove({ _id: req.params.id })

            res.json({ msg: 'chat deleted' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}