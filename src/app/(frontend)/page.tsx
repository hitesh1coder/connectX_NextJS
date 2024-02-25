import Posts from "@/components/posts/Posts";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();

  const {
    data: posts,
    error: error,
    count,
  } = await supabase
    .rpc(
      "get_posts_with_likes",
      {
        request_user_id: data.session?.user.id,
      },
      {
        count: "exact",
      }
    )
    .order("post_id", { ascending: false })
    .range(0, 2);
  return (
    <div className="my-5">
      {posts && posts.length > 0 && (
        <Posts
          user={data.session?.user!}
          data={posts}
          totalPosts={count ?? 0}
        />
      )}
    </div>
  );
}
