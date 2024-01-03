import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

const DefaultLayout = () => {
    const {token, user, setToken, setUser, notification} = useStateContext()
    if (!token){
        return  <Navigate to={'/login' } />
    }

    const  handleLogout = e => {
        e.preventDefault();
        axiosClient.post('/logout').then(()=>{
            setToken(null)
            setUser({})
        })
    }
    useEffect(()=>{
        axiosClient.get('/user').then(({data})=>{
            console.log(data)
            setUser(data)
        })
    },[])
    return (
     <div id={"defaultLayout"}>
         <aside>
             <Link to='/dashboard' >Dashboard</Link>
             <Link to='/users' >Users</Link>
         </aside>
         <div className="content">
             <header>
                 <div>
                     Header
                 </div>
                 <div>
                     {user.name ?? "N/A"}
                     <a href="#" onClick={handleLogout} className="btn-logout">Logout</a>
                 </div>
             </header>
             <main>
                 <Outlet />
             </main>
         </div>
         {notification &&  <div className="notification">
             {notification}
         </div>
         }
     </div>
  )
}

export default DefaultLayout
