export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  tags: string[];
  poll?: Poll;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Poll {
  question: string;
  options: PollOption[];
  endDate: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[]; // array of user IDs
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  fromUserId: string;
  content: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
}

export interface Notification {
  id: string;
  userId: string;
  type: "message" | "like" | "comment";
  fromUserId: string;
  postId?: string;
  messageId?: string;
  read: boolean;
  createdAt: string;
}
