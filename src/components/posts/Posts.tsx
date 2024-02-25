"use client";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/supabaseClient";
import Loading from "@/app/(frontend)/loading";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

export default function Posts({
  user,
  data,
  totalPosts,
}: {
  user: User;
  data: PostType[] | [];
  totalPosts: number;
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const limit = 4;
  const { ref, inView } = useInView({ threshold: 0 });

  // infinit scroll
  useEffect(() => {
    if (inView) {
      fetchMoreFetch();
    }
  }, [inView]);

  // fetchMoreFetch
  const fetchMoreFetch = async () => {
    let from = page * limit;
    let to = from + limit;
    if (from > totalPosts) {
      setNoMoreData(true);
      return false;
    }
    const { data: morePosts, error: error } = await supabase
      .rpc("get_posts_with_likes", {
        request_user_id: user.id,
      })
      .order("post_id", { ascending: false })
      .range(from, to);
    if (error) {
      toast.error("faild to more fetch posts");
      return;
    }
    setPage(page + 1);
    const newMorePosts = morePosts as Array<PostType> | [];
    if (newMorePosts && newMorePosts.length > 0) {
      setPosts([...posts, ...newMorePosts]);
    } else {
      setNoMoreData(true);
    }
  };

  //   realtime changes
  useEffect(() => {
    const postChannel = supabase.channel("postchannel");

    // delete channel
    postChannel.on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        const filteredPost = posts.filter(
          (item) => item.post_id !== payload.old?.id
        );
        setPosts(filteredPost);
      }
    );

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
      {!noMoreData && (
        <div ref={ref} className="flex mt-2 justify-center">
          <Loading />
        </div>
      )}
      {noMoreData && (
        <p className="text-center font-bold mt-2">No more posts ... !!</p>
      )}
    </div>
  );
}
