const { User, Budget } = require("../models/model")
const session=require('express-session');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findById(email)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await User.findOne({ email: email });
        if (!users) {
            const createdUser = await User.create(req.body);

            if (!createdUser) {
                res.status(200).json({ message: "Added" })
                return;
            } else {
                res.redirect('/login')
            }

        } else {
            res.status(404).json({ message: 'Exist' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const checkUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: 'Dont exist' });
    }
    else {
        const userPassword = await User.findOne({ email: email, password: password })
        if (!userPassword) {
            res.status(401).json({ message: "Incorrect" })
        }
        else {
            const userId = userPassword._id;
            req.session.userId = userId;
            res.status(200).json({ message: "Success" })
        }
    }
}



const updateUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await Product.findByIdAndUpdate(id, req.body)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ message: 'User updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await Product.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else {
            res.status(200).json({ message: 'User deleted successfully' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    checkUser
}