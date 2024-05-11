import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface User {
  name: string;
  email: string;
  isMember: boolean;
}

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/getUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-center font-semibold">Users</h1>

      <Card className="p-4 mt-6 w-1/2 mx-auto">
        <Table>
          <TableCaption>List of users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S. no</TableHead>
              <TableHead className="w-[100px]">User Name</TableHead>

              <TableHead>Email</TableHead>
              <TableHead className="text-right">Membership</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>{invoice.paymentMethod}</TableCell> */}
                <TableCell className="text-right">
                  {user.isMember ? "True" : "False"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
