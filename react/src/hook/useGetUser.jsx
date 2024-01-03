import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const useGetUser = (id) =>{
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const getUser = id => {
        if (id) {
            setLoading(true)
            axiosClient.get('/users/' + id).then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            return true;
        }
    }
    useEffect(()=>{
        getUser(id)
    },[])
    return {loading, setLoading, getUser, user, setUser}
}
export default useGetUser;
