import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";

export const PracticeForm = () => {
  const [name, setName] = useState("");
  const [aim, setAim] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (name, aim) => {
    console.log({ name, aim });
    const formData = {
      name: name,
      aim: aim,
    };

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        console.error("User not logged in."); // Handle the case where the user is not logged in
        return;
      }

      const response = await fetch("http://localhost:3000/addRoutine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response, e.g., show success message
        console.log("Form data sent successfully!");
        toast.success("Routine Added !!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        // Handle error response, e.g., show error message
        console.error("Error sending form data.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error occurred while trying to send form data:", error);
    }

    setName("");
    setAim("");
    // Hide the form after submission
    setShowForm(false);
  };

  return (
    <div className="">
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Add Practice Routine
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            const aim = formJson.aim;
            console.log(name, aim);
            handleSubmit(name, aim);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Your Practice Routine Here</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Your Practice Routine Here</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="aim"
            name="aim"
            label="Aim"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>

      {showForm && (
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="aim">Aim:</label>
          <input
            type="text"
            id="aim"
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            required
          />
          <br />

          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};
