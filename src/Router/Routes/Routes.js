import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddServices from "../../Pages/AddServices/AddServices";
import Blogs from "../../Pages/Blogs/Blogs";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import MyBooking from "../../Pages/MyBooking/MyBooking";
import Review from "../../Pages/Review/Review";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add_services",
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/review/:id",
        element: (
          <PrivateRoute>
            <Review />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://peace-tourism-app.vercel.app/services/${params.id}`),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
