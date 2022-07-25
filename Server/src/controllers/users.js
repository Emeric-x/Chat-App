const User = require("../models/user")

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

exports.UpdateUserGroups = async(req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({ msg: 'No matching user' })
        } else {
            user.groups.push(req.body)

            user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })

            res.json(req.body)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.UpdateUserMatch = async(req, res) => {
    try {
        let user = await User.findById(req.body.user_id)

        if (!user) {
            res.status(404).json({ msg: 'No matching user' })
        } else {
            user.match = req.body.match_id

            user = await User.findOneAndUpdate({ _id: req.body.user_id }, user, { new: true })

            res.send(true)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
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

exports.GetUserByLoginInfo = async(req, res) => {
    try {
        const users = await this.GetAllUsersNoRes(req, res)
        let userFound = null

        users.forEach(user => {
            if (user.login === req.body.login && user.password === req.body.pwd) {
                userFound = user
            }
        });

        if (userFound === null) {
            res.status(404).json({ msg: 'No matching user' })
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