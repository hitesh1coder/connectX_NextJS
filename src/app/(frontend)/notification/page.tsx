import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";
import { formatDate } from "@/lib/helper";

export default async function Notifications() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: notification, error } = await supabase
    .from("notifications")
    .select(
      "id,user_id,post_id,type,created_at,users(id,name,username,profile_image)"
    )
    .eq("to_user_id", data.session?.user.id)
    .order("id", { ascending: false });

  return (
    <div>
      {notification &&
        notification?.length > 0 &&
        notification.map((notify: NotificationType) => (
          <div
            key={notify.id}
            className="flex bg-muted space-x-3 my-2   items-center "
          >
            <UserAvatar
              name={notify.users?.name!}
              image={notify.users?.profile_image}
            />
            <div className="flex flex-col">
              <p>
                <strong>{notify.users?.name} </strong>
                {notify.type === 1
                  ? "liked your post"
                  : "commented on your post"}
              </p>
              <p className="text-xs">{formatDate(notify.created_at)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
