"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ImagePreview({
  image,
  callback,
}: {
  image: string;
  callback: () => void;
}) {
  return (
    <div className="relative border-2 rounded-xl">
      <Image
        src={image}
        width={20}
        height={20}
        alt="preview-image"
        className="w-full object-contain"
      />
      <Button
        onClick={callback}
        className="absolute top-0 right-0 p-2 cursor-pointer bg-primary text-white rounded-full"
      >
        <X />
      </Button>
    </div>
  );
}
