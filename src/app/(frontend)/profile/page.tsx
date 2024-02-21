import UserAvatar from "@/components/common/UserAvatar";
import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import UpdateProfile from "@/components/userProfile/UpdateProfile";
import { getS3URL } from "@/lib/helper";

export default async function Profile() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const user: User = data.session?.user!;
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">{user.user_metadata?.["name"]}</h2>
          <p>{user.user_metadata?.["username"]}</p>
        </div>
        <UserAvatar
          name={user.user_metadata?.["name"]}
          width={7}
          heigth={7}
          image={
            user.user_metadata?.["profile_image"]
              ? getS3URL(user.user_metadata?.["profile_image"])
              : ""
          }
        />
      </div>
      <p className="mt-4">{user.user_metadata?.["description"]}</p>
      <UpdateProfile user={user} />
    </div>
  );
}
