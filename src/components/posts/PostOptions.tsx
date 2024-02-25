"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/supabaseClient";
import { Delete, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function PostOptions({
  userId,
  post,
}: {
  userId: string;
  post: PostType;
}) {
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  const handleDeletPost = async () => {
    await supabase.from("posts").delete().eq("id", post.post_id);
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              Post and remove it's data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeletPost}>
              Yes Delete
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancle</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Info</DropdownMenuItem>
          {userId === post.user_id && (
            <DropdownMenuItem
              className="flex cursor-pointer space-x-2"
              onClick={() => setOpen(true)}
            >
              <Delete size={25} />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
