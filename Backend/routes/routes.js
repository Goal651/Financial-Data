const express = require('express')
const router = express.Router();
const { createBudget, getBudgets, updateBudget, getBudget, deleteBudget}=require('../controllers/budgetControllers')
const { getUsers, getUser, createUser, updateUser, deleteUser, checkUser } = require("../controllers/users")
const { dashBoard } = require('../controllers/pageControllers')

const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    }
    else {
        res.redirect('/login');
    }

}

//get users
router.get('/getUsers', getUsers)
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
router.get('/getBudgets', getBudgets)
router.get('/getBudget/:id', getBudget)

//Update budgets
router.put('/api/editBudget', updateBudget)

//delete budget
router.delete('/api/deleteBudget', deleteBudget)



//Routes about pages
router.get('/dashboard', requireAuth, dashBoard)





module.exports = router;