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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function AddLessons() {
  const { toast } = useToast();
  const [lessons, setLessons] = useState([]);
  type Lesson = {
    id: number;
    title: string;
    description: string;
    video: string;
  };

  useEffect(() => {
    // Function to fetch practice sessions data
    async function fetchLessons() {
      try {
        const response = await fetch(
          `http://localhost:3000/getLessons?courseId=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }

    fetchLessons();
  }, []);
  const videoBaseUrl = "http://localhost:3000/uploads/";
  console.log(lessons);

  return (
    <div className="flex gap-6 mt-12">
      <Card className="w-full p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Lessons</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Lessons</DialogTitle>
              <DialogDescription>
                Add your Lessons here. You can add multiple lessons.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Textarea className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Video
                </Label>
                <Input id="picture" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  toast({
                    title: "Lesson Added Successfully!",
                  });
                }}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="mb-4"></div>
        <Separator />
        <div className="w-full">
          <h1 className="text-center text-primary mt-4 font-semibold text-3xl mb-2">
            List of Lessons
          </h1>
          <div className="grid grid-cols-3">
            {lessons.map((lesson: Lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <video
                    controls
                    src={`${videoBaseUrl}${lesson.video}`}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "500px",
                    }} // Control size of the video
                  ></video>
                </CardContent>
                <CardContent>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
