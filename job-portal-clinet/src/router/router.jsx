import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SingnIn/SignIn";
import JobDetails from "../pages/jobsDetails/JobDetails";
import PrivateRoute from "../AuthContext/PrivateRoute";
import JobApplay from "../pages/ApplayJobs/JobApplay";

const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {index:true,Component:Home},
    {
      path:'/jobDetails/:id',
      loader:({params})=>fetch(`http://localhost:3000/jobs/${params.id}`),
      Component:JobDetails
    },
    {
      path:'/jobApplay/:id',
      element:<PrivateRoute><JobApplay></JobApplay></PrivateRoute>,

    },
    {
      path:'/register',
      Component:Register
    },
    {
      path:'/signin',
      Component:SignIn
    }
   ]
  },
]);

export default router;