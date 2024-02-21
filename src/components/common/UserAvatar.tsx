import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  name,
  image,
  width = 2.5,
  heigth = 2.5,
}: {
  name: string;
  image?: string;
  width?: number;
  heigth?: number;
}) {
  return (
    <Avatar style={{ width: `${width}rem`, height: `${heigth}rem` }}>
      <AvatarImage src={image} />
      <AvatarFallback className="text-xl font-bold uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
