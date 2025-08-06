import { createBrowserRouter } from "react-router";
import App from '../App';

import Login from "../pages/Login";
import Register from "../pages/Register"
import Table from "../pages/Table"; 
import Form from "../pages/Form";

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {index:true, element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'table', element:<Table/>},
      {path:'form',element:<Form/>}
    ]
  }
]);

export default router;