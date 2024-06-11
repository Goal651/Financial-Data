import React from "react";
import { Link, useNavigate } from "react-router-dom"


const BudgetSideBar = ({ expense, income }) => {

    return (
        <div>
            <div className="budgetSummary">
                <div>
                    <h4>Earnings</h4>
                    <h2>${income}</h2>
                </div>
                <div>
                    <h4>Spendings</h4>
                    <h2>${expense}</h2>
                </div>
            </div>

        </div>
    )


}



export default BudgetSideBar