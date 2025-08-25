import { createBrowserRouter } from "react-router";
import App from '../App';
import MemberDetail from '../pages/memberDetails';
import Login from "../pages/Login";
import Register from "../pages/Register"
import Member from "../pages/Member"; 
import Form from "../pages/Form";

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {index:true, element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'member', 
      element:<Member/>,
      children:[
        {path: ":memberId",element:<MemberDetail/>}
      ]
      },
      {path:'form',element:<Form/>}
    ]
  }
]);

export default router;