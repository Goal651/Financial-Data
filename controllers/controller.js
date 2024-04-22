const { Product } = require("../models/users")



const getUsers = async (req, res) => {
    try {
        const users = await Product.find({})
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Product.findById(email)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await Product.findOne({ email: email });
        if (!users) {
            const user = await Product.create(req.body)
            res.status(200).json({ message: "Added" })
        } else {
            res.status(200).json({ message: 'Exist' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkUser = async (req, res) => {
    const { email, password } = req.body
    const user = await Product.findOne({ email: email })
    if (!user) {
        res.status(404).json({ message: 'Dont exist' })
    } else {
        const userPassword = await Product.findOne({ email: email, password: password })
        if (!userPassword) {
            res.status(401).json({ message: "Incorrect" })
        } else {
            res.cookie('user_id', user._id, { maxAge: null })
            res.status(200).json({ message: "Success" })
        }
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('user_id')
    res.status(200).json({ message: 'Logged out' })
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
    checkUser,
    logoutUser,
}