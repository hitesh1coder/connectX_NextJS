import React from "react";
import UserAvatar from "../common/UserAvatar";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import { formatDate, getS3URL } from "@/lib/helper";
import PostLike from "./PostLike";
import AddCommentModal from "../comments/AddCommentModal";
import { User } from "@supabase/supabase-js";
import ImageViewModal from "../common/ImageViewModal";
import Link from "next/link";
import PostOptions from "./PostOptions";

export default function PostCard({
  post,
  user,
}: {
  post: PostType;
  user: User;
}) {
  return (
    <div className="bg-muted mt-5 rounded-xl">
      {/* card header  */}
      <div className="w-full flex justify-between items-center p-2">
        <div className="flex space-x-2">
          <UserAvatar
            name={post.name}
            image={post.profile_image ? getS3URL(post.profile_image) : ""}
          />
          <div>
            <p className="font-bold">{post.name}</p>
            <p className="text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <PostOptions userId={user.id} post={post} />
      </div>
      <div className="w-full">
        {post.image && <ImageViewModal image={post.image} />}

        <p className="p-2 font-semibold">{post.content}</p>

        <div className="flex justify-between p-2 my">
          <div className="flex gap-4">
            <PostLike userId={post.user_id} post={post} />
            <AddCommentModal
              user={user}
              post={post}
              children={<MessageCircle className="cursor-pointer" />}
            />

            <Send className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer" />
        </div>
        <div className="flex gap-4 p-2">
          <p>likes {post.likes_count}</p>
          <Link href={`/post/${post.post_id}`}>
            <p>replies {post.reply_count}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
