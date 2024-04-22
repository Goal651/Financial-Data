const express = require('express')
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, checkUser, logoutUser, homePage,login } = require("../controllers/controller")

//get users
router.get('/api/getUsers', getUsers)
router.get('/api/users:id', getUser)

//create user
router.post('/api/users', createUser)

//logging use
router.post('/api/checkUsers', checkUser)

//logout user
router.get('/logout', logoutUser)

//update user
router.put('/api/updateUsers/:id', updateUser)

//delete user
router.delete('/api/deleteUsers/:id', deleteUser)


module.exports = router;