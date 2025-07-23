import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Authentication/Register";
import Otp from "./pages/Authentication/Otp";
import Login from "./pages/Authentication/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import VerifyPassword from "./pages/Authentication/VerifyPassword";
import Home from "./pages/Authentication/Home";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectRoute from "./routes/ProtectRoute";
import ErrorPage from "./pages/Authentication/ErrorPage";
const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Home />
        </ProtectRoute>
      ),
    },
    {
      path: "*",
      element: (
        <ProtectRoute>
          <ErrorPage />
        </ProtectRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoutes>
          <Register />
        </PublicRoutes>
      ),
    },
    {
      path: "/otp",
      element: (
        <PublicRoutes>
          <Otp />
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/forgetPassword",
      element: (
        <PublicRoutes>
          <ForgetPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "/verifyPassword",
      element: (
        <PublicRoutes>
          <VerifyPassword />
        </PublicRoutes>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
