import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";
import router from "./components/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
);
