import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function AddCourses() {
  const [course, setCourse] = useState({
    name: "",
    description: "",
  });
  const [courses, setCourses] = useState([]);
  const { toast } = useToast();

  const handleAddLesson = async () => {
    console.log(course);
    try {
      const response = await fetch("http://localhost:3000/addCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: course.name,
          description: course.description,
        }),
      });

      toast({
        description: "Course Added Successfully.",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Do something with the response
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/getCourses");
      const data = await response.json();
      console.log(data);
      setCourses(data);
    };

    fetchData();
  }, []);

  interface Course {
    course_id: string;
    name: string;
    description: string;
  }

  return (
    <div className="flex gap-6 mt-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Lesson</CardTitle>
          <CardDescription>Add your lessons here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Course Name:</Label>
                <Input
                  id="name"
                  placeholder="Name of your course"
                  onChange={(e) =>
                    setCourse({ ...course, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Course Description:</Label>
                <Textarea
                  placeholder="Description about the lesson."
                  onChange={(e) =>
                    setCourse({ ...course, description: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddLesson}>Add</Button>
        </CardFooter>
      </Card>

      <Card className="w-full p-4">
        <h1 className="text-center text-primary font-semibold text-3xl mb-2">
          List of Courses
        </h1>
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.no</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course: Course, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="">{course.name}</TableCell>

                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <Link to={`addLessons/${course.course_id}`}>
                    <Button variant="link">Add Lessons</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
