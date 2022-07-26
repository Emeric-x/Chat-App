const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.GetAllUsers)
router.post('/SignUp', usersController.PostUser)
router.post('/SignIn', usersController.SignInUser)
router.get('/:id', usersController.GetUserById)
router.get('/GetByLogin/:login', usersController.GetUserByLogin)
router.delete('/:id', usersController.DeleteUser)

module.exports = router