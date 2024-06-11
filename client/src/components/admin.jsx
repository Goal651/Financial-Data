/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const AdminPage = () => {
    const navigate=useNavigate();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const result = await fetch('http://localhost:6510/api/getUsers', { method: 'get' });
                if (!result.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await result.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);
    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) return navigate('/');
      
    }, []);


    return (
        <div className="admin-page">
            <Header />
            <h1>ADMIN</h1>
            <div id="feedback"></div>
            <table>
                <thead>
                    <th><input className="checked" id="how" type="checkbox" /></th>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th><button id="delete" className="selected" >Delete Selected</button></th>
                    <th><button id="deleteAll" className="all" >Delete All</button></th>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td><button id="edit" >Edit</button></td>
                            <td><button id="delete" >Delete</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div id="pagination"></div>
        </div>
    )
}

export default AdminPage;