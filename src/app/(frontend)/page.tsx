import PostCard from "@/components/posts/PostCard";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id,content,image,reply_count,likes_count,created_at,users(id,name,username,profile_image)"
    );
  return (
    <div>
      {posts &&
        posts?.length > 0 &&
        posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
