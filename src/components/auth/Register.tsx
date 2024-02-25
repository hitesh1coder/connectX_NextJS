"use client";
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
import AuthSubmitBtn from "./AuthSubmitBtn";

import { registerAction } from "@/actions/authAction";
// import { useFormState } from "react-dom";

const initialState = {
  status: 0,
  error: {},
};
export default function Register() {
  // const [state, formAction] = useFormState(registerAction, initialState);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Welcome to the world of ConnectX</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <form action={registerAction}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
            />
            {/* <span className="text-red-500 text-xs">{state?.errors?.name}</span> */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your Username"
              name="username"
            />
            {/* <span className="text-red-500 text-xs">
              {state?.errors?.username}
            </span> */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            {/* <span className="text-red-500 text-xs">{state?.errors?.email}</span> */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            {/* <span className="text-red-500 text-xs">
              {state?.errors?.password}
            </span> */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              id="cpassword"
              type="password"
              placeholder="Confirm your password"
              name="password_confirmation"
            />
            {/* <span className="text-red-500 text-xs">
              {state?.errors?.password_confirmation}
            </span> */}
          </div>
          <AuthSubmitBtn />
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
