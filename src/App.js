import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Login from "./container/Login/Login";
import Signup from "./container/Signup/Signup";
import TopPage from "./container/Home/TopPage";

// import ForgotPassword from "./containers/Layout/TopNav/ForgotPass/ForgotPass";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <TopPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
