import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";

export default function SessionForm({ id }) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not logged in.");
        return;
      }

      const response = await fetch(`http://localhost:3000/add-session/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Form data sent successfully!");
        toast.success("Session Added !!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        const errorText = await response.text();
        console.error("Error sending form data:", errorText);
      }
    } catch (error) {
      console.error("Error occurred while trying to send form data:", error);
    }

    setDescription("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the file is an audio file
    if (selectedFile && !selectedFile.type.startsWith("audio/")) {
      // If the file is not an audio file, show a toast and return
      toast.error("Invalid file type. Please select an audio file.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // If the file is an audio file, update the file state variable
    setFile(selectedFile);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "20px" }}
      >
        Add Session
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Session Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
