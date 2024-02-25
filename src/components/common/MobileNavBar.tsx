"use client";
import React from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import MobileSideBar from "./MobileSideBar";
import { SettingDropDown } from "./SettingDropDown";

export default function MobileNavBar() {
  return (
    <div className="md:hidden">
      <nav className="flex justify-between p-2 items-center">
        <MobileSideBar />
        <Image src="/images/logo_512.png" width={30} height={30} alt="logo" />
        <SettingDropDown />
      </nav>
      <button className="absolute bottom-4 right-4 p-2 cursor-pointer bg-primary text-white rounded-full">
        <Plus />
      </button>
    </div>
  );
}
