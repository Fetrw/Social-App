/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Post, Poll, Chat } from "./types";

interface SocialState {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  chats: Chat[];
  theme: "light" | "dark";
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  addPost: (post: Post) => void;
  toggleLike: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  toggleTheme: () => void;
  votePoll: (postId: string, optionId: string, userId: string) => void;
  sendMessage: (fromUserId: string, toUserId: string, content: string) => void;
}

// Mock initial data
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Software Developer",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    joinedDate: "2024-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Digital Artist",
    location: "New York, NY",
    website: "https://janesmith.art",
    joinedDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Travel Photographer",
    location: "London, UK",
    website: "https://alexshots.com",
    joinedDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "UX Designer",
    location: "Barcelona, Spain",
    website: "https://mariadesigns.net",
    joinedDate: "2024-02-15",
  },
  {
    id: "5",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Tech Entrepreneur",
    location: "Seoul, South Korea",
    website: "https://davidkim.tech",
    joinedDate: "2024-03-01",
  },
];

const initialPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content:
      "Just launched my new portfolio website! Check it out at https://johndoe.dev 🚀",
    tags: ["webdev", "portfolio", "launch"],
    likes: ["2", "3"],
    comments: [],
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    content: "Working on a new digital art series inspired by nature 🎨",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    tags: ["art", "digital", "nature"],
    likes: ["1", "4"],
    comments: [],
    createdAt: "2024-03-14T15:30:00Z",
  },
  {
    id: "3",
    userId: "3",
    content: "Captured this amazing sunset in London today!",
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800",
    tags: ["photography", "london", "sunset"],
    likes: ["2", "5"],
    comments: [],
    createdAt: "2024-03-13T20:15:00Z",
  },
];

const initialChats: Chat[] = [];

export const useStore = create<SocialState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: initialUsers,
      posts: initialPosts,
      chats: initialChats,
      theme: "light",
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      toggleLike: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes.includes(userId)
                    ? post.likes.filter((id) => id !== userId)
                    : [...post.likes, userId],
                }
              : post
          ),
        })),
      addComment: (postId, comment) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          ),
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      votePoll: (postId, optionId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId && post.poll
              ? {
                  ...post,
                  poll: {
                    ...post.poll,
                    options: post.poll.options.map((option) =>
                      option.id === optionId
                        ? {
                            ...option,
                            votes: option.votes.includes(userId)
                              ? option.votes
                              : [...option.votes, userId],
                          }
                        : {
                            ...option,
                            votes: option.votes.filter((id) => id !== userId),
                          }
                    ),
                  },
                }
              : post
          ),
        })),
      sendMessage: (fromUserId, toUserId, content) =>
        set((state) => {
          const chatId = [fromUserId, toUserId].sort().join("-");
          const existingChat = state.chats.find((chat) => chat.id === chatId);
          const newMessage = {
            id: Date.now().toString(),
            fromUserId,
            content,
            createdAt: new Date().toISOString(),
          };

          if (existingChat) {
            return {
              chats: state.chats.map((chat) =>
                chat.id === chatId
                  ? { ...chat, messages: [...chat.messages, newMessage] }
                  : chat
              ),
            };
          }

          return {
            chats: [
              ...state.chats,
              {
                id: chatId,
                participants: [fromUserId, toUserId],
                messages: [newMessage],
              },
            ],
          };
        }),
    }),
    {
      name: "social-storage",
    }
  )
);
