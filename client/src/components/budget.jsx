/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Cookies from "js-cookie";
// import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import BudgetForm from "./budgetForm";
import BudgetSideBar from "./budgetSiderBar";

const Budget = () => {
    const token = localStorage.getItem('token');
    const [budgets, setBudgets] = useState([]);
    const username = Cookies.get('username');
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [method, setMethod] = useState('POST');
    const [id, setId] = useState(null);


    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) return navigate('/');

    }, []);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await fetch(`http://localhost:6510/getBudgets/${token}`, { method: 'GET' });
                const data = await response.json();
                setBudgets(data.budgets);

                const totalIncome = data.budgets
                    .filter(budget => budget.type === "Income")
                    .reduce((acc, budget) => acc + budget.amount, 0);
                const totalExpense = data.budgets
                    .filter(budget => budget.type === "Expense")
                    .reduce((acc, budget) => acc + budget.amount, 0);
                setIncome(totalIncome);
                setExpense(totalExpense);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };
        fetchBudgets();
    }, [username]);

    const editBudget = async (id) => {
        setShowForm(true);
        setMethod('PUT');
        setId(id);
    };

    const deleteBudget = async (id) => {
        const response = await fetch('http://localhost:6510/api/deleteBudget', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (response.status === 200) window.location.reload();
    };

    const customTooltip = ({ payload }) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{payload[0].name}</p>
                    <p>{`Amount: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="budgets">
            <Header />
            <div className="budget-sidebar">
                <BudgetSideBar expense={expense} income={income} />
            </div>
            {showForm && <BudgetForm id={id} method={method} />}
            <div className="budgets-body">
                {/* <div className="chart-container">
                    <div className="pie-chart-container">
                        <h2>Pie Chart</h2>
                        <PieChart width={400} height={400}>
                            <Pie data={budgets} dataKey="amount" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {budgets.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#ff6384', '#36a2eb', '#ffce56'][index % 3]} />
                                ))}
                            </Pie>
                            <Tooltip content={customTooltip} />
                        </PieChart>
                    </div>

                </div> */}
                <div className="budget-ui">
                    <button id="addBudget" onClick={() => setShowForm(true)}>Add Budget</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Transaction</th>
                                <th>Amount</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgets.map((budget) => (
                                <tr key={budget._id}>
                                    <td>{budget.type}</td>
                                    <td>{budget.transaction}</td>
                                    <td>{budget.amount} ({budget.currency})</td>
                                    <td><button className="edit" onClick={() => editBudget(budget._id)}>Edit</button></td>
                                    <td><button className="delete" onClick={() => deleteBudget(budget._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Budget;
