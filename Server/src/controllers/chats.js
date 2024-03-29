const Chat = require("../models/chat")
const UsersController = require("../controllers/users")

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

        chat.users.forEach(async(user) => {
            await UsersController.AddUserChat(req, res, user.user_id, chat)
        });

        res.json(chat)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.ChatAlreadyCreated = async(req, res) => {
    try {
        const AllChats = await this.GetAllChatsNoRes(req, res)

        if (req.body.user_chats.length > 0) {
            let AllUserChats = []
            let sameUser = 0
            let SimilarChatFounded = null
            let done = false

            req.body.user_chats.forEach(async(chat) => {
                let chatById = await Chat.findById(chat.chat_id)
                AllUserChats.push(chatById)
            });

            AllChats.forEach(chat => {
                if (!done) {
                    sameUser = 0
                    SimilarChatFounded = chat

                    chat.users.forEach(user => {
                        req.body.chat.users.forEach(newChat_User => {
                            if (user.login === newChat_User.login) {
                                sameUser++
                            }
                        });
                    });
                }

                if (sameUser === req.body.chat.users.length) {
                    done = true
                    res.json(chat)
                }
            });
        } else {
            res.send(false)
        }
    } catch (err) {
        console.log(err)
    }
}

exports.PostMessage = async(req, res) => {
    try {
        let chat = await Chat.findById(req.body.chat_id)

        if (!chat) {
            res.status(404).json({ msg: 'No matching chat' })
        } else {
            chat.messages.push({
                author: {
                    firstname: req.body.author.firstname,
                    lastname: req.body.author.lastname,
                    avatar: req.body.author.avatar
                },
                text: req.body.message
            })

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

exports.GetChatByIdNoRes = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)

        if (!chat) {
            return false
        } else {
            return chat
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

exports.GetMessagesByChatId = async(req, res) => {
    try {
        const chat = await this.GetChatByIdNoRes(req, res)

        if (!chat) {
            res.status(404).json({ msg: 'No matching chat' })
        } else {
            res.json(chat.messages)
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