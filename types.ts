type PostPayloadType = {
  content: string;
  image?: string;
  user_id: string;
};
type CommentPaylodType = PostPayloadType & {
  post_id: number;
};

type PostType = {
  post_id: number;
  user_id: string;
  content: string;
  image?: string;
  name: string;
  username: string;
  email: string;
  profile_image?: string;
  likes_count: number;
  reply_count: number;
  created_at: string;
  liked: boolean;
};

type UserType = {
  id: string;
  name: string;
  username: string;
  profile_image: string;
};

type NotificationType = {
  id: number;
  user_id: string;
  post_id: number;
  type: number;
  created_at: string;
  users: any;
};

type CommentType = {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: string;
  image?: string;
  users: any;
};

type ProfilePayloadType = {
  name: string;
  description?: string;
  profile_image?: string;
};
