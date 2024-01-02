import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const Signup = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [error, _setError] = useState(null);
    const {setToken,setUser} = useStateContext()

    const setError = error => {
        _setError(error)
        setTimeout(()=>{_setError(null)}, 4000)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const payload  = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        }
        axiosClient.post('/signup', payload).then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        }).catch(error => {
            const response = error.response
            if (response && response.status === 422){
                setError(response.data.errors)
                console.log(response.data.errors);
            }
        })
    }
    return (
        <div className="login-signup-form fadeInDown animated">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup Now
                    </h1>
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    {error && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.name}</p>}

                    <input ref={emailRef} type="email" placeholder="Email"/>
                    {error && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.email}</p>}
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    {error && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.password}</p>}
                    <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password"/>
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
