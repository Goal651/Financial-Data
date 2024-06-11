import { Link} from 'react-router-dom';



const Header = () => {

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTimestamp');
        window.location.href = '/'; 
    }

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Financial Data</Link>
            </div>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={() => { logout() }}>Log Out</button>
            </div>
        </div>
    );
};


export default Header;