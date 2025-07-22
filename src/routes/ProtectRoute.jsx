import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default ProtectRoutes;
