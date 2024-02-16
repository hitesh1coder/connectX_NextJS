"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import { Image } from "lucide-react";
import { Button } from "../ui/button";
import ImagePreview from "../common/ImagePreview";

export default function AddPostModal({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  const handleImageIcon = () => {
    imageRef.current?.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const removePreview = () => {
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setImageUrl(null);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Post </DialogTitle>
        </DialogHeader>
        <div>
          <textarea
            className="bg-muted w-full rounded-lg outline-none h-32 p-2 border"
            placeholder="What`s on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {imageUrl && (
            <ImagePreview image={imageUrl} callback={removePreview} />
          )}
          <div className="flex w-full mt-2 justify-between p-2 items-center">
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpg, image/jpeg, image/svg, image/webp"
              onChange={handleImageChange}
            />
            <Image
              size={25}
              className="cursor-pointer"
              onClick={handleImageIcon}
            />
            <Button size="sm">Post</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
