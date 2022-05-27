import { Navigate } from "react-router-dom";

// pages
import Dashboard from "../pages/Dashboard"
import Product from "../pages/Product"
import Login from "../pages/Login"
import Kanban from "../pages/Kanban"
import User from "../pages/User"
import Register from "../pages/Register"
import Mail from '../pages/Mail'
import Profile from '../pages/Profile'

import MainLayout from "../layouts/MainLayout/MainLayout";
//configs
import { PATH_NAME } from "../configs"
import GuestGuard from "./GuestGuard";
import AuthGuard from "./AuthGuard";



export const navbarConfig1 = [
    {
        title:'Profile',
        href: PATH_NAME.PROFILE
    },
    {
        title: 'User',
        href: PATH_NAME.USER,
    },
]

export const navbarConfig2 = [
    {
        title:'Dashboard',
        href: PATH_NAME.DASHBOARD
    },
    {
        title: 'Product',
        href: PATH_NAME.PRODUCT
    },
    {
        title: 'Kanban',
        href: PATH_NAME.KANBAN
    },
    {
        title: 'Mail',
        href: PATH_NAME.MAIL
    },
]

export const routesConfig = [
    {
        path: PATH_NAME.ROOT,
        element: () => <Navigate to = {PATH_NAME.PROFILE}/>
    },
    {
        path: PATH_NAME.DASHBOARD,
        element: Dashboard,
        layout: MainLayout,
        guard: AuthGuard
    },
    {
        path: PATH_NAME.PRODUCT,
        element: Product,
        layout: MainLayout,
        guard: AuthGuard
    },
    {
        path: PATH_NAME.LOGIN,
        element: Login,
        guard: GuestGuard
    },
    {
        path: PATH_NAME.KANBAN,
        element: Kanban,
        layout: MainLayout,
        guard: AuthGuard
    },
    {
        path: PATH_NAME.USER,
        element: User,
        layout: MainLayout,
        guard: AuthGuard
    },
    {
        path: PATH_NAME.REGISTER,
        element: Register,
        guard: GuestGuard
        
    },
    {
        path: PATH_NAME.MAIL,
        element: Mail,
        layout: MainLayout,
        guard: AuthGuard
    },
    {
        path: PATH_NAME.PROFILE,
        element: Profile,
        layout: MainLayout,
        guard: AuthGuard
    }
]