import PostCard from "@/components/posts/PostCard";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();

  const { data: posts, error: error } = await supabase
    .rpc("get_posts_with_likes", {
      request_user_id: data.session?.user.id,
    })
    .order("post_id", { ascending: false });
  return (
    <div className="my-5">
      {posts &&
        posts?.length > 0 &&
        posts.map((post: PostType) => (
          <PostCard key={post.post_id} post={post} user={data.session?.user!} />
        ))}
    </div>
  );
}
