import UserAvatar from "@/components/common/UserAvatar";
import React from "react";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import UpdateProfile from "@/components/userProfile/UpdateProfile";
import { getS3URL } from "@/lib/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/posts/PostCard";
import CommentCard from "@/components/comments/CommentCard";

export default async function Profile() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const user: User = data.session?.user!;

  const { data: posts } = await supabase
    .rpc("get_posts_with_likes", {
      request_user_id: data.session?.user.id,
    })
    .eq("user_id", user.id)
    .order("post_id", { ascending: false });

  const { data: commenst } = await supabase
    .from("comments")
    .select(
      "id,user_id,post_id,content,created_at,users(id,name,username,profile_image)"
    )
    .eq("user_id", user.id);

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
      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="my-3">
            {posts &&
              posts?.length > 0 &&
              posts.map((post: PostType) => (
                <PostCard key={post.post_id} post={post} user={user!} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="comments">
          <div>
            {commenst && commenst?.length > 0 && (
              <div>
                <h1 className="font-bold text-xl">Comments :-</h1>
                {commenst?.map((comment: CommentType) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
