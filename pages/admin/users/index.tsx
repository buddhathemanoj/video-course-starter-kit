import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
  } from "@/components/ui/table";
  import { useEffect, useState } from "react";
  
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
  }
  
  export default function list() {
    const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      // Fetch data from your API
      fetch('/api/users/list')
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    console.log("users",users)
  
    return (
      <Table>
        <TableCaption>A list of users and their details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Profile Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
              <TableCell>
                <img src={user.image} alt={user.name} width="50" height="50" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  