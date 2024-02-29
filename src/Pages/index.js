import Login from "../../src/Pages/Login/Login.jsx"
import Index from "./Index/Index";
import IndexLayout from "../Layouts/IndexLayout";
import Repuestos from './Repuestos/Repuestos.jsx'
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexLayout />,
        children: [
            { path: '/', element: <Index />},
            { path: '/login', element: <Login /> },
            { path: '/repuestos', element: <Repuestos /> },
        ]
    },
])