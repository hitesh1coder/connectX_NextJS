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
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createClient } from "@/lib/supabase/supabaseClient";
import Env from "@/Env";

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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleAddPost = async () => {
    setLoading(true);
    const supabase = createClient();
    const payload: PostPayloadType = {
      user_id: user.id,
      content: content,
    };
    if (image) {
      const path = `${user.id}/${uuidv4()}`;
      const { data, error } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(path, image);
      if (error) {
        setLoading(false);
        toast.error(error.message), { theme: "colored" };
        return;
      }
      payload.image = data.path;
    }
    const { data, error } = await supabase.from("posts").insert(payload);
    if (error) {
      toast.error("something went wrong while uploading post"),
        { theme: "colored" };
      setLoading(false);
    }
    resetState();
    setLoading(false);
    toast.success("Post added successfully"), { theme: "colored" };
    setOpen(false);
  };
  const resetState = () => {
    setContent("");
    removePreview();
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
            <Button
              onClick={handleAddPost}
              size="sm"
              disabled={content.length <= 1 || loading}
            >
              {loading ? "Loading..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
