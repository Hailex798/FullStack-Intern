import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../UserContext";

const ProtectedRoute = ({ children }) => {
        const allowedRoles = ["admin", "agent"];
        const { userData } = useUser();
        const location = useLocation();
      
        if (!userData) {
          console.warn("Redirecting to login due to missing userData.");
          return <Navigate to="/" state={{ from: location }} replace />;
        }
      
        if (!userData.userType || !allowedRoles.includes(userData.userType)) {
          alert("Redirecting to dashboard due to unauthorized access.");
          return <Navigate to="/dashboard" replace />;
        }
      
        return children;
      };
      

export default ProtectedRoute;
