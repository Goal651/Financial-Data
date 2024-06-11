const express = require('express')
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, checkUser, createBudget, getBudgets, updateBudget, getBudget, deleteBudget } = require("../controllers/controller")

//get users
router.get('/api/getUsers', getUsers)
router.get('/api/users:id', getUser)

//create user
router.post('/api/createUser', createUser)

//login user
router.post('/api/checkUsers', checkUser)

//update user
router.put('/api/updateUsers/:id', updateUser)

//delete user
router.delete('/api/deleteUsers/:id', deleteUser)

//create budget
router.post('/createBudget', createBudget)

//Get budgets
router.get('/getBudgets/:token', getBudgets)
router.get('/getBudget/:id', getBudget)

//Update budgets
router.put('/api/editBudget/:id', updateBudget)

//delete budget
router.delete('/api/deleteBudget', deleteBudget)


module.exports = router;