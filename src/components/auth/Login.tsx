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
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/authAction";

const initialState = {
  status: 0,
  errors: {},
};

export default function LoginUser() {
  const [state, formAction] = useFormState(loginAction, initialState);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Account</CardTitle>
        <CardDescription>Welcome back!!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={formAction}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" name="email" />
            <span className="text-red-500 text-xs">{state?.errors?.email}</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <span className="text-red-500 text-xs">
              {state?.errors?.password}
            </span>
          </div>
          <AuthSubmitBtn />
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
