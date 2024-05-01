const { Budget } = require('../models/model')




const createBudget = async (req, res) => {
    try {

        const data = req.body;
        const budget = await Budget.create(data);
        if (!budget) {
            res.status(404).json({ message: "Failed to save budget" });
        }
        else {
            res.status(200).json({ message: "Budget saved" })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
}



const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({})
        if (!budgets) {
            res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json({ budgets })
    }
    catch (error) { }
}


const getBudget = async (req, res) => {
    try {
        const id = req.params.id;
        const budget = await Budget.findById(id)
        if (!budget) {
            res.status(404).json({ message: 'Budget Not Found' })
            return;
        }
        res.status(200).json({ budget })

    } catch (error) {

    }
}



const updateBudget = async (req, res) => {
    try {
        const { id, type, currency, transaction, amount } = req.body;
        const update = { type, currency, transaction, amount };


        const updatedBudget = await Budget.findByIdAndUpdate(id, update, { new: true });

        if (!updatedBudget) {
            return res.status(404).json({ error: "Budget not found" });
        }

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
        if (!deleted) {
            res.status(404).json({ message: 'Failed to delete' })
            return;
        }
        res.status(200).json({ message: 'success' });

    } catch (error) { }
}



module.exports = {
    createBudget, updateBudget, getBudget, getBudgets, deleteBudget
}