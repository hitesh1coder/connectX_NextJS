"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Home, MenuIcon, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileSideBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon size={30} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="w-3/5">
        <div className="flex justify-center">
          <Image src="/images/logo_512.png" width={50} height={50} alt="logo" />
        </div>
        <ul className="flex flex-col gap-2 mt-4">
          <Link
            className={`${
              pathname === "/" ? "bg-gray-500" : ""
            } p-1 rounded-md text-center`}
            href="/"
          >
            <li
              className="flex gap-4 mb-3 items-center"
              onClick={() => setOpen(false)}
            >
              <Home size={24} />
              <p>Home</p>
            </li>
          </Link>
          <Link
            className={`${
              pathname === "/search" ? "bg-gray-500" : ""
            } p-1 rounded-md text-center`}
            href="/search"
          >
            <li
              className="flex gap-4 mb-3 items-center"
              onClick={() => setOpen(false)}
            >
              <Search size={24} />
              <p>Search</p>
            </li>
          </Link>
          <Link
            className={`${
              pathname === "/notification" ? "bg-gray-500" : ""
            } p-1 rounded-md text-center`}
            href="/notification"
          >
            <li
              className="flex gap-4 mb-3 items-center"
              onClick={() => setOpen(false)}
            >
              <Bell size={24} />
              <p>Notifications</p>
            </li>
          </Link>
          <Link
            className={`${
              pathname === "/profile" ? "bg-gray-500" : ""
            } p-1 rounded-md text-center`}
            href="/profile"
          >
            <li
              className="flex gap-4 mb-3 items-center"
              onClick={() => setOpen(false)}
            >
              <User size={24} />
              <p>Profile</p>
            </li>
          </Link>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
