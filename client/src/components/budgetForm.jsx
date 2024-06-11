/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

const BudgetForm = ({ method, id }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) return navigate('/');

    }, []);



    useEffect(() => { if (id) fetchBudget(); }, [id]);
    const [budget, setBudget] = useState({ type: "", currency: "", transaction: "", amount: "" });
    const fetchBudget = async () => {
        const response = await fetch(`http://localhost:6510/getBudget/${id}`);
        const data = await response.json();
        setBudget(data.budget);
    };

    const addBudget = async (event) => {
        event.preventDefault();
        const url = id ? `http://localhost:6510/api/editBudget/${id}` : 'http://localhost:6510/createBudget';
        const method = id ? 'PUT' : 'POST';
        if (method === 'POST') budget.token = token;
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(budget)
        });
        if (response.status === 200) {
            window.location.href = '/budgets';
        }
    }
    const handleChange = (event) => {
        setBudget({ ...budget, [event.target.name]: event.target.value });
    };

    return (
        <div id="addBudgetForm" className="budgetForm">

            <form onSubmit={addBudget}>
                <div>
                    <img src={'/close.png'} alt="" onClick={() => { window.location.href = '/budgets' }} />
                </div>
                <h1>{id ? 'Update Budget' : 'New Budget'}</h1>
                <label htmlFor="type">Type:</label>
                <input list="Type" type="text" name="type" value={budget.type} onChange={handleChange} />
                <label htmlFor="Transaction">Transaction:</label>
                <input type="text" name="transaction" value={budget.transaction} onChange={handleChange} />
                <label htmlFor="Amount">Amount:</label>
                <input type="text" name="amount" value={budget.amount} onChange={handleChange} id="amount" />
                <label htmlFor="Currency">Currency:</label>
                <input type="text" list="currency" name="currency" value={budget.currency} onChange={handleChange} />
                <datalist id="currency">
                    <option value="USD" />
                    <option value="EUR" />
                    <option value="GBP" />
                    <option value="JPY" />
                    <option value="INR" />
                    <option value="CNY" />
                    <option value="AUD" />
                    <option value="CHF" />
                    <option value="CAD" />
                    <option value="NZD" />
                    <option value="HKD" />
                    <option value="SGD" />
                    <option value="SEK" />
                    <option value="NOK" />
                </datalist>
                <datalist id="Type">
                    <option value="Income" />
                    <option value="Expense" />
                </datalist>
                <button type="submit" >Save</button >
            </form>
        </div>
    );
}

export default BudgetForm;
