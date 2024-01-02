import React from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const DefaultLayout = () => {
    const {token, user, setToken} = useStateContext()
    if (!token){
        return  <Navigate to={'/login' } />
    }

    function handleLogout(e) {
        e.preventDefault();
        setToken("");
        console.log("User Logged out")
    }

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

     </div>
  )
}

export default DefaultLayout
