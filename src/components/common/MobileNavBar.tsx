"use client";
import React from "react";
import { Plus } from "lucide-react";
import MobileSideBar from "./MobileSideBar";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SettingDropDown } from "./SettingDropDown";
import AddPostModal from "../posts/AddPostModal";

export default function MobileNavBar({ user }: { user: SupabaseUser }) {
  return (
    <div className="md:hidden">
      <nav className="flex justify-between p-2 items-center">
        <MobileSideBar />
        <AddPostModal
          user={user}
          children={
            <Plus
              size={30}
              className="text-gray-500 cursor-pointer hover:text-foreground border-2 rounded-md"
            />
          }
        />
        <SettingDropDown />
      </nav>
    </div>
  );
}
