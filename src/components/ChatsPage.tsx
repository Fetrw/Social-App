import { useState } from "react";
import { useStore } from "../store";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Users, Search } from "lucide-react";

interface ChatsPageProps {
  onSelectChat: (userId: string) => void;
}

export const ChatsPage = ({ onSelectChat }: ChatsPageProps) => {
  const { currentUser, users, chats } = useStore();
  const [view, setView] = useState<"chats" | "contacts">("chats");
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentUser) return null;

  const userChats = chats.filter((chat) =>
    chat.participants.includes(currentUser.id)
  );

  const contacts = users.filter(
    (user) =>
      user.id !== currentUser.id &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chatUserIds = new Set(
    userChats.flatMap((chat) =>
      chat.participants.filter((id) => id !== currentUser.id)
    )
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Messages</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView("chats")}
              className={`px-3 py-1 rounded-lg text-sm ${
                view === "chats"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <MessageCircle className="w-4 h-4 inline-block mr-1" />
              Chats
            </button>
            <button
              onClick={() => setView("contacts")}
              className={`px-3 py-1 rounded-lg text-sm ${
                view === "contacts"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Users className="w-4 h-4 inline-block mr-1" />
              Contacts
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search messages or contacts..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
      </div>

      {view === "chats" ? (
        <div className="divide-y dark:divide-gray-700">
          {userChats.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No messages yet
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                Start a conversation with someone
              </p>
              <button
                onClick={() => setView("contacts")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                View Contacts
              </button>
            </div>
          ) : (
            userChats.map((chat) => {
              const otherUserId = chat.participants.find(
                (id) => id !== currentUser.id
              );
              const otherUser = users.find((user) => user.id === otherUserId);
              const lastMessage = chat.messages[chat.messages.length - 1];

              if (!otherUser || !lastMessage) return null;

              return (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(otherUser.id)}
                  className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-4"
                >
                  <img
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium dark:text-white truncate">
                        {otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDistanceToNow(new Date(lastMessage.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {lastMessage.fromUserId === currentUser.id ? "You: " : ""}
                      {lastMessage.content}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : (
        <div className="divide-y dark:divide-gray-700">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No contacts found
            </div>
          ) : (
            contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => onSelectChat(contact.id)}
                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-4"
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium dark:text-white truncate">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {contact.bio}
                  </p>
                </div>
                {chatUserIds.has(contact.id) && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    Existing chat
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
