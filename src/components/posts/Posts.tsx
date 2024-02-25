"use client";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/supabaseClient";

export default function Posts({
  user,
  data,
}: {
  user: User;
  data: PostType[] | [];
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState(data);

  //   realtime changes
  useEffect(() => {
    const postChannel = supabase.channel("postchannel");

    // insert channel
    postChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        async (payload) => {
          const { data: postUser } = await supabase
            .from("users")
            .select("id,name,email,username,profile_image")
            .eq("id", payload.new?.user_id)
            .single();

          const data: PostType = {
            post_id: payload.new?.id,
            user_id: payload.new?.user_id,
            content: payload.new?.content,
            image: payload.new?.image,
            likes_count: payload.new?.likes_count,
            reply_count: payload.new?.reply_count,
            created_at: payload.new?.created_at,
            email: postUser?.email!,
            liked: false,
            name: postUser?.name,
            username: postUser?.username,
            profile_image: postUser?.profile_image,
          };
          setPosts([data, ...posts]);
        }
      )
      .subscribe();

    return () => {
      postChannel.unsubscribe();
    };
  }, []);

  return (
    <div>
      {posts &&
        posts?.length > 0 &&
        posts.map((post: PostType) => (
          <PostCard key={post.post_id} post={post} user={user} />
        ))}
    </div>
  );
}
