"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function AuthSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="my-2 w-full" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
