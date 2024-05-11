import { BrowserRouter, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Navbar = () => {
  const { user } = useContext(UserContext);

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
            <ul>
              <div className="flex gap-4">
                {user ? (
                  <li>Welcome, {user.name}!</li>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
