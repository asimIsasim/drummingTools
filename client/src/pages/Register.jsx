import React, { useState } from "react";
import Card from "@mui/material/Card";
import { ThemeContext } from "@emotion/react";
import download from "../../public/this.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import toast from "react-hot-toast";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store server messages

  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password };
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }); // Set server message
        setMessage(data.message); // Set server message
        // Clear form fields after successful registration
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error); // Set server error message
        toast.error("Password Must Be 5 character", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }); // Set server error message
      }
    } catch (error) {
      console.error("Error occurred while trying to signup:", error);
      setMessage("An error occurred while trying to signup");
    }
  };

  const handleCloseMessage = () => {
    setMessage(""); // Clear message when closing popup

    // Close the Snackbar
    setState({ ...state, open: false });
  };

  return (
    <div className="flex w-full justify-center py-12">
      <Card sx={{ minWidth: 1200 }} variant="outlined">
        <div className="flex justify-center items-center mx-auto rounded-lg overflow-hidden">
          <img src={download} alt="CD" className="h-[92vh]" />
          <div className="text-white w-full flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-semibold pb-4">Register</h1>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col w-[500px] items-center gap-8 text-xl"
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                size="large"
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

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
                Register
              </Button>
              {message && (
                <div className="popup">
                  <p>{message}</p>
                  <button onClick={handleCloseMessage}>Close</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};
