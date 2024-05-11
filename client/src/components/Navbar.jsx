import { BrowserRouter, NavLink } from "react-router-dom";
//import "./Navbar.css";
import Button from "@mui/material/Button";
import logo from "../../public/sticks.jpg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from local storage
    window.location.reload();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMessage("Logged out successfully!");
  };
  return (
    <>
      <header className="py-6 px-40 bg-stone-950">
        <div className="container flex items-center justify-between">
          <div className="logo-brand flex gap-12 items-center">
            <NavLink to="/" className="text-2xl">
              DrummingTools
            </NavLink>
            <ul className="flex gap-6">
              <li>
                <NavLink to="/learn"> Learn </NavLink>
              </li>
              <li>
                <NavLink to="/practice"> Practice </NavLink>
              </li>
            </ul>
          </div>

          <nav>
            {token && (
              <ul>
                <div className="flex items-center gap-4">
                  <li>
                    <NavLink to="/profile">
                      <div className="flex items-center gap-2 text-xl">
                        {" "}
                        <AccountBoxIcon />
                        {user}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <Button onClick={handleLogout} variant="outlined">
                      Logout
                    </Button>
                  </li>
                </div>
              </ul>
            )}
            {!token && (
              <ul>
                <div className="flex gap-4">
                  <li>
                    <NavLink to="/register">
                      <Button variant="outlined">Register</Button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">
                      <Button variant="outlined">Login</Button>
                    </NavLink>
                  </li>
                </div>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
