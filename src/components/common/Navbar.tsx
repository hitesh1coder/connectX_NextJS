"use client";
import React from "react";
import Image from "next/image";
import {
  Search,
  StickyNote,
  Bell,
  User,
  HomeIcon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AddPostModal from "../posts/AddPostModal";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SettingDropDown } from "./SettingDropDown";

export default function Navbar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const staticRoutes = ["/", "/search", "/notification", "/profile"];
  return (
    <nav className="hidden md:flex w-full justify-between items-center p-2">
      <Image src="/images/logo_512.png" width={30} height={30} alt="logo" />
      <div className="flex space-x-16 items-center p-2">
        {!staticRoutes.includes(pathname) && (
          <ArrowLeft
            size={30}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
        )}
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-foreground" : "text-gray-500"
          } text-gray-500 cursor-pointer hover:text-foreground`}
        >
          <HomeIcon size={30} />
        </Link>
        <Link
          href="/search"
          className={`${
            pathname === "/search" ? "text-foreground" : "text-gray-500"
          }  cursor-pointer hover:text-foreground`}
        >
          <Search size={30} />
        </Link>

        <AddPostModal
          user={user}
          children={
            <StickyNote
              size={30}
              className="text-gray-500 cursor-pointer hover:text-foreground"
            />
          }
        />

        <Link
          href="/notification"
          className={`${
            pathname === "/notification" ? "text-foreground" : "text-gray-500"
          }  cursor-pointer hover:text-foreground`}
        >
          <Bell size={30} />
        </Link>
        <Link
          href="/profile"
          className={`${
            pathname === "/profile" ? "text-foreground" : "text-gray-500"
          }  cursor-pointer hover:text-foreground`}
        >
          <User size={30} />
        </Link>
      </div>

      <SettingDropDown />
    </nav>
  );
}
