import SearchInput from "@/components/common/SearchInput";
import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import Link from "next/link";
import UserAvatar from "@/components/common/UserAvatar";
import { getS3URL } from "@/lib/helper";

export default async function Seach({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: users, error } = await supabase
    .from("users")
    .select("id,name,username,profile_image")
    .ilike("username", `%${searchParams.q}%`)
    .neq("id", data.session?.user.id);

  return (
    <div>
      <SearchInput />

      <div>
        {users &&
          users?.length > 0 &&
          users.map((user) => (
            <Link
              key={user.id}
              href={`/user/${user.id}`}
              className="flex space-x-3 p-2 bg-muted rounded-lg my-2"
            >
              <UserAvatar
                name={user.name}
                image={user.profile_image ? getS3URL(user.profile_image) : ""}
              />
              <div className="flex flex-col">
                <p className="font-bold">{user.name}</p>
                <p>@{user.username}</p>
              </div>
            </Link>
          ))}
      </div>
      {users && users.length <= 0 && (
        <p className="text-center m-3 text-xl">No user found !!</p>
      )}
    </div>
  );
}
