import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const SignUp = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            window.location.href = '/';
        }
    }, []);


    function shake(element) {
        const duration = 200; // in milliseconds
        const distance = 20; // in pixels

        const startTime = Date.now();

        function updatePosition() {
            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / duration;
            const offset = distance * Math.sin(progress * Math.PI * 2);
            element.style.transform = `translateX(${offset}px) `;

            if (elapsedTime < duration) {
                setTimeout(updatePosition, 1000 / 60); // Update roughly 60 times per second
            } else {
                element.style.transform = 'translateX(0)'; // Reset transform when animation ends
            }
        }
        updatePosition();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:6510/api/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.status === 201) {
                navigate("/");
            }
            else if (response.status === 404) {
                alert("User already exists");
            }
            else if(response.status===500){
                alert("Something went wrong")
            }
            else {
                throw new Error("Something went wrong");
            }

        } catch (error) {
            console.error("Error submitting data:", error);
        }

    };

    return (
        <div className='signup-page'>
            <div className='sign'></div>
            <form className='signup-form' id="addForm" onSubmit={handleSubmit}>
                <div className="accounts">
                    <h4> <Link to="/">Already have account?</Link>    </h4>
                </div>
                <h2>Welcome to financial data</h2>
                <h4>Register your account</h4>
                <label htmlFor="username">Username:</label>
                <input name="username" type="text" autoComplete="true" onChange={handleChange} />
                <label htmlFor="email">Email address:</label>
                <input name="email" type="email" autoComplete="true" onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" minLength="4" onChange={handleChange} />
                <button type="submit" id="btn">Submit</button>
            </form>
        </div>)
};

export default SignUp;