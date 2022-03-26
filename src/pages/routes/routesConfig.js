import { Navigate } from "react-router-dom";

// pages
import Dashboard from "../Dashboard"
import Product from "../Product"
import Login from "../Login"
import Kanban from "../Kanban"
import User from "../User"
//import Register from "../Register"

//configs
import { PATH_NAME } from "../../configs"

export const navbarConfig = [
    {
        title: 'Product',
        href: PATH_NAME.PRODUCT
    },
    {
        title: 'Kanban',
        href: PATH_NAME.KANBAN
    },
    {
        title: 'User',
        href: PATH_NAME.USER
    }
]

export const routesConfig = [
    {
        path: PATH_NAME.ROOT,
        element: () => <Navigate to = {PATH_NAME.DASHBOARD}/>
    },
    {
        path: PATH_NAME.DASHBOARD,
        element: Dashboard
    },
    {
        path: PATH_NAME.PRODUCT,
        element: Product
    },
    {
        path: PATH_NAME.LOGIN,
        element: Login
    },
    {
        path: PATH_NAME.KANBAN,
        element: Kanban
    },
    {
        path: PATH_NAME.USER,
        element: User
    }
    // {
    //     path: PATH_NAME.REGISTER,
    //     element: Register
    // }
]