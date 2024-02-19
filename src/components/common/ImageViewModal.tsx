"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getS3URL } from "@/lib/helper";

export default function ImageViewModal({ image }: { image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={getS3URL(image)}
          width={500}
          height={500}
          alt="post"
          className="w-full cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Image View</DialogTitle>
        </DialogHeader>
        <Image
          src={getS3URL(image)}
          width={800}
          height={800}
          alt="post"
          className="w-full h-[90vh] object-contain rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
