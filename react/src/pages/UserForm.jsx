import React, {useState, useRef, useEffect} from 'react';
import {Link, useParams,useNavigate } from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import useGetUser from "../hook/useGetUser.jsx";

const UserForm = () => {

    const {setNotification} = useStateContext()
    const {id} = useParams();
    const {setLoading, loading,setUser,user} = useGetUser(id)
    const navigate = useNavigate();

    const [error, _setError] = useState(null);

    const setError = error => {
        _setError(error)
        setTimeout(()=>{_setError(null)}, 4000)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const payload  = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        }
        //we update the user records
        setLoading(true)
        if (id){

            axiosClient.put('/users/'+id, payload).then(({data})=>{
                setLoading(false)
                setNotification("User Updated Successfully")
            }).catch(error => {
                setLoading(false)
                const response = error.response
                if (response && response.status === 422){
                    setError(response.data.errors)
                    console.log(response.data.errors);
                }
            })
        }else{
            //we create a new user
            axiosClient.post('/users', payload).then(({data})=>{
                console.log(data)
                setLoading(false)
                setNotification("User Created Successfully")
                return navigate('/users')
            }).catch(error => {
                setLoading(false)
                const response = error.response
                if (response && response.status === 422){
                    setError(response.data.errors)
                    console.log(response.data.errors);
                }
            })
        }

    }
    return (
        //write condition that will display h1 of user name or a text New user
     <div className='card fadeInDown animated'>
         {loading && (<div className="text-center"><h3>Loading...</h3></div>)}
         {/*Show the form , and display errors, i can copy forms from signup page and it should show if loading is false*/}
         <div className="form">
             <form onSubmit={onSubmit}>
                 <h1 className="title ">
                     { id ? user?.name : "New User" }
                 </h1><br/>
                 <input onChange={(e)=>{setUser({...user, name: e.target.value})}} value={user.name ?? ''} type="text" placeholder="Name"/>
                 {error && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.name}</p>}

                 <input onChange={(e)=>{setUser({...user, email: e.target.value})}} value={user.email ?? ''} type="email" placeholder="Email"/>
                 {error && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.email}</p>}
                 {/*Password fields will show conditionally*/}
                 <input onChange={(e)=>{setUser({...user, password: e.target.value})}}  type="password" placeholder="Password"/>
                 {(error && error.password) && <p style={{color: 'red',marginTop: '-15px',paddingBottom: '5px'}}>{error?.password}</p>}
                 <input onChange={(e)=>{setUser({...user, password_confirmation: e.target.value})}}  type="password" placeholder="Confirm Password"/>
                 <button className="btn btn-block">{ id ? "Update" : "Save"}</button>

             </form>
         </div>
     </div>
  )
}

export default UserForm
