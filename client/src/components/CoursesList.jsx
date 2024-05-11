import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/getCourses");
        if (response.ok) {
          const coursesData = await response.json();
          setCourses(coursesData);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error occurred while fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const fetchLessonsForCourse = async (courseId) => {
    setLessons([]); // Clear previous lessons
    try {
      const response = await fetch(
        `http://localhost:3000/getLessons?courseId=${courseId}`
      );
      if (response.ok) {
        const lessonsData = await response.json();
        setLessons(lessonsData);
      } else {
        console.error("Failed to fetch lessons for the course");
      }
    } catch (error) {
      console.error("Error occurred while fetching lessons:", error);
    }
  };

  const handleCourseClick = (courseId) => {
    if (selectedCourse !== courseId) {
      setSelectedCourse(courseId);
      fetchLessonsForCourse(courseId);
    }
  };

  const videoBaseUrl = "http://localhost:3000/uploads/";

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-2">Available Courses</h2>

      <ButtonGroup variant="text" aria-label="Basic button group">
        {courses.map((course) => (
          <Button
            key={course.course_id}
            onClick={() => handleCourseClick(course.course_id)}
            style={{ cursor: "pointer" }}
          >
            {course.name}
          </Button>
        ))}
      </ButtonGroup>

      {selectedCourse && (
        <div className="mt-6">
          <div className="grid grid-cols-3">
            {" "}
            {/* Ensure vertical layout */}
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                // <div key={lesson.lesson_id} style={{ marginBottom: "20px" }}>
                //   {" "}
                //   {/* Add spacing between lessons */}
                //   <h4>{lesson.title}</h4>
                //   <p>{lesson.description}</p>
                //   {lesson.video && (
                //     <video
                //       controls
                //       src={`${videoBaseUrl}${lesson.video}`}
                //       style={{
                //         maxWidth: "100%",
                //         height: "auto",
                //         width: "500px",
                //       }} // Control size of the video
                //     >
                //       Your browser does not support the video tag.
                //     </video>
                //   )}
                // </div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <video
                      controls
                      src={`${videoBaseUrl}${lesson.video}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "500px",
                      }} // Control size of the video
                    ></video>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {lesson.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lesson.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <p>No lessons available for this course.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
