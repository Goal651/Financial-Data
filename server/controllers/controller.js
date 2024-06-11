const { User, Budget } = require("../models/model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exists" });
        const newUser = new User({ username, email, password: hash });
        const savedUser = await newUser.save();
        if (!savedUser) return res.status(500).json({ message: "Failed to save user" });
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const checkUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "Wrong email!" });
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) return res.status(401).json({ message: "Wrong credentials!" });
        jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" }, (err, token) => {
            if (err) return res.status(500).json({ message: "Internal server error" });
            res.status(200).json({ token: token });
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}



const updateUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await Product.findByIdAndUpdate(id, req.body)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: 'User updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await Product.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createBudget = async (req, res) => {
    try {
        console.log(req.body);
        const { token, ...budgetDetails } = req.body;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
            req.user = decoded;
        });
        const newBudget = { ...budgetDetails, user: req.user.email }
        const budget = await Budget.create(newBudget);
        if (!budget) return res.status(404).json({ message: "Failed to save budget" });
        res.status(200).json({ message: "Budget saved" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}


const getBudgets = async (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
            console.log(decoded)
            req.user = decoded;
        });
        const budgets = await Budget.find({ user: req.user.email })
        if (!budgets) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ budgets })
    }
    catch (error) { }
}


const getBudget = async (req, res) => {
    try {
        const id = req.params.id;
        const budget = await Budget.findById(id)
        if (!budget) return res.status(404).json({ message: 'Budget Not Found' });
        res.status(200).json({ budget })
    } catch (error) {
        console.error(error);
    }
}



const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, currency, transaction, amount } = req.body;
        const update = { type, currency, transaction, amount };
        const updatedBudget = await Budget.findByIdAndUpdate(id, update, { new: true });
        if (!updatedBudget) return res.status(404).json({ error: "Budget not found" });
        res.status(200).json(updatedBudget);
    } catch (error) {
        console.error("Error updating budget:", error);
        res.status(500).json({ error: "An error occurred while updating the budget" });
    }
};


const deleteBudget = async (req, res) => {
    try {
        const id = req.body.id;
        const deleted = await Budget.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: 'Failed to delete' });
        res.status(200).json({ message: 'success' });
    } catch (error) { }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    checkUser,
    createBudget,
    getBudgets,
    getBudget,
    updateBudget,
    deleteBudget
}