import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserDetails from "../components/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        {
            index: true,
            loader: ()=>fetch('http://localhost:3000/users'),
            Component: Home
        },
        {
            path: '/register',
            Component: Register
        },
        {
            path: '/login',
            Component: Login
        },
        {
          path: '/userDetails/:id',
          loader: ({params})=>fetch(`http://localhost:3000/users/${params.id}`),
          Component: UserDetails
        }
    ]
  },
]);