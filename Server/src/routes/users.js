const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.GetAllUsers)
router.post('/SignUp', usersController.PostUser)
router.post('/SignIn', usersController.SignInUser)
router.put('/Groups/:id', usersController.AddUserChat)
router.get('/:id', usersController.GetUserById)
router.delete('/:id', usersController.DeleteUser)

module.exports = router