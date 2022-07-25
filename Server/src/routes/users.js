const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.GetAllUsers)
router.post('/', usersController.PostUser)
router.put('/PersonalData?:id', usersController.UpdateUserPersonalData)
router.put('/Groups/:id', usersController.UpdateUserGroups)
router.put('/match', usersController.UpdateUserMatch)
router.get('/:id', usersController.GetUserById)
router.post('/signin', usersController.GetUserByLoginInfo)
router.delete('/:id', usersController.DeleteUser)

module.exports = router