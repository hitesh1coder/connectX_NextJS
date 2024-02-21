import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";
import { getS3URL } from "@/lib/helper";

export default async function page({ params }: { params: { id: string } }) {
  const supabas = await createClient(cookies());
  const { data: user, error } = await supabas
    .from("users")
    .select("id,name,username,profile_image,metadata")
    .eq("id", params.id)
    .single();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">{user?.name}</h2>
          <p>{user?.username}</p>
        </div>
        <UserAvatar
          name={user?.name}
          width={7}
          heigth={7}
          image={user?.profile_image ? getS3URL(user?.profile_image) : ""}
        />
      </div>
      <p className="mt-4">{user?.metadata?.["description"]}</p>
    </div>
  );
}
