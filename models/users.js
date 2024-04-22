const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
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
        budget_id: { type: String, },
        u: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        createdAt: { type: Date, default: Date.now }
    }
)

const Product = mongoose.model("user", productSchema)

module.exports = { Product, budgetSchema };