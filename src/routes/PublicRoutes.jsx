import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default PublicRoutes;
