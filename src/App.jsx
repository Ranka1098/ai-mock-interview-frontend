import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Authentication/Register";
import Otp from "./pages/Authentication/Otp";
import Login from "./pages/Authentication/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import VerifyPassword from "./pages/Authentication/VerifyPassword";
import Home from "./pages/Authentication/Home";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/verifyPassword",
      element: <VerifyPassword />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
