import React, { useEffect } from "react";

import { CourseList } from "../components/CoursesList";

export const Learn = () => {
  useEffect(() => {
    const isMember = JSON.parse(localStorage.getItem("isMember"));
    if (!isMember) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="px-40 py-12">
      <CourseList />
    </div>
  );
};
