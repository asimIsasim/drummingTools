import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { ThemeContext } from "@emotion/react";
import pic from "../../public/hands.jpg";
import Button from "@mui/material/Button";

export const Home = () => {
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("User not logged in.");
          return;
        }

        const response = await fetch("http://localhost:3000/getProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("User data:", responseData);
          // localStorage.setItem("user", JSON.stringify(responseData));
          localStorage.setItem("user", responseData.user.name);
          setUser(responseData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    getUser();
  }, [user]);

  return (
    <div className="flex w-full justify-center py-12">
      <Card sx={{ minWidth: 1200 }} variant="outlined">
        <div className="flex justify-center items-center mx-auto rounded-lg overflow-hidden">
          <img src={pic} alt="CD" className="h-[92vh]" />

          <div className="text-white w-full flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-semibold pb-4">Drumming Tools</h1>
            <h2 className="text-2xl font-semibold pb-4">
              Everything you need to learn THE Instrument!
            </h2>
          </div>
        </div>
      </Card>
    </div>
  );
};
