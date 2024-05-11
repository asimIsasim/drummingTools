import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Card from "@mui/material/Card";
import { ThemeContext } from "@emotion/react";
import pic from "../../public/rolls.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../context/userContext"; // Adjust the path as needed

export const Login = () => {
  //const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store server messages
  const navigate = useNavigate(); // Initialize useNavigate hook

  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          // Save token to local storage
          localStorage.setItem("token", data.token);

          setMessage("Login successful!");
          // Redirect to Learn page after successful login
          navigate("/");
        } else {
          setMessage("Login failed.");
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error occurred while trying to login:", error);
      setMessage("An error occurred while trying to login");
    }
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    setMessage("Logged out successfully!");
  };

  const handleCloseMessage = () => {
    setMessage(""); // Clear message when closing popup
  };

  return (
    <div className="flex w-full justify-center py-12">
      <Card sx={{ minWidth: 1200 }} variant="outlined">
        <div className="flex justify-center items-center mx-auto rounded-lg overflow-hidden">
          <img src={pic} alt="CD" className="h-[92vh]" />

          <div className="text-white w-full flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-semibold pb-4">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[500px] items-center gap-8 text-xl"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button variant="contained" size="large" type="submit">
                Login
              </Button>
            </form>
            <button onClick={handleLogout}>Logout</button>

            {message && (
              <div>
                <p>{message}</p>
                <button onClick={handleCloseMessage}>Close</button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}; // Add closing parenthesis here
