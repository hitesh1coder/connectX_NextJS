import React from "react";
import UserAvatar from "../common/UserAvatar";
import { formatDate, getS3URL } from "@/lib/helper";
import ImageViewModal from "../common/ImageViewModal";

export default function CommentCard({ comment }: { comment: CommentType }) {
  return (
    <div className="bg-muted mt-5 rounded-sm">
      {/* card header  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-2">
          <UserAvatar
            name={comment.users?.name}
            image={
              comment.users?.profile_image
                ? getS3URL(comment.users?.profile_image)
                : ""
            }
          />
          <div>
            <p className="font-bold">{comment.users?.name}</p>
            <p className="text-sm">{formatDate(comment.created_at)}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        {comment.image && <ImageViewModal image={comment.image} />}
        <p className="px-5 font-semibold">{comment.content}</p>
      </div>
    </div>
  );
}
