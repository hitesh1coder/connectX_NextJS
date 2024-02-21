"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImagePreview from "../common/ImagePreview";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Env from "@/Env";

export default function UpdateProfile({ user }: { user: User }) {
  const [profile, setProfile] = useState({
    name: user.user_metadata?.["name"],
    email: user.email,
    description: user.user_metadata?.["description"],
  });
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();
  const router = useRouter();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const removePreview = () => {
    setProfileImage(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setImageUrl(null);
  };

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!profile.name) {
      setLoading(false);
      toast.error("name cannot be empty");
      return;
    }
    const payload: ProfilePayloadType = {
      name: profile.name,
      description: profile.description,
    };
    if (profileImage) {
      const path = `/${user.id}/profile`;
      const { data, error } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(path, profileImage, {
          upsert: true,
        });
      if (error) {
        setLoading(false);
        toast.error("something went wrong while updating profile", {
          theme: "colored",
        });
        return;
      }
      payload.profile_image = data.path;
    }
    const { error } = await supabase.auth.updateUser({ data: payload });
    if (error) {
      setLoading(false);
      toast.error("something went wrong while updating profile", {
        theme: "colored",
      });
      return;
    }
    setLoading(false);
    toast.success("Profile updated successfully", { theme: "colored" });
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="overflow-y-auto max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Update Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateProfile}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                placeholder="Enter your name"
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="name"
                value={profile.email}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={profile.description}
                placeholder="Enter your Bio"
                onChange={(e) => {
                  setProfile({ ...profile, description: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="profileImage">ProfileImage</Label>
              <Input
                ref={imageRef}
                type="file"
                id="image"
                accept="image/png, image/jpg, image/jpeg, image/svg, image/webp"
                onChange={handleImageChange}
              />
            </div>
            {imageUrl && (
              <ImagePreview image={imageUrl} callback={removePreview} />
            )}
            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Update Profile"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
