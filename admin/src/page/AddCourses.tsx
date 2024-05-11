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
import { useState } from "react";
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

export default function AddCourses() {
  const [lesson, setLesson] = useState("");
  const { toast } = useToast();

  const handleAddLesson = async () => {
    console.log(lesson);
    try {
      const response = await fetch("http://localhost:3000/addCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: lesson }),
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

  const courses = [
    {
      coursename: "Rhythm & Blues Riffs Workshop",
      coursedescription:
        "Explore the rich history of rhythm and blues guitar riffs in this hands-on workshop. Master classic licks and develop your own signature style.",
    },

    {
      coursename: "Fusion Drum Fusion",
      coursedescription:
        "Discover the art of fusion drumming in this dynamic course. Blend elements of jazz, funk, and rock to create exciting rhythmic textures.",
    },
    {
      coursename: "Latin Percussion Fiesta",
      coursedescription:
        "Immerse yourself in the vibrant rhythms of Latin percussion in this lively course. From salsa to samba, expand your repertoire and spice up your playing.",
    },
    {
      coursename: "Learn Jazz Drumming",
      coursedescription: "Jazz Drumming is all about stick control and feel.",
    },
  ];
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
                <Label htmlFor="name">Lessons Name:</Label>
                <Input
                  id="name"
                  placeholder="Name of your lesson"
                  onChange={(e) => setLesson(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Lesson Description:</Label>
                <Textarea placeholder="Description about the lesson." />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="">{course.coursename}</TableCell>

                <TableCell>{course.coursedescription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </Card>
    </div>
  );
}
