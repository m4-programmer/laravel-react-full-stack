import React from 'react';
import {Link} from "react-router-dom";

const Signup = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="login-signup-form fadeInDown animated">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup Now
                    </h1>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Have an account? <Link to="/login" >Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
