/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "./header";
import Greet from "./greeting";
import Cookies from 'js-cookie';

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) return navigate('/');
      
    }, []);

    return (
        <div className="home-page">
            <Header />

            {/* <div id="sidebar">
                <nav>
                    <Link to="/incomeStatements">INCOME STATEMENT</Link>
                    <Link to="/budgets">BUDGET</Link>
                    <Link to="/financialForecasts">FINANCIAL FORECASTS</Link>
                    <Link to={"/expenseReports"}>EXPENSE REPORT</Link>
                </nav>
            </div> */}



            {/* <!-- <div id="dark-mode">
            <label class="switch">
                <input type="checkbox" class="hello" id="darkModeToggle">
                <span class="slider round"></span>
            </label>
        </div> --> */}
            <div className="home">
                <h1>FINANCIAL DATA</h1>
                <div id="home">
                    <img src="/icons/income.jpg" alt="" />
                    <section className="income">
                        <Link to={"/incomeStatements"}>INCOME STATEMENT</Link>
                        <p>An income statement is a financial statement that shows the revenue, expenses, gains, and losses of a
                            business over a specific accounting period</p>
                    </section>


                    <section className="budget">
                        <Link to={"/budgets"}>BUDGET</Link>
                        <p>A budget is a plan that shows how much money you have and how you will spend it over a certain period of
                            time.</p>
                    </section>
                    <img src="/budget-icon-png-14.png" alt="" />

                    <section className="finafore">
                        <Link to={"/financialForecasts"}>FINANCIAL FORECASTS</Link>
                        <p>A financial forecast is a projection or estimation of future financial outcomes for a business,
                            organization, or individual</p>
                    </section>

                    <section class="expenses">
                        <Link to={"/expenseReports"}>EXPENSE REPORT</Link>
                        <p></p>
                    </section>
                </div>

                <footer>
                    <div class="admin">
                        <Link to={"/admin"}> Go to Admin Page </Link>
                    </div>
                    <ul>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </ul>
                    <ul>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </ul>


                    <nav>
                        <i class="fa fa-phone-alt"></i>Contact us on:<br />
                        <i class="fa fa-envelope"></i> Email:bugiriwilson651@gmail.com<br />
                        <i class="fa fa-mobile-alt"></i>Telephone:+250-7911-0180
                        <p>&copy; 2024 Financial Data. All rights reserved.</p>
                    </nav>


                </footer>
            </div>
        </div >
    )
}

export default HomePage;