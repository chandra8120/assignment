import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(" RequireAuth Component ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default RequireAuth;
