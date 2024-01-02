import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {setUser,setToken} = useStateContext()
    const [error, _setError] = useState(null)

    const setError = error => {
        _setError(error)
        setTimeout(()=>{_setError(null)}, 4000)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        //we get the user inputs
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log(payload)
        //we send it to the server
        axiosClient.post('/login', payload).then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        }).catch((err)=>{
            const {response} = err

            if (response && response.status === 404){
                setError({message: response.data.message})

            }
            if (response && response.status === 422){
                setError(response.data.errors)

            }
        })
    }
    return (
        <div className="login-signup-form fadeInDown animated">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    {(error && error.email) && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.email}</p>}
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    {(error && error.password) && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.password}</p>}
                    {(error && error.message) && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.message}</p>}
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup" >Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
