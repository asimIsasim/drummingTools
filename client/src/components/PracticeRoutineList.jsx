import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export const PracticeList = () => {
  const [practiceRoutines, setPracticeRoutines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in.");
      navigate("/login");
      return;
    }

    const fetchPracticeRoutines = async () => {
      try {
        const response = await fetch("http://localhost:3000/getRoutines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Received practice routines:", responseData);
          setPracticeRoutines(responseData);
          toast.success("Practice routines fetched successfully!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          console.error("Failed to fetch practice routines");
        }
      } catch (error) {
        console.error(
          "Error occurred while fetching practice routines:",
          error
        );
      }
    };

    fetchPracticeRoutines();
  }, []);

  useEffect(() => {
    // Check if practiceRoutines array is empty
    if (practiceRoutines.length === 0) {
      console.log("No practice routines found.");
    }
  }, [practiceRoutines]); // Run this effect whenever practiceRoutines changes

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-4">Your Practice Routines</h2>
      <ul>
        {practiceRoutines.map((routine, index) => (
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              {routine.name}
            </AccordionSummary>
            <AccordionDetails>{routine.aim}</AccordionDetails>
            <AccordionActions>
              <Button>
                <Link to={`/practiceDetails/${routine.practice_routine_id}`}>
                  View Sessions
                </Link>
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </ul>
    </div>
  );
};
