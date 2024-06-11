import { useState, useEffect } from "react";
import Cookies from 'js-cookie'




const Greet = (username) => {


    useEffect(() => {
        const username = Cookies.get('username');
        if (!username) {
            window.location.href = '/';
        }
    }, [])
    console.log(username)

    return (
        <div>
            <h1>Hello{username.username}</h1>
        </div>
    )
}
export default Greet