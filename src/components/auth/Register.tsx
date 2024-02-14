import React from "react";
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

export default function Register() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Welcome to the world of ConnectX</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <form action="">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
            />
          </div>
          {/* <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your Username"
              name="username"
            />
          </div> */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              id="cpassword"
              type="password"
              placeholder="Confirm your password"
              name="password_confirmation"
            />
          </div>
          <Button className="my-2 w-full">Register</Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
