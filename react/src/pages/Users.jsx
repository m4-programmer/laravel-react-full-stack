import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const TableRow = ({data, handleDelete}) => {
    return (
        <tr>
            <td>{data?.id}</td>
            <td>{data?.name}</td>
            <td>{data?.email}</td>
            <td>{data?.created_at}</td>
            <td>
                <Link to={'/users/'+ data.id} className='btn-edit'> Edit</Link> &nbsp;
                <button onClick={() => handleDelete(data.id)}  className='btn-delete'> Delete</button>
            </td>
        </tr>
    )
}

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const handleDelete = (id) =>{
        if (!window.confirm("Are you sure, you want to delete this user?")){
            return
        }
        console.log(id)

        axiosClient.delete('/users/'+id).then(()=>{
            //todo: show notifications
            getUsers()
        })
    }
    const getUsers = () =>{
        setLoading(true)
        axiosClient.get('/users').then(({data})=>{
            setLoading(false)
            setUsers(data)
            console.log(data)
        }).catch(e=>{
            console.log(e)
            setLoading(false)
        })
    }
    useEffect(()=>{
        getUsers()
    },[])
    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Users</h1>
                <Link to='/users/create' className="btn-add">Add new </Link>
            </div>
            <div className="card animated fadeInDown">
                <p><b>Total Users</b>: {users.total} </p><br/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Creat Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading ? <p>Loading...</p> : <tbody>
                    {(users && users.data) && users.data.map((item)=> <TableRow key={item.id} data={item} handleDelete={handleDelete} />) }
                    </tbody>}
                </table>
            </div>
        </div>
    )
}

export default Users
