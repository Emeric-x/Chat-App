const User = require("../models/user")
const cryptojs = require("crypto-js")

exports.GetAllUsers = async(req, res) => {
    try {
        const AllUsers = await User.find()
        res.json(AllUsers)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.GetAllUsersNoRes = async(req, res) => {
    try {
        const AllUsers = await User.find()
        return AllUsers
    } catch (err) {
        console.log(err)
    }
}

exports.PostUser = async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.UpdateUserPersonalData = async(req, res) => {
    try {
        const { sFirstname, sLastname } = req.body
        let user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No matching user' })
        } else {
            user.firstname = sFirstname
            user.lastname = sLastname

            user = await user.findOneAndUpdate({ _id: req.params.id }, user, { new: true })

            res.json(user)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.AddUserChat = async(req, res, sUser_id, sChat) => {
    try {
        let user = await User.findById(sUser_id)

        if (!user) {
            return 'No matching user'
        } else {
            user.chats.push({
                chat_id: sChat._id,
                name: sChat.name,
                logo: sChat.logo
            })

            user = await User.findOneAndUpdate({ _id: sUser_id }, user, { new: true })

            return true
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

exports.GetUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No matching user' })
        } else {
            res.json(user)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.GetUserByLogin = async(req, res) => {
    try {
        const users = await this.GetAllUsersNoRes(req, res)
        let userFound = null

        users.forEach(user => {
            if (user.login === req.params.login) {
                userFound = user
            }
        });

        if (userFound === null) {
            res.send(false)
        } else {
            res.json(userFound)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.SignInUser = async(req, res) => {
    try {
        const users = await this.GetAllUsersNoRes(req, res)
        let userFound = null

        users.forEach(user => {
            if (user.login === req.body.login && user.password === req.body.password) {
                userFound = user
            }
        });

        if (userFound === null) {
            res.send(false)
        } else {
            res.json(userFound)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.DeleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No matching game' })
        } else {
            await User.findByIdAndRemove({ _id: req.params.id })

            res.json({ msg: 'user deleted' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}