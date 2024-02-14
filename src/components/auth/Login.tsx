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

export default function LoginUser() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Account</CardTitle>
        <CardDescription>Welcome back!!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action="">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" name="email" />
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
          <Button className="w-full my-2">Login</Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
