import React from "react";
import UserAvatar from "../common/UserAvatar";
import {
  MoreVertical,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import { formatDate, getS3URL } from "@/lib/helper";

export default function PostCard({ post }: { post: PostType }) {
  return (
    <div className="bg-muted mt-5 rounded-xl">
      {/* card header  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-2">
          <UserAvatar
            name={post.users?.name}
            image={
              post.users?.profile_image
                ? getS3URL(post.users?.profile_image)
                : ""
            }
          />
          <div>
            <p className="font-bold">{post.users?.name}</p>
            <p className="text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <MoreVertical className="cursor-pointer" />
      </div>
      <div className="w-full">
        {post.image && (
          <Image
            src={getS3URL(post.image)}
            width={500}
            height={500}
            alt="post"
            className="w-full"
          />
        )}
        <p className="p-2 font-semibold">{post.content}</p>
        <div className="flex justify-between p-2 my">
          <div className="flex gap-4">
            <Heart className="cursor-pointer" />
            <MessageCircle className="cursor-pointer" />
            <Send className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer" />
        </div>
        <div className="flex gap-4 p-2">
          <p>likes {post.likes_count}</p>
          <p>replies {post.reply_count}</p>
        </div>
      </div>
    </div>
  );
}
