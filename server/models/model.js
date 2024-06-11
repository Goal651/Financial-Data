const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, require: true},
        email: { type: String, require:true },
        password: { type: String, require: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
)
const budgetSchema = mongoose.Schema(
    {
        user: { type: String, require: true },
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

const User = mongoose.model("users", userSchema)
const Budget = mongoose.model("budgets", budgetSchema)

module.exports = { User, Budget };