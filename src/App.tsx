import { useEffect, useState } from "react";
import { useStore } from "./store";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
import { Profile } from "./components/Profile";
import { Chat } from "./components/Chat";
import { ChatsPage } from "./components/ChatsPage";
import { MessageCircle, Home } from "lucide-react";

type View = "feed" | "profile" | "chat" | "chats";

export const App = () => {
  const { currentUser, theme } = useStore();
  const [view, setView] = useState<View>("feed");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setView("profile");
  };

  const handleStartChat = (userId: string) => {
    setSelectedUserId(userId);
    setView("chat");
  };

  const handleSelectChat = (userId: string) => {
    setSelectedUserId(userId);
    setView("chat");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header onViewProfile={handleViewProfile} onStartChat={handleStartChat} />

      {currentUser && (
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setView("feed")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                view === "feed"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => setView("chats")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                view === "chats" || view === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Messages
            </button>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 pb-6">
        {currentUser ? (
          <>
            {view === "feed" && (
              <>
                <CreatePost />
                <PostList onViewProfile={handleViewProfile} />
              </>
            )}
            {view === "profile" && selectedUserId && (
              <Profile userId={selectedUserId} />
            )}
            {view === "chat" && selectedUserId && (
              <Chat userId={selectedUserId} />
            )}
            {view === "chats" && <ChatsPage onSelectChat={handleSelectChat} />}
          </>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
};
