import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";
import CommentCard from "@/components/comments/CommentCard";

export default async function ShowPost({ params }: { params: { id: number } }) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: post, error } = await supabase
    .rpc("get_posts_with_likes", {
      request_user_id: data.session?.user.id,
    })
    .eq("post_id", params.id)
    .single();

  const { data: commenst } = await supabase
    .from("comments")
    .select(
      "id,user_id,post_id,content,created_at,users(id,name,username,profile_image)"
    )
    .eq("post_id", params.id);

  return (
    <div>
      <PostCard post={post as PostType} user={data.session?.user!} />
      {commenst && commenst?.length > 0 && (
        <div>
          <h1 className="font-bold text-xl">Comments :-</h1>
          {commenst?.map((comment: CommentType) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
