type PostPayloadType = {
  content: string;
  image?: string;
  user_id: string;
};
type PostType = {
  id: number;
  content: string;
  image?: string;
  created_at: string;
  likes_count: number;
  reply_count: number;
  users: any;
};

type UserType = {
  id: string;
  name: string;
  username: string;
  profile_image: string;
};
