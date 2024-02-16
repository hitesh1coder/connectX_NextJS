"use client";
import React from "react";
import Image from "next/image";
import {
  Search,
  StickyNote,
  Bell,
  User,
  Settings,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddPostModal from "../posts/AddPostModal";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SettingDropDown } from "./SettingDropDown";

export default function Navbar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex w-full justify-between items-center p-2">
      <Image src="/images/logo_512.png" width={30} height={30} alt="logo" />
      <div className="flex space-x-16 items-center p-2">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-gray-900" : "text-gray-500"
          } text-gray-500 cursor-pointer hover:text-gray-900`}
        >
          <HomeIcon size={30} />
        </Link>
        <Link
          href="/"
          className={`${
            pathname === "/search" ? "text-gray-900" : "text-gray-500"
          }  cursor-pointer hover:text-gray-900`}
        >
          <Search size={30} />
        </Link>

        <AddPostModal
          user={user}
          children={
            <StickyNote
              size={30}
              className="text-gray-500 cursor-pointer hover:text-gray-900"
            />
          }
        />

        <Link
          href="/notification"
          className={`${
            pathname === "/notification" ? "text-gray-900" : "text-gray-500"
          }  cursor-pointer hover:text-gray-900`}
        >
          <Bell size={30} />
        </Link>
        <Link
          href="/profile"
          className={`${
            pathname === "/profile" ? "text-gray-900" : "text-gray-500"
          }  cursor-pointer hover:text-gray-900`}
        >
          <User size={30} />
        </Link>
      </div>

      <SettingDropDown />
    </nav>
  );
}
