const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, require: [true, "Please enter username"] },
        email: { type: String, require: [true, "please enter email"] },
        password: { type: String, require: [true, "please enter your password"] },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
)
const budgetSchema = mongoose.Schema(
    {
        type: { type: String, require: true },
        currency: { type: String, require: true },
        transaction: { type: String, require: true },
        amount: { type: Number },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }

)

const User = mongoose.model("user", userSchema)
const Budget = mongoose.model("budgets", budgetSchema)

module.exports = { User, Budget };