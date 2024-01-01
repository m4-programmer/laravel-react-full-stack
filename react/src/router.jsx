import {createBrowserRouter, Navigate} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Users from "./pages/Users.jsx";
import NotFound from "./pages/Notfound";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/users'} />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },

    {
        path: '*',
        element: <NotFound />
    },
]);

export default router;
